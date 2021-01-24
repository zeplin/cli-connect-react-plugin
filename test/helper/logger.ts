import { Logger } from "@zeplin/cli";

export const logger: Logger = {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    debug: jest.fn()
};