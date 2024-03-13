import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useState, useEffect, useRef } from 'react';

export interface Props {
  avatar_img: string;
}

// Note, you need to declare the `FunctionComponent` type so that it complies
// with `ReactOnRails.register` type.
const Nav: FunctionComponent<Props> = (props: Props) => {
  const nav = useRef();

  const [translateXValue, setTranslateXValue] = useState(0);

  useEffect(() => {
    setTranslateXValue((nav.current as any).clientWidth);
  }, []);

  return (
    <>
      <nav aria-label="Main" ref={nav}>
        <div className="navbar">
          <a href="/">
            <span className="logo-g"> </span>
          </a>
          <h1>Home</h1>
          <span className="toggle" role="button"></span>
        </div>
        <header>
          <a href="/" aria-label="Dashboard">
            <span className="logo-full"> </span>
          </a>
        </header>
        <section>
          <a aria-current="page" href="/dashboard" title="Home">
            <span className="icon icon-shop-window-fill"></span>Home
          </a>
          <a href="/products" title="Products">
            <span className="icon icon-archive-fill"></span>Products
          </a>
          <a href="/checkout/discounts" title="Checkout">
            <span className="icon icon-cart3-fill"></span>Checkout
          </a>
          <a href="/posts" title="Emails">
            <span className="icon icon-envelope-fill"></span>Emails
          </a>
          <a href="/workflows" title="Workflows">
            <span className="icon icon-diagram-2-fill"></span>Workflows
          </a>
          <a href="/customers" title="Sales">
            <span className="icon icon-solid-currency-dollar"></span>Sales
          </a>
          <a href="/dashboard/sales" title="Analytics">
            <span className="icon icon-bar-chart-fill"></span>Analytics
          </a>
        </section>
        <section>
          <a href="/balance" title="Payouts">
            <span className="icon icon-solid-currency-dollar"></span>Payouts
          </a>
          <a href="#https://discover.gumroad.jacquesdesmarais.dev" title="Discover">
            <span className="icon icon-solid-search"></span>Discover
          </a>
          <a href="/library" title="Library">
            <span className="icon icon-bookmark-heart-fill"></span>Library
          </a>
        </section>
        <footer>
          <a href="#https://help.gumroad.jacquesdesmarais.dev" title="Help">
            <span className="icon icon-book-half"></span>Help
          </a>
          <a href="/settings" title="Settings">
            <span className="icon icon-gear-fill"></span>Settings
          </a>
          <details className="popover toggle top">
            <summary>
              <span aria-haspopup="true" aria-expanded="false">
                <img
                  className="user-avatar"
                  src={ props.avatar_img }
                  alt="Your avatar"
                />
                jdesma@gmail.com
              </span>
            </summary>
            <div
              className="dropdown"
              style={{
                transform: `translateX(min(${translateXValue}px - 100% - var(--spacer-4), 0px))`,
                maxWidth: `calc(${translateXValue}px - 2 * var(--spacer-4))`,
              }}
            >
              <div role="menu">
                <a role="menuitem" href="#https://9078562000866.gumroad.jacquesdesmarais.dev/">
                  <span className="icon icon-shop-window-fill"></span>Profile
                </a>
                <a role="menuitem" href="/affiliates">
                  <span className="icon icon-gift-fill"></span>Affiliates
                </a>
                <a role="menuitem" href="/logout">
                  <span className="icon icon-box-arrow-in-right-fill"></span>Logout
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
