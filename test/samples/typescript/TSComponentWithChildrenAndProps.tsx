import React, { Component } from 'react';

type Props = {
  children?: React.ReactNode;
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
  onClick: () => void;
  onChange: (id: number) => void;
  onClick(event: React.MouseEvent<HTMLButtonElement>): void;
  optional?: OptionalType;
};

/**
 * General component description.
 */
export default class MyComponent extends Component<Props, {}> {
  props: Props;

  render() {
    // ...
  }
}