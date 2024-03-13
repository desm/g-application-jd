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
