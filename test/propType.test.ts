import Plugin from "../src";

describe("Connected Components React Plugin - PropTypes", () => {
    test("Component.jsx snippet creation", async () => {
        const plugin = new Plugin();

        const componentCode = await plugin.process(
            {
                path: "test/samples/jsx-class/Component.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("ComponentWithChildren.jsx snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/jsx-class/ComponentWithChildren.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("ComponentWithProps.jsx snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/jsx-class/ComponentWithProps.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("ComponentWithChildrenAndProps.jsx snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/jsx-class/ComponentWithChildrenAndProps.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("ComponentWithMemoization.jsx snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/jsx-class/ComponentWithMemoization.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });
});
