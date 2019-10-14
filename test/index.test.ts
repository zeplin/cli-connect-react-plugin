import Processor from "../src";
import * as snippetUtil from "../src/snippet";

describe("ReactLinkProcessor", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it("should parse single property React component", async () => {
        const processor = new Processor();

        const generateSnippetSpy = jest.spyOn(snippetUtil, "generateSnippet");

        const componentCode = await processor.process({ path: "test/SinglePropertyComponent.jsx", zeplinNames: [] });

        expect(generateSnippetSpy).toHaveBeenCalled();

        expect(componentCode.snippet).toStrictEqual("<SinglePropertyComponent\n  children=[element] />");
        expect(componentCode.description).toContain("Some description");
    });
});

