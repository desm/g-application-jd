import type { FunctionComponent } from 'react';
import * as React from 'react';
import { applicationState, closeDialog } from './stateStores/application';
import { changeEditorState, textEditorState } from './stateStores/textEditor';

export interface Props {}

const MakeShorterLongerDialog: FunctionComponent<Props> = (props: Props) => {
  const replaceButtonClickHandler = (e) => {
    closeDialog('makeShorterLongerDialog');
    changeEditorState(
      'basicTab',
      textEditorState.basicTab.editorView.state.tr.insertText(applicationState.reworkedText)
    );
  };

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
      {applicationState.flags.isRequestReworkOfSelectedTextPending ? (
        <>
          <h4 style={{ marginBottom: '1em' }}>
            Making the following text {applicationState.props.makeShorterLongerDialog.mode}:
          </h4>
          <h4 style={{ marginBottom: '1em' }}>{applicationState.props.makeShorterLongerDialog.text}</h4>
          <h4 style={{ marginBottom: '1em' }}>
            <div role="progressbar"></div>
          </h4>
        </>
      ) : (
        <>
          <h4 style={{ marginBottom: '1em' }}>Original Text:</h4>
          <h4 style={{ marginBottom: '1em' }}>{applicationState.props.makeShorterLongerDialog.text}</h4>
          {applicationState.reworkedText ? (
            <>
              <h4 style={{ marginBottom: '1em' }}>
                {applicationState.props.makeShorterLongerDialog.mode === 'shorter' ? 'Shorter Text:' : 'Longer Text:'}
              </h4>
              <h4 style={{ marginBottom: '1em' }}>{applicationState.reworkedText}</h4>
            </>
          ) : (
            <>
              <h4 style={{ marginBottom: '1em' }}>Oops...</h4>
              <h4 style={{ marginBottom: '1em' }}>Rate limit exceeded. Please try again in a few seconds.</h4>
            </>
          )}
        </>
      )}
      <footer>
        <button onClick={() => closeDialog('makeShorterLongerDialog')}>Cancel</button>
        {!applicationState.flags.isRequestReworkOfSelectedTextPending && applicationState.reworkedText && (
          <button className="accent" onClick={replaceButtonClickHandler}>
            Replace
          </button>
        )}
      </footer>
    </dialog>
  );
};

export default MakeShorterLongerDialog;
