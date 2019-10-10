
import { LinkProcessor, ComponentConfig, ComponentCode } from "@zeplin/cli";

export default class implements LinkProcessor {

    process(context: ComponentConfig): Promise<ComponentCode> {
        throw new Error("Method not implemented.");
    }

    supports(x: ComponentConfig): boolean {
        throw new Error("Method not implemented.");
    }

    getLang(): string {
        throw new Error("Method not implemented.");
    }


}
