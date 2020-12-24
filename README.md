# Zeplin CLI React Plugin

[Zeplin CLI](https://github.com/zeplin/cli) plugin to generate descriptions and code snippets for React components.

## Installation

Install the plugin using npm.

```sh
npm install -g @zeplin/cli-connect-react-plugin
```

## Usage

Run CLI `connect` command using the plugin.

```sh
zeplin connect -p @zeplin/cli-connect-react-plugin
```

Zeplin CLI React Plugin uses [react-docgen](https://github.com/reactjs/react-docgen) and [react-docgen-typescript](https://github.com/styleguidist/react-docgen-typescript) to analyze and collect information from React components. For more details about the supported formats, see `react-docgen` [guidelines](https://github.com/reactjs/react-docgen#guidelines-for-default-resolvers-and-handlers) and `react-docgen-typescript` [examples](https://github.com/styleguidist/react-docgen-typescript#example).

You can choose to use either `react-docgen` or `react-docgen-typescript` for TypeScript in your plugin configurations.

```jsonc
{
    ...
    "plugins" : [{
        "name": "@zeplin/cli-connect-react-plugin",
        "config": {
            "tsDocgen": "react-docgen-typescript", // Uses react-docgen by default
            "tsConfigPath": "/path/to/tsconfig.json" // Defaults to ./tsconfig.json
        }
    }],
    ...
}
```

## About Connected Components

[Connected Components](https://blog.zeplin.io/introducing-connected-components-components-in-design-and-code-in-harmony-aa894ed5bd95) in Zeplin lets you access components in your codebase directly on designs in Zeplin, with links to Storybook, GitHub and any other source of documentation based on your workflow. 🧩

[Zeplin CLI](https://github.com/zeplin/cli) uses plugins like this one to analyze component source code and publishes a high-level overview to be displayed in Zeplin.
