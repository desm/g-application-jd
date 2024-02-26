import { createLink } from '../app/javascript/bundles/lib.ts';

test('foo', async () => {
  const r = await createLink();
  expect(r).not.toBeNull;
  expect(r).toEqual({ success: true, redirect_to: '/products/tsxsi/edit' });
});
