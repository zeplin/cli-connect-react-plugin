import Processor from "../src";

describe("ReactLinkProcessor", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });

    it.only("asd single property React component", async () => {
        const processor = new Processor();

        const componentCode = await processor.process({ path: "test/MyComponent.jsx", zeplinNames: [] });

        expect(componentCode.snippet).toMatch(new RegExp("<MyComponent(.*)\\n{children}\\n</MyComponent>", "s"));
        expect(componentCode.snippet).toMatch("optionalArray={array}");
        expect(componentCode.snippet).toMatch("optionalBool={bool}");
        expect(componentCode.snippet).toMatch("optionalFunc={func}");
        expect(componentCode.snippet).toMatch("optionalNumber={number}");
        expect(componentCode.snippet).toMatch("optionalObject={object}");
        expect(componentCode.snippet).toMatch("optionalString={string}");
        expect(componentCode.snippet).toMatch("optionalNode={node}");
        expect(componentCode.snippet).toMatch("optionalElement={element}");
        expect(componentCode.snippet).toMatch("optionalElementType={elementType}");
        expect(componentCode.snippet).toMatch("optionalFoo={instanceOf(Foo)}");
        expect(componentCode.snippet).toMatch("optionalEnum={enum}");
        expect(componentCode.snippet).toMatch("optionalUnion={union[string|number|instanceOf(Foo)}]");
        expect(componentCode.snippet).toMatch("optionalArrayOf={arrayOf[number]}");
        expect(componentCode.snippet).toMatch("optionalObjectOf={objectOf[number]}");
        expect(componentCode.snippet).toMatch("optionalObjectWithShape={shape}");
        expect(componentCode.snippet).toMatch("optionalObjectWithStrictShape={exact}");
        expect(componentCode.snippet).toMatch("requiredFunc={func}");
        expect(componentCode.snippet).toMatch("requiredAny={any}");
        expect(componentCode.snippet).toMatch("customProp={custom}");
        expect(componentCode.snippet).toMatch("customArrayProp={arrayOf[custom]}");
        expect(componentCode.snippet).toMatch("customObjectOfProp={objectOf[custom]}");
    });
});

