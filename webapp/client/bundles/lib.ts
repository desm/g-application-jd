import { sendJsonToServer } from './util';

/**
 * searches document for all <div data-...="{...}" id="..." /> elements, parses the data,
 * and returns as a map { "some-id": objA, "other-id", objB, ... }
 */
export const grabAllDataFromDataDivs = () => {
  const data = {};
  document.querySelectorAll('div').forEach((el) => {
    const dataAttr = el.attributes[0];
    if (dataAttr && dataAttr.name.startsWith('data-')) {
      data[el.getAttribute('id')] = JSON.parse(el.getAttribute(dataAttr.name));
    }
  });
  return data;
};

let messageTimer;

export const showMessage = (msg: string) => {
  if (messageTimer) {
    clearTimeout(messageTimer);
  }
  const a = document.querySelector('.js-message') as HTMLElement;
  a.textContent = msg;
  a.classList.add('message--warning', 'warning');
  const b = document.querySelector('.js-flash-message') as HTMLElement;
  b.style.transform = 'translateY(0px)';
  b.style.visibility = 'visible';
  messageTimer = setTimeout(() => {
    hideMessage();
  }, 5000);
};

export const hideMessage = () => {
  const b = document.querySelector('.js-flash-message') as HTMLElement;
  b.style.transform = 'translateY(-100%)';
};

export const postCreateThreadForProduct = async (
  permalink: string,
  section: 'description' | 'content'
): Promise<{ success: boolean }> => sendJsonToServer('POST', JSON.stringify({ section }), `/products/${permalink}/threads`);

export const requestReworkOfSelectedText = async (
  permalink: string,
  section: 'description' | 'content',
  product_name: string,
  full_description: string,
  selected_text: string,
  ask: 'ask to make selection a little bit shorter' | 'ask to make selection a little bit longer'
): Promise<{ success: boolean, reworked_text?: string }> => {
  const payload = {
    product_name,
    full_description,
    selected_text,
    ask,
  };
  return sendJsonToServer('PATCH', JSON.stringify(payload), `/products/${permalink}/threads/${section}`);
};
