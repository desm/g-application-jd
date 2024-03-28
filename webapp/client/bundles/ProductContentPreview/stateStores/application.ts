import { Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';

interface State {
  permalink: string;
  productName: string;
  price: number;
  richTextDescription: any; // basic tab, rich text as javascript object
  richTextContent: any; // content tab
  avatarUrl: string;
  activeTab: 'ACTIVE_TAB_PRODUCT' | 'ACTIVE_TAB_CONTENT' | 'ACTIVE_TAB_SHARE';
  published: boolean;
}

const initialState = {} as State;

let state: State;
let dispatch: Dispatch<any>;

export { state as applicationState };

function reducer(draft: State, action: { type: string; [key: string]: any }) {
  switch (action.type) {
    case 'PERMALINK_SET': {
      draft.permalink = action.permalink;
      break;
    }
    case 'PRODUCT_NAME_CHANGED': {
      draft.productName = action.productName;
      break;
    }
    case 'PRICE_SET': {
      draft.price = action.price;
      break;
    }
    case 'RICH_TEXT_DOCUMENT_CHANGED': {
      draft.richTextDescription = action.richText;
      break;
    }
    case 'RICH_TEXT_CONTENT_CHANGED': {
      draft.richTextContent = action.richText;
      break;
    }
    case 'AVATAR_URL_SET': {
      draft.avatarUrl = action.avatarUrl;
      break;
    }
    case 'ACTIVE_TAB_SET': {
      draft.activeTab = action.activeTab;
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
export const useApplicationState = () => {
  [state, dispatch] = useImmerReducer(reducer, initialState);
};

export const setPermalink = (permalink: string) => {
  dispatch({
    type: 'PERMALINK_SET',
    permalink,
  });
};

export const changeProductName = (productName: string) => {
  dispatch({
    type: 'PRODUCT_NAME_CHANGED',
    productName,
  });
  document.title = productName;
};

export const setPrice = (price: number) => {
  dispatch({ type: 'PRICE_SET', price });
};

export const changeRichTextDescription = (richText: any) => {
  dispatch({
    type: 'RICH_TEXT_DOCUMENT_CHANGED',
    richText,
  });
};

export const changeRichTextContent = (richText: any) => {
  dispatch({
    type: 'RICH_TEXT_CONTENT_CHANGED',
    richText,
  });
};

export const setAvatarUrl = (avatarUrl: string) => {
  dispatch({
    type: 'AVATAR_URL_SET',
    avatarUrl,
  });
};

export const setActiveTab = (activeTab: 'ACTIVE_TAB_PRODUCT' | 'ACTIVE_TAB_CONTENT' | 'ACTIVE_TAB_SHARE') => {
  dispatch({
    type: 'ACTIVE_TAB_SET',
    activeTab,
  });
};
