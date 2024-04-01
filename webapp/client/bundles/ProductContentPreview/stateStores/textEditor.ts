import { EditorView } from 'prosemirror-view';
import { Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';
import { changeRichTextContent, changeRichTextDescription } from './application';

/**
 * keeping a second state store for the ProseMirror EditorState and EditorView instances
 * helps keep the application state store containing simple primitive and object types only
 */

interface State {
  basicTab: {
    editorView: EditorView;
  };
  previewPane: {
    editorView: EditorView;
  };
  contentTab: {
    editorView: EditorView;
  };
}

const initialState = {
  basicTab: {
    editorView: null,
  },
  previewPane: {
    editorView: null,
  },
  contentTab: {
    editorView: null,
  },
} as State;

let state: State;
let dispatch: Dispatch<any>;

// for testing
(window as any)['getSelectedTextOfRichTextDescription'] = () => {
  const getSelectedText = (editorView: EditorView): string =>
    editorView.state.doc.textBetween(editorView.state.selection.from, editorView.state.selection.to);
  console.log(getSelectedText(state.basicTab.editorView));
};

export { state as textEditorState };

function reducer(draft, action: { type: string; [key: string]: any }) {
  switch (action.type) {
    case 'EDITOR_VIEW_SET': {
      draft[action.whichEditor].editorView = action.editorView;
      break;
    }
    case 'EDITOR_TRANSACTION_OCCURRED': {
      if (action.whichEditor === 'basicTab') {
        // only apply the transaction if both the basic tab and preview pane editors are ready
        if (draft.basicTab.editorView && draft.previewPane.editorView) {
          const basicEditorView = draft.basicTab.editorView;
          basicEditorView.updateState(basicEditorView.state.apply(action.transaction));

          const previewEditorView = draft.previewPane.editorView;
          previewEditorView.updateState(previewEditorView.state.apply(action.transaction));

          action.callback(basicEditorView.state);
        }
      } else {
        const contentEditorView = draft.contentTab.editorView;
        contentEditorView.updateState(contentEditorView.state.apply(action.transaction));
        action.callback(contentEditorView.state);
      }
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

/**
 * note: this function may get called several times during bootup
 */
export const useTextEditorState = () => {
  [state, dispatch] = useImmerReducer(reducer, initialState);
};

type WhichOfBasicPreviewContent = keyof State;
type WhichOfBasicContent = Exclude<WhichOfBasicPreviewContent, 'previewPane'>;

export const setEditorView = (whichEditor: WhichOfBasicPreviewContent, editorView: EditorView) => {
  dispatch({
    type: 'EDITOR_VIEW_SET',
    whichEditor,
    editorView,
  });
};

export const changeEditorState = (whichEditor: WhichOfBasicContent, transaction: any) => {
  dispatch({
    type: 'EDITOR_TRANSACTION_OCCURRED',
    whichEditor,
    transaction,
    callback: (editorState) => {
      if (whichEditor === 'basicTab') {
        changeRichTextDescription(editorState.toJSON());
      } else if (whichEditor === 'contentTab') {
        changeRichTextContent(editorState.toJSON());
      }
    },
  });
};
