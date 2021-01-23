import React, { ReactNode } from 'react';

interface OptionalType {};

type Props1 = {
  message: string;
  count: number;
  disabled: boolean;
  names: string[];
  status: "waiting" | "success";
  obj: object;
  obj2: {};
  obj3: {
    id: string;
    title: string;
  };
  objArr: {
    id: string;
    title: string;
  }[];
  onSomething: Function;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onChange: (id: number) => void;
  optional?: OptionalType;
};

type Props2 = {
  message: string;
  count: number;
  disabled: boolean;
  names: string[];
  status: "waiting" | "success";
  obj: object;
  obj2: {};
};

/**
 * General component description.
 */
export class MyComponent extends React.Component<Props1, {}> {
  props: Props1;

  render(): ReactNode {
    // ...
    return;
  }
}

/**
 * General component description.
 */
export class MyOtherComponent extends React.Component<Props2, {}> {
  props: Props2;

  render(): ReactNode {
    // ...
    return;
  }
}