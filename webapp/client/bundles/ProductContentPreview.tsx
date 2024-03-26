import type { FunctionComponent } from 'react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import DiscoverSettings from './ProductContentPreview/DiscoverSettings';
import Header from './ProductContentPreview/Header';
import Preview from './ProductContentPreview/Preview';
import ProductContent from './ProductContentPreview/ProductContent';
import ProfileSettings from './ProductContentPreview/ProfileSettings';
import Sections from './ProductContentPreview/Sections';
import ShareLinks from './ProductContentPreview/ShareLinks';
import {
  state,
  initApplicationStore,
  setAvatarUrl,
  setActiveTab,
} from './ProductContentPreview/stateStores/application';
import { editorState, initEditorStore } from './ProductContentPreview/stateStores/textEditor';
import rtDocBasicTab from './ProductContentPreview/rtDocBasicTab.json'
import rtDocContentTab from './ProductContentPreview/rtDocContentTab.json'
import { grabAllDataFromDataDivs } from './lib';
import { createHashRouter, redirect, RouterProvider } from 'react-router-dom';

const setVisibilityOfProductTab = (visible: boolean) => {
  const basicTab = document.querySelector('.edit-page-tab.basic-tab') as HTMLElement;
  basicTab.style.display = visible ? '' : 'none';
};

const setVisibilityOfContentTab = (visible: boolean) => {
  const contentTab = document.querySelector('.edit-page-tab.content-tab') as HTMLElement;
  contentTab.style.display = visible ? '' : 'none';
};

const setVisibilityOfShareTab = (visible: boolean) => {
  const shareTab = document.querySelector('.edit-page-tab.share-tab') as HTMLElement;
  shareTab.style.display = visible ? '' : 'none';
};

const setVisibilityOfPreviewPane = (visible: boolean) => {
  const previewElement = document.getElementById('product-preview-root');
  previewElement.style.display = visible ? '' : 'none';
};

export interface Props {}

const ProductContentPreview: FunctionComponent<Props> = (props: Props) => {
  initApplicationStore({ productName: 'Product Name' });
  initEditorStore(rtDocBasicTab, rtDocContentTab);

  const [router, setRouter] = useState(null);

  useEffect(() => {
    const editElement = document.getElementById('edit-link-basic-form');
    editElement.removeChild(editElement.firstChild); // removes the text node "Initializing..."

    const divData = grabAllDataFromDataDivs();
    setAvatarUrl(divData['edit-attributes']['seller']['avatar_url']);

    setRouter(
      createHashRouter([
        {
          path: '',
          element: <></>,
          loader: async () => {
            setActiveTab('ACTIVE_TAB_PRODUCT');
            return null;
          },
        },
        {
          path: 'content',
          element: <></>,
          loader: async () => {
            setActiveTab('ACTIVE_TAB_CONTENT');
            return null;
          },
        },
        {
          path: 'share',
          element: <></>,
          loader: async () => {
            if (!state.published) {
              return redirect('/')
            }
            setActiveTab('ACTIVE_TAB_SHARE');
            return null;
          },
        },
      ])
    );
  }, []);

  useEffect(() => {
    switch (state.activeTab) {
      case 'ACTIVE_TAB_PRODUCT': {
        setVisibilityOfProductTab(true);
        setVisibilityOfContentTab(false);
        setVisibilityOfShareTab(false);
        setVisibilityOfPreviewPane(true);
        break;
      }
      case 'ACTIVE_TAB_CONTENT': {
        setVisibilityOfProductTab(false);
        setVisibilityOfContentTab(true);
        setVisibilityOfShareTab(false);
        setVisibilityOfPreviewPane(false);
        break;
      }
      case 'ACTIVE_TAB_SHARE': {
        setVisibilityOfProductTab(false);
        setVisibilityOfContentTab(false);
        setVisibilityOfShareTab(true);
        setVisibilityOfPreviewPane(true);
        break;
      }
    }
  }, [state.activeTab]);

  /* info on "createPortal": https://react.dev/reference/react-dom/createPortal#rendering-react-components-into-non-react-dom-nodes */
  return (
    <>
      {createPortal(<Header productName={state.productName} />, document.getElementById('header-root'))}
      {createPortal(<ProductContent />, document.getElementById('edit-link-content-form'))}
      {createPortal(<ShareLinks />, document.getElementById('share-links-root'))}
      {createPortal(<ProfileSettings />, document.getElementById('profile-settings-root'))}
      {createPortal(<DiscoverSettings />, document.getElementById('discover-settings-root'))}
      {editorState.editorState && createPortal(<Sections />, document.getElementById('edit-link-basic-form'))}
      {editorState.editorState && createPortal(<Preview />, document.getElementById('product-preview-root'))}
      {router && <RouterProvider router={router} />}
    </>
  );
};

export default ProductContentPreview;
