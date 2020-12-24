import React from 'react';
import OtherComponent, { OtherProps } from './TSOtherComponent';

type Props = OtherProps & {
  children?: React.ReactNode;
  message: string;
};

/**
 * General component description.
 */
export default class MyComponent extends OtherComponent {
  props: Props;

  render() {
    // ...
    return void 0;
  }
}