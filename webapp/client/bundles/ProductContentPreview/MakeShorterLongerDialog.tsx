import type { FunctionComponent } from 'react';
import * as React from 'react';
import { applicationState, closeDialog } from './stateStores/application';

export interface Props {}

const MakeShorterLongerDialog: FunctionComponent<Props> = (props: Props) => {
  return (
    <dialog
      aria-labelledby=":r0:"
      open={applicationState.dialogs.makeShorterLongerDialog == 'open'}
      onMouseDown={(e) => {
        e.stopPropagation(); /* prevents document.body "mousedown" handler from closing this dialog (search for "closeAllDialogs") */
        e.preventDefault(); /* prevents rich text selection from disappearing */
      }}
    >
      <header>
        <h2 id=":r0:">AI Assistant</h2>
        <div
          role="button"
          className="close"
          aria-label="Close"
          onClick={() => closeDialog('makeShorterLongerDialog')}
        ></div>
      </header>
      <h4 style={{ marginBottom: '1em' }}>
        Making the following text {applicationState.props.makeShorterLongerDialog.mode}:
      </h4>
      <h4 style={{ marginBottom: '1em' }}>{applicationState.props.makeShorterLongerDialog.text}</h4>
      <h4 style={{ marginBottom: '1em' }}>
        <div role="progressbar"></div>
      </h4>
      <footer>
        <button onClick={() => closeDialog('makeShorterLongerDialog')}>Cancel</button>
      </footer>
    </dialog>
  );
};

export default MakeShorterLongerDialog;
