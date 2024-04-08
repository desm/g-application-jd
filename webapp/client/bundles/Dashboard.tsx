import * as React from 'react';
import type { FunctionComponent } from 'react';

export interface Props {
  first_product_image_url: string;
  has_products: boolean;
}

// Note, you need to declare the `FunctionComponent` type so that it complies
// with `ReactOnRails.register` type.
const Dashboard: FunctionComponent<Props> = (props: Props) => {
  return (
    <>
      <main>
        <header>
          <h1>Welcome to Gumroad.</h1>
        </header>
        <div className="main-app-content" style={{ display: 'grid', gap: 'var(--spacer-7)' }}>
          {!props.has_products && (
            <div className="placeholder">
              <figure>
                <img src={props.first_product_image_url} />
              </figure>
              <h2>We're here to help you get paid for your work.</h2>
              <div>
                <a className="accent button" href="/products/new">
                  Create your first product
                </a>
              </div>
            </div>
          )}
          <div style={{ display: 'grid', gap: 'var(--spacer-4)' }}>
            <h2>Getting started</h2>
            <div className="stack two-columns">
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span className="icon icon-circle"></span>
                  <a href="#/settings/profile" className="not-implemented">
                    Customize your profile
                  </a>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  {!props.has_products ? (
                    <>
                      <span className="icon icon-circle"></span>
                      <a href="/products/new">Create your first product</a>
                    </>
                  ) : (
                    <>
                      <span
                        className="icon icon-check-circle-fill"
                        style={{ backgroundColor: 'rgb(var(--success))' }}
                      ></span>
                      <s>Create your first product</s>
                    </>
                  )}
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span className="icon icon-circle"></span>
                  <a href="#/followers" className="not-implemented">
                    Get your first follower
                  </a>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span className="icon icon-circle"></span>
                  <a href="#/dashboard/sales" className="not-implemented">
                    Make your first sale
                  </a>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span className="icon icon-circle"></span>
                  <a href="#/settings/payments" className="not-implemented">
                    Get your first pay out
                  </a>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span className="icon icon-circle"></span>
                  <a href="#/posts" className="not-implemented">
                    Send out your first email blast
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacer-4)' }}>
            {props.has_products && (
              <>
                <h2>Best selling</h2>
                <div className="placeholder">
                  <p>
                    You haven't made any sales yet. Learn how to{' '}
                    <a
                      href="#https://help.gumroad.jacquesdesmarais.dev/article/170-audience"
                      target=""
                      rel="noopener noreferrer"
                      className="not-implemented"
                    >
                      build a following
                    </a>{' '}
                    and
                    <a
                      href="#https://help.gumroad.jacquesdesmarais.dev/article/79-gumroad-discover"
                      target=""
                      rel="noopener noreferrer"
                      className="not-implemented"
                    >
                      {' '}
                      sell on Gumroad Discover
                    </a>
                  </p>
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacer-4)' }}>
            <h2>Activity</h2>
            <div className="placeholder">
              <p>
                Followers and sales will show up here as they come in.
                <span>
                  For now, <a href="/products">create a product</a> or{' '}
                  <a href="#/settings/profile" className="not-implemented">customize your profile</a>
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
