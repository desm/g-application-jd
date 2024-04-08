import { Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';
import { postCreateThreadForProduct } from '../../lib/clientRequests/aiAssistant';

interface State {
  seller: {
    name: string;
    email_address: string;
    subdomain: string;
    avatar_url: string;
  };
  permalink: string;
  productName: string;
  price: string;
  richTextDescription: any; // basic tab, rich text as javascript object
  richTextContent: any; // content tab
  avatarUrl: string;
  activeTab: 'ACTIVE_TAB_PRODUCT' | 'ACTIVE_TAB_CONTENT' | 'ACTIVE_TAB_SHARE';
  published: boolean;
  hasOpenaiAssistantThreadForDescription: boolean;
  flags: {
    isCreateOpenaiAssistantThreadForProductDescriptionPending: boolean;
    isEnoughWordsSelectedInDescriptionForAiAssistant: boolean;
    isRequestReworkOfSelectedTextPending: boolean;
  };
  dialogs: {
    turnOnAiAssistantDialog: 'closed' | 'open';
    makeShorterLongerDialog: 'closed' | 'open';
  };
  props: {
    makeShorterLongerDialog: {
      mode: 'shorter' | 'longer';
      text: string;
    };
  };
  reworkedText: string;
}

const initialState = {
  seller: {},
  flags: {},
  dialogs: {},
  props: {
    makeShorterLongerDialog: {},
  },
} as State;

let state: State;
let dispatch: Dispatch<any>;

// for testing
(window as any)['getRichTextDescriptionDoc'] = () => state.richTextDescription;
(window as any)['getRichTextContentDoc'] = () => state.richTextContent;

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
    case 'DIALOG_OPENED': {
      draft.dialogs[action.dialogName] = 'open';
      break;
    }
    case 'DIALOG_CLOSED': {
      draft.dialogs[action.dialogName] = 'closed';
      break;
    }
    case 'ALL_DIALOGS_CLOSED': {
      Object.keys(draft.dialogs).forEach((dialogName) => {
        draft.dialogs[dialogName] = 'closed';
      });
      break;
    }
    case 'DIALOG_PROPS_FOR_MAKE_SHORTER_LONGER_DIALOG_CHANGED': {
      draft.props.makeShorterLongerDialog.mode = action.mode;
      draft.props.makeShorterLongerDialog.text = action.text;
      break;
    }
    case 'REWORKED_TEXT_CHANGED': {
      draft.reworkedText = action.reworkedText;
      break;
    }
    case 'SELLER_SET': {
      draft.seller = action.seller;
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

const BLANK_RICH_TEXT_DOC = {
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

export const changeRichTextDescription = (richText: any) => {
  dispatch({
    type: 'RICH_TEXT_DOCUMENT_CHANGED',
    richText: richText === null ? BLANK_RICH_TEXT_DOC : richText,
  });
};

export const changeRichTextContent = (richText: any) => {
  dispatch({
    type: 'RICH_TEXT_CONTENT_CHANGED',
    richText: richText === null ? BLANK_RICH_TEXT_DOC : richText,
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

export const setEnoughWordsSelectedInDescriptionForAiAssistant = (value: boolean) => {
  dispatch({
    type: value ? 'TURN_ON_FLAG' : 'TURN_OFF_FLAG',
    flag: 'isEnoughWordsSelectedInDescriptionForAiAssistant',
  });
};

export const openDialog = (dialogName: keyof State['dialogs']) => {
  dispatch({
    type: 'DIALOG_OPENED',
    dialogName,
  });
};

export const closeDialog = (dialogName: keyof State['dialogs']) => {
  dispatch({
    type: 'DIALOG_CLOSED',
    dialogName,
  });
};

export const closeAllDialogs = () => {
  dispatch({
    type: 'ALL_DIALOGS_CLOSED',
  });
};

export const initMakeShorterLongerDialog = (mode: 'shorter' | 'longer', text: string) => {
  dispatch({
    type: 'DIALOG_PROPS_FOR_MAKE_SHORTER_LONGER_DIALOG_CHANGED',
    mode,
    text,
  });
};

export const setRequestReworkOfSelectedTextPending = (value: boolean) => {
  dispatch({
    type: value ? 'TURN_ON_FLAG' : 'TURN_OFF_FLAG',
    flag: 'isRequestReworkOfSelectedTextPending',
  });
};

export const setReworkedText = (reworkedText: string) => {
  dispatch({
    type: 'REWORKED_TEXT_CHANGED',
    reworkedText,
  });
};

export const setSeller = (seller: Pick<State, 'seller'>) => {
  dispatch({
    type: 'SELLER_SET',
    seller,
  });
};
