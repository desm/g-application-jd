import type { FunctionComponent } from 'react';
import * as React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import DiscoverSettings from './ProductContentPreview/DiscoverSettings';
import Header from './ProductContentPreview/Header';
import Preview from './ProductContentPreview/Preview';
import ProductContent from './ProductContentPreview/ProductContent';
import ProfileSettings from './ProductContentPreview/ProfileSettings';
import Sections from './ProductContentPreview/Sections';
import ShareLinks from './ProductContentPreview/ShareLinks';
import { state, initApplicationStore, setAvatarUrl } from './ProductContentPreview/stateStores/application';
import { editorState, initEditorStore } from './ProductContentPreview/stateStores/textEditor';
import doc from './doc.json';
import { grabAllDataFromDataDivs } from './lib';
import { createHashRouter, RouterProvider } from 'react-router-dom';

const A: FunctionComponent<Props> = () => {
  return (
    <>
      {createPortal(<Header productName={state.productName} />, document.getElementById('header-root'))}
      {editorState.editorState && createPortal(<Sections />, document.getElementById('edit-link-basic-form'))}
      {editorState.editorState && createPortal(<Preview />, document.getElementById('product-preview-root'))}
    </>
  );
};

const B: FunctionComponent<Props> = () => {
  return (
    <>
      {createPortal(<Header productName={state.productName} />, document.getElementById('header-root'))}
      {createPortal(<ProductContent />, document.getElementById('edit-link-content-form'))}
    </>
  );
};

const C: FunctionComponent<Props> = () => {
  return (
    <>
      {createPortal(<Header productName={state.productName} />, document.getElementById('header-root'))}
      {createPortal(<ShareLinks />, document.getElementById('share-links-root'))}
      {createPortal(<ProfileSettings />, document.getElementById('profile-settings-root'))}
      {createPortal(<DiscoverSettings />, document.getElementById('discover-settings-root'))}
    </>
  );
};

const router = createHashRouter([
  {
    path: '',
    element: <A />,
    loader: async () => {
      return null;
    },
  },
  {
    path: 'content',
    element: <B />,
    loader: async () => {
      return null;
    },
  },
  {
    path: 'share',
    element: <C />,
    loader: async () => {
      return null;
    },
  },
]);

export interface Props {}

const ProductContentPreview: FunctionComponent<Props> = (props: Props) => {
  initApplicationStore({ productName: 'Product Name' });
  initEditorStore(doc);

  useEffect(() => {
    const editElement = document.getElementById('edit-link-basic-form');
    editElement.removeChild(editElement.firstChild); // removes the text node "Initializing..."
    editElement.parentElement.style.display = '';

    const previewElement = document.getElementById('product-preview-root');
    previewElement.style.display = '';

    const divData = grabAllDataFromDataDivs();
    setAvatarUrl(divData['edit-attributes']['seller']['avatar_url']);
  }, []);

  return <RouterProvider router={router} />;
};

export default ProductContentPreview;
