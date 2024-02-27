import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Nav from '../app/javascript/bundles/Dashboard/components/Nav';

describe('Nav', () => {
  it('should expand process.env.HOME_TEXT"', async () => {
    render(<Nav />);
    await screen.findAllByRole('heading');
    const homeHeading = screen.getByText(process.env.HOME_TEXT, { exact: false });
    expect(homeHeading).toBeInstanceOf(HTMLHeadingElement);
    expect(homeHeading).toBeVisible();
    expect(homeHeading.textContent).toEqual(process.env.HOME_TEXT);
  });
});
