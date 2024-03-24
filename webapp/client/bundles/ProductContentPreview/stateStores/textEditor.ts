import { exampleSetup } from 'prosemirror-example-setup';
import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import { useImmerReducer } from 'use-immer';
import { changeRichTextDescription } from './application';

/**
 * keeping a second state store for the ProseMirror EditorState and EditorView instances
 * helps keep the application state store using simple primitive and object types
 */

interface State {
  editorState: EditorState;
  mainEditorView: EditorView;
  previewEditorView: EditorView;
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
export const initEditorStore = (doc: any) => {
  [editorState, dispatch] = useImmerReducer(reducer, initialState);

  if (!editorState.editorState) {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
      marks: schema.spec.marks,
    });

    dispatch({
      type: 'EDITOR_STATE_SET',
      editorState: EditorState.fromJSON({ schema: mySchema, plugins: exampleSetup({ schema: mySchema }) }, doc),
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
      console.log(editorState.toJSON());
      changeRichTextDescription(editorState.toJSON().doc);
    },
  });
};
