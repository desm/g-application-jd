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
import TurnOnAiAssistantDialog from './ProductContentPreview/TurnOnAiAssistantDialog';
import {
  applicationState,
  changeHasOpenaiAssistantThreadForDescription,
  changeProductName,
  changeRichTextContent,
  changeRichTextDescription,
  closeAllDialogs,
  setActiveTab,
  setAvatarUrl,
  setPermalink,
  setPrice,
  useApplicationState,
} from './ProductContentPreview/stateStores/application';
import { useTextEditorState } from './ProductContentPreview/stateStores/textEditor';
import { encode } from './formUrlEncoder';
import { grabAllDataFromDataDivs } from './lib';
import { postFormDataTo } from './util';
import MakeShorterLongerDialog from './ProductContentPreview/MakeShorterLongerDialog';

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

  useEffect(() => {
    const editElement = document.getElementById('edit-link-basic-form');
    editElement.removeChild(editElement.firstChild); // removes the text node "Initializing..."

    const divData = grabAllDataFromDataDivs();
    setAvatarUrl(divData['edit-attributes']['seller']['avatar_url']);
    setPermalink(divData['edit-attributes']['unique_permalink']);
    changeProductName(divData['edit-attributes']['name']);
    setPrice(divData['edit-attributes']['buy_price']);
    changeRichTextDescription(JSON.parse(divData['edit-attributes']['description']));
    changeRichTextContent(JSON.parse(divData['edit-attributes']['rich_content_pages'][0]['description']));
    changeHasOpenaiAssistantThreadForDescription(
      divData['edit-attributes']['has_openai_assistant_thread_for_description']
    );

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

    document.body.addEventListener('mousedown', () => {
      // close all open dialogs
      closeAllDialogs();
    });
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

  const saveAndContinueButtonClickHandler = async (e) => {
    e.preventDefault();
    if (!isPriceFieldValid(applicationState.price)) {
      const element = document.getElementById('price');
      if (element instanceof HTMLInputElement) {
        element.focus();
      }
      return;
    }
    const formDataAsObj = [
      ['link[name]', applicationState.productName, 'encode'],
      ['link[price_range]', parseFloat(applicationState.price.trim()), 'encode'],
      ['link[description]', JSON.stringify(applicationState.richTextDescription), 'encode'],
    ];
    const formData = encode(formDataAsObj);
    const r = await postFormDataTo(formData, `/links/${applicationState.permalink}.json`);
    if (r.success) {
      window.location.hash = 'content';
    }
  };

  const isPriceFieldValid = (price) => !isBlank(price) && isNumber(price);

  const isBlank = (str) => str.match(/^\s*$/);

  const isNumber = (str) => str.trim().match(/^[0-9]*(.[0-9]*)?$/);

  /* info on "createPortal": https://react.dev/reference/react-dom/createPortal#rendering-react-components-into-non-react-dom-nodes */
  return (
    <>
      {router &&
        createPortal(
          <Header
            productName={applicationState.productName}
            saveAndContinueButtonClickHandler={saveAndContinueButtonClickHandler}
          />,
          document.getElementById('header-root')
        )}
      {router && createPortal(<ProductContent />, document.getElementById('edit-link-content-form'))}
      {router && createPortal(<ShareLinks />, document.getElementById('share-links-root'))}
      {router && createPortal(<ProfileSettings />, document.getElementById('profile-settings-root'))}
      {router && createPortal(<DiscoverSettings />, document.getElementById('discover-settings-root'))}
      {router && createPortal(<Sections />, document.getElementById('edit-link-basic-form'))}
      {router && createPortal(<Preview />, document.getElementById('product-preview-root'))}
      {router && <RouterProvider router={router} />}
      {router && createPortal(<TurnOnAiAssistantDialog />, document.getElementById('turn-on-ai-assistant-dialog'))}
      {router && createPortal(<MakeShorterLongerDialog />, document.getElementById('make-shorter-longer-dialog'))}
    </>
  );
};

export default ProductContentPreview;
