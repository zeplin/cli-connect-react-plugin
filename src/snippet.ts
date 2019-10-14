import { PropItem, Props, ComponentDoc } from "react-docgen";

const INDENT = "  ";

const generateProperty = (name: string, propItem: PropItem): string => `${name}=[${propItem.type.name}]`;

const generateProperties = (props: Props): string => Object.keys(props)
    .map(key => `${INDENT}${generateProperty(key, props[key])}`)
    .join("\n");

const generateSnippet = (component: ComponentDoc): string =>
    `<${component.displayName}${component.props ? `\n${generateProperties(component.props)}` : ""} />`;

export {
    generateProperties,
    generateProperty,
    generateSnippet
};
