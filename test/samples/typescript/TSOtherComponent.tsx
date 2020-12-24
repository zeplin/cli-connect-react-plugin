import React, { Component } from 'react';

export type OtherProps = {
  other: string;
};

/**
 * General component description.
 */
export default class MyComponent extends React.Component<OtherProps, {}> {
  props: OtherProps;

  render() {
    // ...
    return void 0;
  }
}