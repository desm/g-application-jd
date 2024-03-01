import '@testing-library/jest-dom';
import { render, within } from '@testing-library/react';
import React from 'react';
import Nav from '../app/javascript/bundles/Dashboard/components/Nav';

describe('Nav', () => {
  it('should contain the navbar element "Home"', async () => {
    render(<Nav avatar_img="/xyz" />);
    const firstSection = document.getElementsByTagName('section')[0];
    const homeLink = within(firstSection).getByText('Home')
    expect(homeLink).toBeInstanceOf(HTMLAnchorElement);
  });
});
