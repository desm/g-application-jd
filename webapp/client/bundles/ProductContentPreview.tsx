import type { FunctionComponent } from 'react';
import * as React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useImmerReducer } from 'use-immer';
import DiscoverSettings from './ProductContentPreview/DiscoverSettings';
import Header from './ProductContentPreview/Header';
import Preview from './ProductContentPreview/Preview';
import ProductContent from './ProductContentPreview/ProductContent';
import ProfileSettings from './ProductContentPreview/ProfileSettings';
import Sections from './ProductContentPreview/Sections';
import ShareLinks from './ProductContentPreview/ShareLinks';
import { EditorState } from 'prosemirror-state';
import { schema } from 'prosemirror-schema-basic';
import { Schema } from 'prosemirror-model';
import { addListNodes } from 'prosemirror-schema-list';
import { exampleSetup } from 'prosemirror-example-setup';

export interface Props {}

const initialState = {
  productName: 'product name',
  nextId: 3,
  initialTasks: [
    { id: 0, text: 'Visit Kafka Museum', done: true },
    { id: 1, text: 'Watch a puppet show', done: false },
    { id: 2, text: 'Lennon Wall pic', done: false },
  ],
  richTextEditorDoc: {} as any,
};

const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks,
});

const initialEditorState = {
  editor: EditorState.create({ schema: mySchema, plugins: exampleSetup({ schema: mySchema }) }),
};

function reducer(draft: typeof initialState, action: { type: string; [key: string]: any }) {
  switch (action.type) {
    case 'TASK_ADDED': {
      draft.initialTasks.push({
        id: draft.nextId++,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'TASK_CHANGED': {
      const index = draft.initialTasks.findIndex((t) => t.id === action.task.id);
      draft.initialTasks[index] = action.task;
      break;
    }
    case 'TASK_DELETED': {
      draft.initialTasks = draft.initialTasks.filter((t) => t.id !== action.id);
      break;
    }
    case 'PRODUCT_NAME_CHANGED': {
      draft.productName = action.productName;
      break;
    }
    case 'RICH_TEXT_DOCUMENT_CHANGED': {
      console.log(JSON.stringify(action.richTextEditorDoc, null, 4));
      draft.richTextEditorDoc = action.richTextEditorDoc;
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

function editorReducer(draft, action: { type: string; [key: string]: any }) {
  switch (action.type) {
    case 'EDITOR_TRANSACTION_OCCURRED': {
      draft.editor = draft.editor.apply(action.transaction);
      (window as any).view.updateState(draft.editor);
      // action.dispatch({
      //   type: 'RICH_TEXT_DOCUMENT_CHANGED',
      //   richTextEditorDoc: draft.editor.toJSON().doc,
      // });
      action.nextAction(draft.editor);
      break;
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

/**
 * this component uses the following technique:
 * https://react.dev/reference/react-dom/createPortal#rendering-react-components-into-non-react-dom-nodes
 */
const ProductContentPreview: FunctionComponent<Props> = (props: Props) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);
  const [editorState, editorDispatch] = useImmerReducer(editorReducer, initialEditorState);

  const changeProductName = (productName: string) => {
    dispatch({
      type: 'PRODUCT_NAME_CHANGED',
      productName,
    });
    document.title = productName;
  };

  const changeEditorState = (transaction: any) => {
    editorDispatch({
      type: 'EDITOR_TRANSACTION_OCCURRED',
      transaction,
      // dispatch
      nextAction: (editor) => {
        dispatch({
          type: 'RICH_TEXT_DOCUMENT_CHANGED',
          richTextEditorDoc: editor.toJSON().doc,
        });
      },
    });
  };

  useEffect(() => {
    const editElement = document.getElementById('edit-link-basic-form');
    editElement.removeChild(editElement.firstChild); // removes the text node "Initializing..."
    editElement.parentElement.style.display = '';

    const previewElement = document.getElementById('product-preview-root');
    previewElement.style.display = '';
  }, []);

  return (
    <>
      {createPortal(<Header productName={state.productName} />, document.getElementById('header-root'))}
      {createPortal(<ProductContent />, document.getElementById('edit-link-content-form'))}
      {createPortal(<ShareLinks />, document.getElementById('share-links-root'))}
      {createPortal(<ProfileSettings />, document.getElementById('profile-settings-root'))}
      {createPortal(<DiscoverSettings />, document.getElementById('discover-settings-root'))}
      {createPortal(
        <Sections
          productName={state.productName}
          changeProductName={changeProductName}
          state={editorState}
          changeEditorState={changeEditorState}
        />,
        document.getElementById('edit-link-basic-form')
      )}
      {createPortal(<Preview productName={state.productName} />, document.getElementById('product-preview-root'))}
    </>
  );
};

export default ProductContentPreview;
