import {
    ConnectPlugin, ComponentConfig, ComponentData, PrismLang, PluginContext, Logger
} from "@zeplin/cli";
import path from "path";
import pug from "pug";
import { readFile, pathExists } from "fs-extra";
import { ComponentDoc, parse, PreparedComponentDoc, Props } from "react-docgen";
import * as docgen from "react-docgen-typescript";
import updateNotifier from "update-notifier";
import { name as packageName, version as packageVersion } from "../package.json";

interface ReactPluginConfig {
    tsDocgen: "react-docgen" | "react-docgen-typescript";
    tsConfigPath: string;
}

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

    template = pug.compileFile(path.join(__dirname, "template/snippet.pug"));

    // eslint-disable-next-line require-await
    async init(pluginContext: PluginContext): Promise<void> {
        Object.assign(this.config, pluginContext.config);
        this.logger = pluginContext.logger;
    }

    async process(context: ComponentConfig): Promise<ComponentData> {
        const filePath = path.resolve(context.path);

        const file = await readFile(filePath);

        let rawReactDocs: docgen.ComponentDoc | ComponentDoc;
        let propsFilter: (props: docgen.Props | Props, name: string) => boolean;

        if (this.config.tsDocgen === "react-docgen-typescript" && this.tsExtensions.includes(path.extname(filePath))) {
            this.logger?.debug(`Using react-docgen-typescript for ${filePath}`);
            ({ rawReactDocs, propsFilter } = await this.parseUsingReactDocgenTypescript(filePath));
        } else {
            this.logger?.debug(`Using react-docgen for ${filePath}`);
            ({ rawReactDocs, propsFilter } = this.parseUsingReactDocgen(file, filePath));
        }

        const rawProps = rawReactDocs.props || {};

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
            description: rawReactDocs.description,
            componentName: rawReactDocs.displayName,
            props,
            hasChildren
        });

        // TODO maybe generate a markdown propTable as description?
        const { description } = rawReactDocs;
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
        rawReactDocs: ComponentDoc;
        propsFilter: (props: docgen.Props | Props, name: string) => boolean;
    } {
        const rawReactDocs = parse(file, null, null, {
            filename: filePath,
            babelrc: false
        });

        const propsFilter = (props: Props, name: string): boolean =>
            !!(props[name].type || props[name].tsType || props[name].flowType);

        return {
            rawReactDocs,
            propsFilter
        };
    }

    private async parseUsingReactDocgenTypescript(filePath: string): Promise<{
        rawReactDocs: docgen.ComponentDoc;
        propsFilter: (props: docgen.Props | Props, name: string) => boolean;
    }> {
        const tsConfigPath = path.resolve(this.config.tsConfigPath);

        const parserOpts: docgen.ParserOptions = {
            shouldExtractLiteralValuesFromEnum: true,
            shouldRemoveUndefinedFromOptional: true,
            propFilter: {
                skipPropsWithoutDoc: false
            }
        };

        let parser;

        if (await pathExists(tsConfigPath)) {
            parser = docgen.withCustomConfig(tsConfigPath, parserOpts);
        } else {
            parser = docgen.withDefaultConfig(parserOpts);
        }
        const [rawReactDocs] = parser.parse(filePath);

        const propsFilter = (props: docgen.Props | Props, name: string): boolean => !!props[name].type;

        return {
            rawReactDocs,
            propsFilter
        };
    }
}
