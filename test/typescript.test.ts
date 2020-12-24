import Plugin from "../src";

describe("Connected Components React Plugin - TypeScript", () => {
    describe("Using react-docgen", () => {
        test("TSComponent.tsx snippet creation", async () => {
            const processor = new Plugin();

            const componentCode = await processor.process(
                {
                    path: "test/samples/typescript/TSComponent.tsx",
                    zeplinNames: []
                }
            );

            expect(componentCode).toMatchSnapshot();
        });

        test("TSComponentWithProps.tsx snippet creation", async () => {
            const processor = new Plugin();

            const componentCode = await processor.process(
                {
                    path: "test/samples/typescript/TSComponentWithProps.tsx",
                    zeplinNames: []
                }
            );

            expect(componentCode).toMatchSnapshot();
        });

        test("TSComponentWithChildren.tsx snippet creation", async () => {
            const processor = new Plugin();

            const componentCode = await processor.process(
                {
                    path: "test/samples/typescript/TSComponentWithChildren.tsx",
                    zeplinNames: []
                }
            );

            expect(componentCode).toMatchSnapshot();
        });

        test("TSComponentWithChildrenAndProps.tsx snippet creation", async () => {
            const processor = new Plugin();

            const componentCode = await processor.process(
                {
                    path: "test/samples/typescript/TSComponentWithChildrenAndProps.tsx",
                    zeplinNames: []
                }
            );

            expect(componentCode).toMatchSnapshot();
        });

        test("TSComponentWithImport.tsx snippet creation", async () => {
            const processor = new Plugin();

            const componentCode = await processor.process(
                {
                    path: "test/samples/typescript/TSComponentWithImport.tsx",
                    zeplinNames: []
                }
            );

            expect(componentCode).toMatchSnapshot();
        });
    });

    describe("Using react-docgen-typescript", () => {
        test("TSComponent.tsx snippet creation", async () => {
            const processor = new Plugin();

            processor.config = {
                tsDocgen: "react-docgen-typescript",
                tsConfigPath: "./tsconfig.test.json"
            };

            const componentCode = await processor.process(
                {
                    path: "test/samples/typescript/TSComponent.tsx",
                    zeplinNames: []
                }
            );

            expect(componentCode).toMatchSnapshot();
        });

        test("TSComponentWithProps.tsx snippet creation", async () => {
            const processor = new Plugin();

            processor.config = {
                tsDocgen: "react-docgen-typescript",
                tsConfigPath: "./tsconfig.test.json"
            };

            const componentCode = await processor.process(
                {
                    path: "test/samples/typescript/TSComponentWithProps.tsx",
                    zeplinNames: []
                }
            );

            expect(componentCode).toMatchSnapshot();
        });

        test("TSComponentWithChildren.tsx snippet creation", async () => {
            const processor = new Plugin();

            processor.config = {
                tsDocgen: "react-docgen-typescript",
                tsConfigPath: "./tsconfig.test.json"
            };

            const componentCode = await processor.process(
                {
                    path: "test/samples/typescript/TSComponentWithChildren.tsx",
                    zeplinNames: []
                }
            );

            expect(componentCode).toMatchSnapshot();
        });

        test("TSComponentWithChildrenAndProps.tsx snippet creation", async () => {
            const processor = new Plugin();

            processor.config = {
                tsDocgen: "react-docgen-typescript",
                tsConfigPath: "./tsconfig.test.json"
            };

            const componentCode = await processor.process(
                {
                    path: "test/samples/typescript/TSComponentWithChildrenAndProps.tsx",
                    zeplinNames: []
                }
            );

            expect(componentCode).toMatchSnapshot();
        });

        test("TSComponentWithImport.tsx snippet creation", async () => {
            const processor = new Plugin();

            processor.config = {
                tsDocgen: "react-docgen-typescript",
                tsConfigPath: "./tsconfig.test.json"
            };

            const componentCode = await processor.process(
                {
                    path: "test/samples/typescript/TSComponentWithImport.tsx",
                    zeplinNames: []
                }
            );

            expect(componentCode).toMatchSnapshot();
        });
    });
});
