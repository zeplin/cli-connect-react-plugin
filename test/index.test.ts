import Processor from "../src";

describe("ReactLinkProcessor", () => {
    test("MyComponent.jsx snippet creation", async () => {
        const processor = new Processor();

        const componentCode = await processor.process({ path: "test/MyComponent.jsx", zeplinNames: [] });

        expect(componentCode).toMatchSnapshot();
    });
});
