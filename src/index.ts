import { ConnectPlugin, ComponentConfig, ComponentData, PrismLang } from "@zeplin/cli";
import path from "path";
import pug from "pug";
import { readFile } from "fs-extra";
import { parse, PreparedComponentDoc, PreparedProp } from "react-docgen";

export default class implements ConnectPlugin {
    supportedFileExtensions = [".js", ".jsx", ".ts", ".tsx"];

    template = pug.compileFile(path.join(__dirname, "template/snippet.pug"));

    async process(context: ComponentConfig): Promise<ComponentData> {
        const file = await readFile(path.resolve(context.path));

        const rawReactDocs = parse(file, null, null, {
            filename: path.resolve(context.path),
            babelrc: false
        });

        const props: PreparedProp[] = [];

        let hasChildren = false;

        if (rawReactDocs.props) {
            const rawProps = rawReactDocs.props;

            hasChildren = !!rawProps.children;

            Object.keys(rawProps)
                .filter(name => name !== "children")
                .forEach(name => {
                    props.push({ name, value: rawProps[name] });
                });
        }

        const snippet = this.generateSnippet({
            description: rawReactDocs.description,
            componentName: rawReactDocs.displayName,
            props,
            hasChildren
        });

        // TODO maybe generate a markdown propTable as description?
        const { description } = rawReactDocs;

        return { description, snippet, lang: PrismLang.ReactJSX };
    }

    supports(x: ComponentConfig): boolean {
        const fileExtension = path.extname(x.path);

        return this.supportedFileExtensions.includes(fileExtension);
    }

    private generateSnippet(preparedComponentDoc: PreparedComponentDoc): string {
        return this.template(preparedComponentDoc);
    }
}
