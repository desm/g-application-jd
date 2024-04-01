import type { FunctionComponent } from 'react';
import * as React from 'react';
import {
  applicationState,
  closeDialog,
  createOpenaiAssistantThreadForProductDescription,
} from './stateStores/application';

export interface Props {}

const TurnOnAiAssistantDialog: FunctionComponent<Props> = (props: Props) => {
  const turnOn = async (e) => {
    e.preventDefault();
    closeDialog('turnOnAiAssistantDialog');
    createOpenaiAssistantThreadForProductDescription();
  };

  return (
    <dialog
      aria-labelledby=":r0:"
      open={applicationState.dialogs.turnOnAiAssistantDialog == 'open'}
      onMouseDown={(e) => {
        e.stopPropagation(); /* prevents document.body "mousedown" handler from closing this dialog (search for "closeAllDialogs") */
        e.preventDefault(); /* prevents rich text selection from disappearing */
      }}
    >
      <header>
        <h2 id=":r0:">Turn On AI Assistant</h2>
        <div
          role="button"
          className="close"
          aria-label="Close"
          onClick={() => closeDialog('turnOnAiAssistantDialog')}
        ></div>
      </header>
      <h4>
        Are you sure you want to turn on the AI Assistant for this product's description? Once turned on, a note will
        appear under the product's description to let others know that AI may have been used to write parts of it. This
        action cannot be undone.
      </h4>
      <footer>
        <button onClick={() => closeDialog('turnOnAiAssistantDialog')}>Cancel</button>
        <button className="accent" onClick={turnOn}>
          Turn On
        </button>
      </footer>
    </dialog>
  );
};

export default TurnOnAiAssistantDialog;
