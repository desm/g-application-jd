import type { FunctionComponent } from 'react';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { RouterProvider, createHashRouter, redirect } from 'react-router-dom';
import DiscoverSettings from './ProductContentPreview/DiscoverSettings';
import Header from './ProductContentPreview/Header';
import Preview from './ProductContentPreview/Preview';
import ProductContent from './ProductContentPreview/ProductContent';
import ProfileSettings from './ProductContentPreview/ProfileSettings';
import Sections from './ProductContentPreview/Sections';
import ShareLinks from './ProductContentPreview/ShareLinks';
import {
  applicationState,
  changeProductName,
  setActiveTab,
  setAvatarUrl,
  setPrice,
  useApplicationState,
} from './ProductContentPreview/stateStores/application';
import { useTextEditorState } from './ProductContentPreview/stateStores/textEditor';
import { grabAllDataFromDataDivs } from './lib';

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
  useApplicationState();
  useTextEditorState();

  const [router, setRouter] = useState(null);

  let divData;

  useEffect(() => {
    const editElement = document.getElementById('edit-link-basic-form');
    editElement.removeChild(editElement.firstChild); // removes the text node "Initializing..."

    divData = grabAllDataFromDataDivs();
    setAvatarUrl(divData['edit-attributes']['seller']['avatar_url']);
    changeProductName(divData['edit-attributes']['name']);
    setPrice(divData['edit-attributes']['buy_price']);

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
            if (!applicationState.published) {
              return redirect('/');
            }
            setActiveTab('ACTIVE_TAB_SHARE');
            return null;
          },
        },
      ])
    );
  }, []);

  useEffect(() => {
    switch (applicationState.activeTab) {
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
  }, [applicationState.activeTab]);

  const dosomething = (e) => {
    e.preventDefault();
    const x = [
      ['link[name]', applicationState.productName, 'encode'],
      ['link[price_range]', applicationState.price, 'encode'],
      ['link[description]', JSON.stringify(applicationState.richTextDescription), 'encode'],
    ];
    console.log(JSON.stringify(x, null, 2));
  };

  /* info on "createPortal": https://react.dev/reference/react-dom/createPortal#rendering-react-components-into-non-react-dom-nodes */
  return (
    <>
      {createPortal(
        <Header productName={applicationState.productName} dosomething={dosomething} />,
        document.getElementById('header-root')
      )}
      {createPortal(<ProductContent />, document.getElementById('edit-link-content-form'))}
      {createPortal(<ShareLinks />, document.getElementById('share-links-root'))}
      {createPortal(<ProfileSettings />, document.getElementById('profile-settings-root'))}
      {createPortal(<DiscoverSettings />, document.getElementById('discover-settings-root'))}
      {createPortal(<Sections />, document.getElementById('edit-link-basic-form'))}
      {createPortal(<Preview />, document.getElementById('product-preview-root'))}
      {router && <RouterProvider router={router} />}
    </>
  );
};

export default ProductContentPreview;
