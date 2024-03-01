import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Dashboard from '../app/javascript/bundles/Dashboard/components/Dashboard';

describe('Dashboard', () => {
  it('should contain a "create product" link', async () => {
    render(<Dashboard />);
    await screen.findAllByRole('heading');
    const createProductLink = screen.getByText('create a product');
    expect(createProductLink).toBeInstanceOf(HTMLAnchorElement);
    expect(createProductLink).toBeVisible();
    expect(createProductLink).toBeEnabled(); // not sure if this works, b/c i'm not sure how to disable a link yet
  });
});
