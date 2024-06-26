import * as React from 'react';
import type { FunctionComponent } from 'react';
import { useState, useEffect, useRef } from 'react';

export interface Props {
  avatar_url: string;
  highlight: string;
  name: string;
}

// Note, you need to declare the `FunctionComponent` type so that it complies
// with `ReactOnRails.register` type.
const Nav: FunctionComponent<Props> = (props: Props) => {
  /**
   * concerns the styling of the Profile/Affiliates/Logout popup
   */
  const nav = useRef();

  const [translateXValue, setTranslateXValue] = useState(0);

  useEffect(() => {
    setTranslateXValue((nav.current as any).clientWidth);
  }, []);

  /**
   * concerns highlighting the current page in the Nav
   */
  const refs = {
    Home: useRef<HTMLAnchorElement | null>(null),
    Products: useRef<HTMLAnchorElement | null>(null),
  };

  useEffect(() => {
    if (refs[props.highlight]?.current) {
      refs[props.highlight].current.setAttribute('aria-current', 'page');
    }
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
          <a href="/dashboard" title="Home" ref={refs.Home}>
            <span className="icon icon-shop-window-fill"></span>Home
          </a>
          <a href="/products" title="Products" ref={refs.Products}>
            <span className="icon icon-archive-fill"></span>Products
          </a>
          <a href="#/collaborators" title="Collaborators" className="not-implemented">
            <span className="icon icon-deal-fill"></span>Collaborators
          </a>
          <a href="#/checkout/discounts" title="Checkout" className="not-implemented">
            <span className="icon icon-cart3-fill"></span>Checkout
          </a>
          <a href="#/posts" title="Emails" className="not-implemented">
            <span className="icon icon-envelope-fill"></span>Emails
          </a>
          <a href="#/workflows" title="Workflows" className="not-implemented">
            <span className="icon icon-diagram-2-fill"></span>Workflows
          </a>
          <a href="#/customers" title="Sales" className="not-implemented">
            <span className="icon icon-solid-currency-dollar"></span>Sales
          </a>
          <a href="#/dashboard/sales" title="Analytics" className="not-implemented">
            <span className="icon icon-bar-chart-fill"></span>Analytics
          </a>
          <a href="#/balance" title="Payouts" className="not-implemented">
            <span className="icon icon-solid-currency-dollar"></span>Payouts
          </a>
        </section>
        <section>
          <a href="#https://discover.gumroad.jacquesdesmarais.dev" title="Discover" className="not-implemented">
            <span className="icon icon-solid-search"></span>Discover
          </a>
          <a href="#/library" title="Library" className="not-implemented">
            <span className="icon icon-bookmark-heart-fill"></span>Library
          </a>
        </section>
        <footer>
          <a href="#https://help.gumroad.jacquesdesmarais.dev" title="Help" className="not-implemented">
            <span className="icon icon-book-half"></span>Help
          </a>
          <a href="#/settings" title="Settings" className="not-implemented">
            <span className="icon icon-gear-fill"></span>Settings
          </a>
          <details className="popover toggle top">
            <summary>
              <span aria-haspopup="true" aria-expanded="false">
                <img className="user-avatar" src={props.avatar_url} alt="Your avatar" />
                {props.name}
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
                <a
                  role="menuitem"
                  href="#https://9078562000866.gumroad.jacquesdesmarais.dev/"
                  className="not-implemented"
                >
                  <span className="icon icon-shop-window-fill"></span>Profile
                </a>
                <a role="menuitem" href="#/affiliates" className="not-implemented">
                  <span className="icon icon-gift-fill"></span>Affiliates
                </a>
                <a
                  role="menuitem"
                  href="/logout"
                  onMouseDown={(e) => {
                    // needed because of mouseodwn handler on body that closes all menus
                    e.stopPropagation();
                  }}
                >
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
