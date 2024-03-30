import { Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';
import { postCreateThreadForProduct } from '../../lib';

interface State {
  permalink: string;
  productName: string;
  price: number;
  richTextDescription: any; // basic tab, rich text as javascript object
  richTextContent: any; // content tab
  avatarUrl: string;
  activeTab: 'ACTIVE_TAB_PRODUCT' | 'ACTIVE_TAB_CONTENT' | 'ACTIVE_TAB_SHARE';
  published: boolean;
  hasOpenaiAssistantThreadForDescription: boolean;
  flags: {
    isCreateOpenaiAssistantThreadForProductDescriptionPending: boolean;
  };
}

const initialState = {
  flags: {},
} as State;

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
    case 'HAS_OPENAI_ASSISTANT_THREAD_FOR_DESCRIPTION_CHANGED': {
      draft.hasOpenaiAssistantThreadForDescription = action.value;
      break;
    }
    case 'TURN_ON_FLAG': {
      draft.flags[action.flag] = true;
      break;
    }
    case 'TURN_OFF_FLAG': {
      draft.flags[action.flag] = false;
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
  const BLANK_DOCUMENT = {
    doc: {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    },
    selection: {
      type: 'text',
      anchor: 1,
      head: 1,
    },
  };
  dispatch({
    type: 'RICH_TEXT_DOCUMENT_CHANGED',
    richText: richText === null ? BLANK_DOCUMENT : richText,
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

export const changeHasOpenaiAssistantThreadForDescription = (value: boolean) => {
  dispatch({
    type: 'HAS_OPENAI_ASSISTANT_THREAD_FOR_DESCRIPTION_CHANGED',
    value,
  });
};

export const createOpenaiAssistantThreadForProductDescription = async () => {
  dispatch({
    type: 'TURN_ON_FLAG',
    flag: 'isCreateOpenaiAssistantThreadForProductDescriptionPending',
  });
  const response = await postCreateThreadForProduct(state.permalink, 'description');
  dispatch({
    type: 'TURN_OFF_FLAG',
    flag: 'isCreateOpenaiAssistantThreadForProductDescriptionPending',
  });
  if (response.success) {
    changeHasOpenaiAssistantThreadForDescription(true);
  }
};
