import * as React from 'react';
import type { FunctionComponent } from 'react';

// Note, you need to declare the `FunctionComponent` type so that it complies
// with `ReactOnRails.register` type.
const Nav: FunctionComponent = () => {
  return (
    <>
      <nav aria-label="Main" class>
        <div class="navbar">
          <a href="/">
            <span class="logo-g"> </span>
          </a>
          <h1>Home</h1>
          <span class="toggle" role="button"></span>
        </div>
        <header>
          <a href="/" aria-label="Dashboard">
            <span class="logo-full"> </span>
          </a>
        </header>
        <section>
          <a aria-current="page" href="/dashboard" title="Home">
            <span class="icon icon-shop-window-fill"></span>Home
          </a>
          <a href="/products" title="Products">
            <span class="icon icon-archive-fill"></span>Products
          </a>
          <a href="/checkout/discounts" title="Checkout">
            <span class="icon icon-cart3-fill"></span>Checkout
          </a>
          <a href="/posts" title="Emails">
            <span class="icon icon-envelope-fill"></span>Emails
          </a>
          <a href="/workflows" title="Workflows">
            <span class="icon icon-diagram-2-fill"></span>Workflows
          </a>
          <a href="/customers" title="Sales">
            <span class="icon icon-solid-currency-dollar"></span>Sales
          </a>
          <a href="/dashboard/sales" title="Analytics">
            <span class="icon icon-bar-chart-fill"></span>Analytics
          </a>
        </section>
        <section>
          <a href="/balance" title="Payouts">
            <span class="icon icon-solid-currency-dollar"></span>Payouts
          </a>
          <a href="#https://discover.gumroad.com" title="Discover">
            <span class="icon icon-solid-search"></span>Discover
          </a>
          <a href="/library" title="Library">
            <span class="icon icon-bookmark-heart-fill"></span>Library
          </a>
        </section>
        <footer>
          <a href="#https://help.gumroad.com" title="Help">
            <span class="icon icon-book-half"></span>Help
          </a>
          <a href="/settings" title="Settings">
            <span class="icon icon-gear-fill"></span>Settings
          </a>
          <details class="popover toggle top">
            <summary>
              <span aria-haspopup="true" aria-expanded="false">
                <img
                  class="user-avatar"
                  src="/assets/gumroad-default-avatar-5-623b6723477dd15920db554b0a4e9aac6a5e41159fd3d7bb4c9f9745a44e4f85.png"
                  alt="Your avatar"
                />
                jdesma@gmail.com
              </span>
            </summary>
            <div
              class="dropdown"
              style={{transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))', maxWidth: 'calc(0px - 2 * var(--spacer-4))'}}
            >
              <div role="menu">
                <a role="menuitem" href="#https://9078562000866.gumroad.com/">
                  <span class="icon icon-shop-window-fill"></span>Profile
                </a>
                <a role="menuitem" href="/affiliates">
                  <span class="icon icon-gift-fill"></span>Affiliates
                </a>
                <a role="menuitem" href="/logout">
                  <span class="icon icon-box-arrow-in-right-fill"></span>Logout
                </a>
              </div>
            </div>
          </details>
        </footer>
      </nav>
    </>
  );
};

export default Nav;
