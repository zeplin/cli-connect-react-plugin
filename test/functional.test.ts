import Plugin from "../src";

describe("Connected Components React Plugin - Functional", () => {
    test("FunctionalComponents.jsx snippet creation", async () => {
        const plugin = new Plugin();

        const componentCode = await plugin.process(
            {
                path: "test/samples/jsx-functional/FunctionalComponent.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("ComponentWithChildren.jsx snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/jsx-functional/FunctionalComponentWithChildren.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });
});
