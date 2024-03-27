import { exampleSetup } from 'prosemirror-example-setup';
import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useImmerReducer } from 'use-immer';
import { changeRichTextDescription, changeRichTextContent } from './application';
import { Dispatch } from 'react';

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
      draft[action.whichEditor].editorState = draft[action.whichEditor].editorState.apply(action.transaction);
      draft[action.whichEditor].editorView.updateState(draft[action.whichEditor].editorState);

      if (action.whichEditor === 'basicTab') {
        draft.previewPane.editorState = draft.previewPane.editorState.apply(action.transaction);
        draft.previewPane.editorView.updateState(draft.previewPane.editorState);
      }

      action.callback(draft[action.whichEditor].editorState);
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
 * important: during boot-up, this function gets called several times
 *
 * that is why we check if editorState.editorState is null before setting it
 */
export const initTextEditorState = (basicTabRichTextDoc: any, contentTabRichTextDoc: any) => {
  [state, dispatch] = useImmerReducer(reducer, initialState);

  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
    marks: schema.spec.marks,
  });

  if (!state.basicTab.editorState) {
    setEditorState(
      'basicTab',
      EditorState.fromJSON(
        // { schema: mySchema, plugins: exampleSetup({ schema: mySchema }) }, //
        { schema: mySchema, plugins: exampleSetup({ schema: mySchema, menuBar: false }) }, //
        basicTabRichTextDoc
      )
    );
  }

  if (!state.previewPane.editorState) {
    setEditorState(
      'previewPane',
      EditorState.fromJSON(
        { schema: mySchema, plugins: exampleSetup({ schema: mySchema, menuBar: false }) },
        basicTabRichTextDoc
      )
    );
  }

  if (!state.contentTab.editorState) {
    setEditorState(
      'contentTab',
      EditorState.fromJSON(
        { schema: mySchema, plugins: exampleSetup({ schema: mySchema, menuBar: false }) },
        contentTabRichTextDoc
      )
    );
  }
};

type WhichOfBasicPreviewContent = keyof State;
type WhichOfBasicContent = Exclude<WhichOfBasicPreviewContent, 'previewPane'>;

const setEditorState = (whichEditor: WhichOfBasicPreviewContent, editorState: EditorState) => {
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
        // console.log('basic tab rich text changed', editorState.toJSON());
        changeRichTextDescription(editorState.toJSON());
      } else if (whichEditor === 'contentTab') {
        // console.log('content tab rich text changed', editorState.toJSON());
        changeRichTextContent(editorState.toJSON());
      }
    },
  });
};

export const reconfigureEditorState = (whichEditor: WhichOfBasicPreviewContent, editorState: EditorState) => {
  dispatch({
    type: 'EDITOR_STATE_RECONFIGURED',
    whichEditor,
    editorState,
  });
};
