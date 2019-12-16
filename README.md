# Zeplin CLI Connected Components - React Plugin

This plugin provides a processor to gather code snippets and descriptions from React components.

React Plugin uses [react-docgen](https://github.com/reactjs/react-docgen) to gather information about React components. Check [here](https://github.com/reactjs/react-docgen#guidelines-for-default-resolvers-and-handlers) to find out which types of components are supported by default.

## Usage

Install this package along with @zeplin/cli npm package

```
npm install -g @zeplin/cli @zeplin/cli-connect-react-plugin
```

Execute connect command on Zeplin CLI using -p option to include the plugin into the connect operation.

```
zeplin connect -p @zeplin/cli-connect-react-plugin -f components.json
```
