import { sendJsonToServer } from './base';

export const postCreateThreadForProduct = async (
  permalink: string,
  section: 'description' | 'content'
): Promise<{ success: boolean }> =>
  sendJsonToServer('POST', JSON.stringify({ section }), `/products/${permalink}/threads`);

export const requestReworkOfSelectedText = async (
  permalink: string,
  section: 'description' | 'content',
  product_name: string,
  full_description: string,
  selected_text: string,
  ask: 'ask to make selection a little bit shorter' | 'ask to make selection a little bit longer'
): Promise<{ success: boolean; reworked_text?: string }> => {
  const payload = {
    product_name,
    full_description,
    selected_text,
    ask,
  };
  return sendJsonToServer('PATCH', JSON.stringify(payload), `/products/${permalink}/threads/${section}`);
};
