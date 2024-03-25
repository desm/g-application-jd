import type { FunctionComponent } from 'react';
import * as React from 'react';

export interface Props {}

// Note, you need to declare the `FunctionComponent` type so that it complies
// with `ReactOnRails.register` type.
const Routed: FunctionComponent<Props> = (props: Props) => {
  return <></>;
};

export default Routed;
