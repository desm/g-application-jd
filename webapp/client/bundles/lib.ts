export const createLink = async () => {
  const response = await fetch('http://localhost/links', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      link: {
        is_physical: false,
        is_recurring_billing: false,
        name: 'Hey',
        native_type: 'digital',
        price_currency_type: 'cad',
        price_range: '299',
        release_at_date: 'March 24, 2024',
        release_at_time: '12PM',
        subscription_duration: null,
      },
    }),
    referrer: 'http://localhost/products/new',
    referrerPolicy: 'strict-origin-when-cross-origin',
    mode: 'cors',
    credentials: 'include',
  });
  return response.json();
};

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
