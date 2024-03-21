import { createLink } from '../client/bundles/lib';

test('calling createLink', async () => {
  const response = await createLink();
  expect(response).toEqual({ success: true, redirect_to: '/products/tsxsi/edit' });
});
