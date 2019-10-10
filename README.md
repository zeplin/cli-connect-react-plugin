# Zeplin CLI Link - React Component Processor

This plugin provides a processor to gather code snippets and descriptions from React components.

## Usage

Install this package along with @zeplin/cli npm package

```
npm install -g @zeplin/cli @zeplin/cli-link-react-processor
```

Execute link command on Zeplin CLI using -p option to include the plugin into the linking operation.
```
zeplin link -p @zeplin/cli-link-react-processor -f components.json
```