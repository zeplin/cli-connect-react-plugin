import React, { Component, MouseEvent } from 'react';

interface OptionalType {};

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
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  hele(event: MouseEvent<HTMLButtonElement>): void;
  onChange: (id: number) => void;
  optional?: OptionalType;
};

/**
 * General component description.
 */
export default class MyComponent extends React.Component<Props, {}> {
  props: Props;

  render() {
    // ...
  }
}