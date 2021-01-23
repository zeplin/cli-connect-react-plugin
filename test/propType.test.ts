import Plugin from "../src";
import { logger } from "./helper/logger";

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

    test("MultiExportComponentWithProps.jsx snippet creation", async () => {
        const processor = new Plugin();

        const componentCode = await processor.process(
            {
                path: "test/samples/jsx-class/MultiExportComponentWithProps.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });

    test("ComponentWithChildrenAndProps.jsx snippet creation with single export resolver", async () => {
        const processor = new Plugin();
        await processor.init({
            components: [],
            logger,
            config: {
                reactDocgenResolver: "findExportedComponentDefinition"
            }
        });

        const componentCode = await processor.process(
            {
                path: "test/samples/jsx-class/ComponentWithChildrenAndProps.jsx",
                zeplinNames: []
            }
        );

        expect(componentCode).toMatchSnapshot();
    });
});
