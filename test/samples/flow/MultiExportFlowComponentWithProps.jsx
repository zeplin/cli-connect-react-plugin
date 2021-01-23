import React from 'react';

type Props1 = {
  primitive: number,
  literalsAndUnion: 'string' | 'otherstring' | number,
  arr: Array<any>,
  func?: (value: string) => void,
  noParameterName?: string => void,
  obj?: { subvalue: boolean }
};

type Props2 = {
  primitive: number,
  literalsAndUnion: 'string' | 'otherstring' | number,
  arr: Array<any>
};

/** Component 1 description. Only this one should be shown */
export class MyComponent extends React.Component<void, Props1, void> {
  props: Props1;

  render(): ReactElement {
    // ...
  }
}

/** Component 2 description. This one should not be shown */
export class MyOtherComponent extends React.Component<void, Props2, void> {
  props: Props2;

  render(): ReactElement {
    // ...
  }
}