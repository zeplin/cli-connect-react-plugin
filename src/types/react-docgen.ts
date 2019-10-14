declare module "react-docgen" {
    export interface Props {
        [key: string]: PropItem;
    }
    export interface ComponentDoc {
        displayName: string;
        description: string;
        props: Props;
    }

    export interface PropItem {
        name: string;
        required: boolean;
        type: PropItemType;
        description: string;
    }

    export interface PropItemType {
        name: string;
        value?: PropItemValue;
        raw?: string;
    }

    export interface PropItemValue {
        value: string;
        computed: boolean;
    }

    export function parse(file: Buffer): ComponentDoc;
}