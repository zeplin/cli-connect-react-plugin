import Plugin from "../src";

describe("Connected Components React Plugin", () => {
    test("Component.jsx snippet creation", async () => {
        const plugin = new Plugin();

        const componentCode = await plugin.process(
            {
                path: "test/samples/Component.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("ComponentWithChildren.jsx snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/ComponentWithChildren.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("ComponentWithProps.jsx snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/ComponentWithProps.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("ComponentWithChildrenAndProps.jsx snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/ComponentWithChildrenAndProps.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });
});
