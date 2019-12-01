import React from 'react';

type Props = {
  children?: React.Node
};

/**
 * General component description.
 */
export default class MyComponent extends React.Component<void, Props, void> {
  props: Props;

  render(): ReactElement {
    // ...
  }
}