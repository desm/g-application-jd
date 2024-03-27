import { exampleSetup } from 'prosemirror-example-setup';
import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useImmerReducer } from 'use-immer';
import { changeRichTextDescription, changeRichTextContent } from './application';

/**
 * keeping a second state store for the ProseMirror EditorState and EditorView instances
 * helps keep the application state store using simple primitive and object types
 */

interface State {
  editorState: EditorState;
  mainEditorView: EditorView;
  previewEditorView: EditorView;

  contentEditorState: EditorState;
  contentEditorView: EditorView;
}

let initialState = {} as State;
export let editorState = {} as State;
let dispatch = null;

function reducer(draft, action: { type: string; [key: string]: any }) {
  switch (action.type) {
    case 'EDITOR_STATE_SET': {
      draft.editorState = action.editorState;
      break;
    }
    case 'MAIN_EDITOR_VIEW_SET': {
      draft.mainEditorView = action.view;
      break;
    }
    case 'PREVIEW_EDITOR_VIEW_SET': {
      draft.previewEditorView = action.view;
      break;
    }
    case 'EDITOR_TRANSACTION_OCCURRED': {
      draft.editorState = draft.editorState.apply(action.transaction);
      draft.mainEditorView.updateState(draft.editorState);
      draft.previewEditorView.updateState(draft.editorState);
      action.callback(draft.editorState);
      break;
    }
    case 'EDITOR_STATE_RECONFIGURED': {
      draft.editorState = action.editorState;
      draft.mainEditorView.updateState(draft.editorState);
      if (draft.previewEditorView) {
        draft.previewEditorView.updateState(draft.editorState);
      }
      break;
    }
    case 'CONTENT_EDITOR_STATE_SET': {
      draft.contentEditorState = action.editorState;
      break;
    }
    case 'CONTENT_EDITOR_VIEW_SET': {
      draft.contentEditorView = action.editorView;
      break;
    }
    case 'CONTENT_EDITOR_TRANSACTION_OCCURRED': {
      draft.contentEditorState = draft.contentEditorState.apply(action.transaction);
      draft.contentEditorView.updateState(draft.contentEditorState);
      action.callback(draft.contentEditorState);
      break;
    }
    case 'CONTENT_EDITOR_STATE_RECONFIGURED': {
      draft.contentEditorState = action.contentEditorState;
      draft.contentEditorView.updateState(draft.contentEditorState);
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
export const initEditorStore = (basicTabRichTextDoc: any, contentTabRichTextDoc: any) => {
  [editorState, dispatch] = useImmerReducer(reducer, initialState);

  if (!editorState.editorState) {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks,
    });

    dispatch({
      type: 'EDITOR_STATE_SET',
      editorState: EditorState.fromJSON(
        { schema: mySchema, plugins: exampleSetup({ schema: mySchema }) },
        basicTabRichTextDoc
      ),
    });
  }

  if (!editorState.contentEditorState) {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks,
    });

    dispatch({
      type: 'CONTENT_EDITOR_STATE_SET',
      editorState: EditorState.fromJSON(
        { schema: mySchema, plugins: exampleSetup({ schema: mySchema, menuBar: false }) },
        contentTabRichTextDoc
      ),
    });
  }
};

export const setMainEditorView = (view: EditorView) => {
  dispatch({
    type: 'MAIN_EDITOR_VIEW_SET',
    view,
  });
};

export const setPreviewEditorView = (view: EditorView) => {
  dispatch({
    type: 'PREVIEW_EDITOR_VIEW_SET',
    view,
  });
};

export const changeEditorState = (transaction: any) => {
  dispatch({
    type: 'EDITOR_TRANSACTION_OCCURRED',
    transaction,
    callback: (editorState) => {
      console.log('basic tab rich text changed', editorState.toJSON());
      changeRichTextDescription(editorState.toJSON());
    },
  });
};

export const reconfigureEditorState = (editorState: EditorState) => {
  dispatch({
    type: 'EDITOR_STATE_RECONFIGURED',
    editorState,
  });
};

export const setContentEditorView = (editorView: EditorView) => {
  dispatch({
    type: 'CONTENT_EDITOR_VIEW_SET',
    editorView,
  });
};

export const changeContentEditorState = (transaction: any) => {
  dispatch({
    type: 'CONTENT_EDITOR_TRANSACTION_OCCURRED',
    transaction,
    callback: (contentEditorState) => {
      console.log('content tab rich text changed', contentEditorState.toJSON());
      changeRichTextContent(contentEditorState.toJSON());
    },
  });
};

export const reconfigureContentEditorState = (contentEditorState: EditorState) => {
  dispatch({
    type: 'CONTENT_EDITOR_STATE_RECONFIGURED',
    contentEditorState,
  });
};
