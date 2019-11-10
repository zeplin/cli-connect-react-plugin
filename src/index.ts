import { ZeplinLinkPlugin, ComponentConfig, ComponentData, PrismLang } from "@zeplin/cli";
import path from "path";
import pug from "pug";
import { readFile } from "fs-extra";
import { parse } from "react-docgen";

export default class implements ZeplinLinkPlugin {
    supportedFileExtensions = [".js", ".jsx"];

    generateSnippet = pug.compileFile(path.join(__dirname, "template/base.pug"));
    generateSnippetWithChildren = pug.compileFile(path.join(__dirname, "template/withChildren.pug"));
    generateSnippetWithProps = pug.compileFile(path.join(__dirname, "template/withProps.pug"));
    generateSnippetWithChildrenAndProps = pug.compileFile(path.join(__dirname, "template/withChildrenAndProps.pug"));

    async process(context: ComponentConfig): Promise<ComponentData> {
        const file = await readFile(path.resolve(context.path));

        const reactDocs = parse(file);

        let hasChildren = false;
        let hasProps = false;

        if (reactDocs.props) {
            if (Object.keys(reactDocs.props).some(key => key === "children")) {
                hasChildren = true;
            }

            if (Object.keys(reactDocs.props).some(key => key !== "children")) {
                hasProps = true;
            }
        }

        let snippet;
        if (hasChildren && hasProps) {
            snippet = this.generateSnippetWithChildrenAndProps(reactDocs);
        } else if (hasChildren) {
            snippet = this.generateSnippetWithChildren(reactDocs);
        } else if (hasProps) {
            snippet = this.generateSnippetWithProps(reactDocs);
        } else {
            snippet = this.generateSnippet(reactDocs);
        }

        // TODO maybe generate a markdown propTable as description?
        const { description } = reactDocs;

        return { description, snippet, lang: PrismLang.ReactJSX };
    }

    supports(x: ComponentConfig): boolean {
        const fileExtension = path.extname(x.path);

        return this.supportedFileExtensions.includes(fileExtension);
    }
}
