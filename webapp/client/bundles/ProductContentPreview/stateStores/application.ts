import { useImmerReducer } from 'use-immer';

interface State {
  productName: string;
  richTextDescription: any; // rich text as javascript object
  avatarUrl: string;
  activeTab: 'ACTIVE_TAB_PRODUCT' | 'ACTIVE_TAB_CONTENT' | 'ACTIVE_TAB_SHARE';
  published: boolean;
}

let initialState = {} as State;
export let state = {} as State;
let dispatch = null;

function reducer(draft: State, action: { type: string; [key: string]: any }) {
  switch (action.type) {
    case 'PRODUCT_NAME_CHANGED': {
      draft.productName = action.productName;
      break;
    }
    case 'RICH_TEXT_DOCUMENT_CHANGED': {
      draft.richTextDescription = action.richTextDescription;
      console.log('rich text doc is now:', JSON.stringify(draft.richTextDescription, null, 4));
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

export const initApplicationStore = (props: any) => {
  initialState.productName = props.productName;
  
  [state, dispatch] = useImmerReducer(reducer, initialState);
};

export const changeProductName = (productName: string) => {
  dispatch({
    type: 'PRODUCT_NAME_CHANGED',
    productName,
  });
  document.title = productName;
};

export const changeRichTextDescription = (richTextDescription: any) => {
  dispatch({
    type: 'RICH_TEXT_DOCUMENT_CHANGED',
    richTextDescription,
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
