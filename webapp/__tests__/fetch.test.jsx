/**
 * example test copied from https://testing-library.com/docs/react-testing-library/example-intro
 *
 * it is not part of the tests that are run, due to the "testMatch" property in jest.config.ts
 */

import '@testing-library/jest-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.post('http://localhost/links', (req, res, ctx) => {
    return res(ctx.json({ success: true, redirect_to: '/products/tsxsi/edit' }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('calling createLink', async () => {
  const response = await createLink();
  expect(response).toEqual({ success: true, redirect_to: '/products/tsxsi/edit' });
});

async function createLink() {
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
}
