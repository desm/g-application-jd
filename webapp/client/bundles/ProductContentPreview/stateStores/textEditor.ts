import { EditorState } from 'prosemirror-state';
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
    editorState: EditorState;
    editorView: EditorView;
  };
  previewPane: {
    editorState: EditorState;
    editorView: EditorView;
  };
  contentTab: {
    editorState: EditorState;
    editorView: EditorView;
  };
}

const initialState = {
  basicTab: {
    editorState: null,
    editorView: null,
  },
  previewPane: {
    editorState: null,
    editorView: null,
  },
  contentTab: {
    editorState: null,
    editorView: null,
  },
} as State;

let state: State;
let dispatch: Dispatch<any>;

export { state as textEditorState };

function reducer(draft, action: { type: string; [key: string]: any }) {
  switch (action.type) {
    case 'EDITOR_STATE_SET': {
      draft[action.whichEditor].editorState = action.editorState;
      break;
    }
    case 'EDITOR_VIEW_SET': {
      draft[action.whichEditor].editorView = action.editorView;
      break;
    }
    case 'EDITOR_TRANSACTION_OCCURRED': {
      if (action.whichEditor === 'basicTab') {
        // only apply the transaction if both the basic tab and preview pane editors are ready
        if (draft.basicTab.editorState && draft.previewPane.editorState) {
          draft[action.whichEditor].editorState = draft[action.whichEditor].editorState.apply(action.transaction);
          draft[action.whichEditor].editorView.updateState(draft[action.whichEditor].editorState);
          draft.previewPane.editorState = draft.previewPane.editorState.apply(action.transaction);
          draft.previewPane.editorView.updateState(draft.previewPane.editorState);
        }
      } else {
        draft[action.whichEditor].editorState = draft[action.whichEditor].editorState.apply(action.transaction);
        draft[action.whichEditor].editorView.updateState(draft[action.whichEditor].editorState);
      }
      break;
    }
    case 'EDITOR_STATE_RECONFIGURED': {
      draft[action.whichEditor].editorState = action.editorState;
      draft[action.whichEditor].editorView.updateState(draft[action.whichEditor].editorState);
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

export const setEditorState = (whichEditor: WhichOfBasicPreviewContent, editorState: EditorState) => {
  dispatch({
    type: 'EDITOR_STATE_SET',
    whichEditor,
    editorState,
  });
};

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
        console.log('basic tab rich text changed', editorState.toJSON());
        changeRichTextDescription(editorState.toJSON());
      } else if (whichEditor === 'contentTab') {
        console.log('content tab rich text changed', editorState.toJSON());
        changeRichTextContent(editorState.toJSON());
      }
    },
  });
};
