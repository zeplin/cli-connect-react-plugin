import {
    ConnectPlugin, ComponentConfig, ComponentData, PrismLang, PluginContext, Logger
} from "@zeplin/cli";
import path from "path";
import pug from "pug";
import { readFile, pathExists } from "fs-extra";
import { ComponentDoc, parse, PreparedComponentDoc, Props } from "react-docgen";
import {
    withCustomConfig,
    withDefaultConfig,
    ParserOptions as TSParserOptions,
    Props as TSProps,
    ComponentDoc as TSComponentDoc
} from "react-docgen-typescript";
import updateNotifier from "update-notifier";
import { name as packageName, version as packageVersion } from "../package.json";

interface ReactPluginConfig {
    tsDocgen: "react-docgen" | "react-docgen-typescript";
    tsConfigPath: string;
    reactDocgenResolver?: string;
}

const defaultReactDocgenResolver = "findAllExportedComponentDefinitions";
const availableReactDocgenResolvers = [
    "findAllExportedComponentDefinitions",
    "findExportedComponentDefinition",
    "findAllComponentDefinitions"
];

updateNotifier({
    pkg: {
        name: packageName,
        version: packageVersion
    },
    updateCheckInterval: 0,
    shouldNotifyInNpmScript: true
}).notify();

export default class implements ConnectPlugin {
    supportedFileExtensions = [".js", ".jsx", ".ts", ".tsx"];
    tsExtensions = [".ts", ".tsx"];
    logger?: Logger;
    config: ReactPluginConfig = {
        tsDocgen: "react-docgen",
        tsConfigPath: "./tsconfig.json"
    };
    reactTsDocgen: {
        withCustomConfig: typeof withCustomConfig;
        withDefaultConfig: typeof withDefaultConfig;
    } | null = null;
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    resolver = require(`react-docgen/dist/resolver/${defaultReactDocgenResolver}`).default

    template = pug.compileFile(path.join(__dirname, "template/snippet.pug"));

    // eslint-disable-next-line require-await
    async init(pluginContext: PluginContext): Promise<void> {
        Object.assign(this.config, pluginContext.config);
        this.logger = pluginContext.logger;
        if (this.config.reactDocgenResolver) {
            const { reactDocgenResolver } = this.config;
            if (availableReactDocgenResolvers.includes(reactDocgenResolver) &&
                reactDocgenResolver !== "findAllExportedComponentDefinitions") {
                this.logger.debug(`Setting react-docgen resolver to ${reactDocgenResolver}`);
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                this.resolver = require(`react-docgen/dist/resolver/${reactDocgenResolver}`).default;
            }
        }
    }

    async process(context: ComponentConfig): Promise<ComponentData> {
        const filePath = path.resolve(context.path);

        const file = await readFile(filePath);

        let rawReactDocs: TSComponentDoc[] | ComponentDoc[];
        let propsFilter: (props: TSProps | Props, name: string) => boolean;

        if (this.config.tsDocgen === "react-docgen-typescript" && this.tsExtensions.includes(path.extname(filePath))) {
            this.logger?.debug(`Using react-docgen-typescript for ${filePath}`);
            ({ rawReactDocs, propsFilter } = await this.parseUsingReactDocgenTypescript(filePath));
        } else {
            this.logger?.debug(`Using react-docgen for ${filePath}`);
            ({ rawReactDocs, propsFilter } = this.parseUsingReactDocgen(file, filePath));
        }

        const snippets: string[] = (rawReactDocs as Array<TSComponentDoc | ComponentDoc>)
            .map(rrd => {
                const rawProps = rrd.props || {};

                const props = Object.keys(rawProps)
                    .filter(name => name !== "children")
                    .filter(name => propsFilter(rawProps, name))
                    .map(name => {
                        const prop = rawProps[name];
                        if (prop.type) {
                            // Required to remove \" from typescript literal types
                            prop.type.name = prop.type.name.replace(/"/g, "'");
                            if ("raw" in prop.type && prop.type.raw) {
                                prop.type.raw = prop.type.raw.replace(/"/g, "'");
                            }
                        }

                        return { name, value: prop };
                    });

                const hasChildren = !!rawProps.children;

                const snippet = this.generateSnippet({
                    description: rrd.description,
                    componentName: rrd.displayName,
                    props,
                    hasChildren
                });

                return snippet;
            });

        const snippet = snippets.join("\n\n");

        const [{ description }] = rawReactDocs;
        const lang = this.tsExtensions.includes(path.extname(context.path))
            ? PrismLang.ReactTSX
            : PrismLang.ReactJSX;

        return { description, snippet, lang };
    }

    supports(x: ComponentConfig): boolean {
        const fileExtension = path.extname(x.path);

        return this.supportedFileExtensions.includes(fileExtension);
    }

    private generateSnippet(preparedComponentDoc: PreparedComponentDoc): string {
        return this.template(preparedComponentDoc);
    }

    private parseUsingReactDocgen(file: Buffer, filePath: string): {
        rawReactDocs: ComponentDoc[];
        propsFilter: (props: TSProps | Props, name: string) => boolean;
    } {
        const rawReactDocs = parse(file, this.resolver, null, {
            filename: filePath,
            babelrc: false
        });

        const propsFilter = (props: Props, name: string): boolean =>
            !!(props[name].type || props[name].tsType || props[name].flowType);

        return {
            rawReactDocs: Array.isArray(rawReactDocs) ? rawReactDocs : [rawReactDocs],
            propsFilter
        };
    }

    private async parseUsingReactDocgenTypescript(filePath: string): Promise<{
        rawReactDocs: TSComponentDoc[];
        propsFilter: (props: TSProps | Props, name: string) => boolean;
    }> {
        const tsConfigPath = path.resolve(this.config.tsConfigPath);

        const parserOpts: TSParserOptions = {
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            propFilter: {
                skipPropsWithoutDoc: false
            }
        };

        let parser;

        if (!this.reactTsDocgen) {
            this.logger?.debug("Importing react-docgen-typescript package");
            this.reactTsDocgen = await import("react-docgen-typescript");
        }

        if (await pathExists(tsConfigPath)) {
            parser = this.reactTsDocgen.withCustomConfig(tsConfigPath, parserOpts);
        } else {
            parser = this.reactTsDocgen.withDefaultConfig(parserOpts);
        }
        const rawReactDocs = parser.parse(filePath);

        const propsFilter = (props: TSProps | Props, name: string): boolean => !!props[name].type;

        return {
            rawReactDocs,
            propsFilter
        };
    }
}
