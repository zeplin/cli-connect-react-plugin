import React from 'react';

type Props = {
  primitive: number,
  literalsAndUnion: 'string' | 'otherstring' | number,
  arr: Array<any>,
  func?: (value: string) => void,
  noParameterName?: string => void,
  obj?: { subvalue: boolean }
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