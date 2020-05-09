import { ConnectPlugin, ComponentConfig, ComponentData, PrismLang } from "@zeplin/cli";
import path from "path";
import pug from "pug";
import { readFile } from "fs-extra";
import { parse, PreparedComponentDoc } from "react-docgen";

export default class implements ConnectPlugin {
    supportedFileExtensions = [".js", ".jsx", ".ts", ".tsx"];
    tsExtensions = [".ts", ".tsx"];

    template = pug.compileFile(path.join(__dirname, "template/snippet.pug"));

    async process(context: ComponentConfig): Promise<ComponentData> {
        const file = await readFile(path.resolve(context.path));

        const rawReactDocs = parse(file, null, null, {
            filename: path.resolve(context.path),
            babelrc: false
        });

        const rawProps = rawReactDocs.props || {};

        const props = Object.keys(rawProps)
            .filter(name => name !== "children")
            .filter(name => rawProps[name].type || rawProps[name].tsType || rawProps[name].flowType)
            .map(name => ({ name, value: rawProps[name] }));

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
}
