import { exampleSetup } from 'prosemirror-example-setup';
import { Schema } from 'prosemirror-model';
import { schema } from 'prosemirror-schema-basic';
import { addListNodes } from 'prosemirror-schema-list';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import type { FunctionComponent } from 'react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useImmerReducer } from 'use-immer';
import DiscoverSettings from './ProductContentPreview/DiscoverSettings';
import Header from './ProductContentPreview/Header';
import Preview from './ProductContentPreview/Preview';
import ProductContent from './ProductContentPreview/ProductContent';
import ProfileSettings from './ProductContentPreview/ProfileSettings';
import Sections from './ProductContentPreview/Sections';
import ShareLinks from './ProductContentPreview/ShareLinks';

export interface Props {}

const ProductContentPreview: FunctionComponent<Props> = (props: Props) => {
  // "rte" for Rich Text Editor
  const [rteView, setRteView] = useState<EditorView>();
  const [rtePreview, setRtePreview] = useState<EditorView>();

  // schema used by the ProseMirror rich text editor
  const mySchema = new Schema({
    nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
    marks: schema.spec.marks,
  });

  // first state store
  const initialState = {
    productName: 'product name',
    richTextEditorDoc: {} as any, // represents the rich text editor document data that is saved
  };

  // second state store for the rich text editor
  const initialEditorState = {
    editorState: EditorState.create({ schema: mySchema, plugins: exampleSetup({ schema: mySchema }) }),
  };

  // reducer for the first state store
  function reducer(draft: typeof initialState, action: { type: string; [key: string]: any }) {
    switch (action.type) {
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

  // reducer for the second state store, the one for the rich text editor
  function editorReducer(draft, action: { type: string; [key: string]: any }) {
    switch (action.type) {
      case 'EDITOR_TRANSACTION_OCCURRED': {
        if (rteView && rtePreview) {
          draft.editorState = draft.editorState.apply(action.transaction);
          rteView.updateState(draft.editorState);
          rtePreview.updateState(draft.editorState);
          action.callback(draft.editorState);
        }
        break;
      }
      default: {
        throw Error('Unknown action: ' + action.type);
      }
    }
  }

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
      callback: (editorState) => {
        dispatch({
          type: 'RICH_TEXT_DOCUMENT_CHANGED',
          richTextEditorDoc: editorState.toJSON().doc,
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
      {/* info on "createPortal" technique: https://react.dev/reference/react-dom/createPortal#rendering-react-components-into-non-react-dom-nodes */}
      {createPortal(<Header productName={state.productName} />, document.getElementById('header-root'))}
      {createPortal(<ProductContent />, document.getElementById('edit-link-content-form'))}
      {createPortal(<ShareLinks />, document.getElementById('share-links-root'))}
      {createPortal(<ProfileSettings />, document.getElementById('profile-settings-root'))}
      {createPortal(<DiscoverSettings />, document.getElementById('discover-settings-root'))}
      {createPortal(
        <Sections
          productName={state.productName}
          changeProductName={changeProductName}
          editorState={editorState}
          changeEditorState={changeEditorState}
          setRteView={setRteView}
        />,
        document.getElementById('edit-link-basic-form')
      )}
      {createPortal(
        <Preview productName={state.productName} editorState={editorState} setRtePreview={setRtePreview} />,
        document.getElementById('product-preview-root')
      )}
    </>
  );
};

export default ProductContentPreview;
