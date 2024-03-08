import * as React from 'react';
import type { FunctionComponent } from 'react';

export interface Props {}

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
          <div style={{ display: 'grid', gap: 'var(--spacer-4)' }}>
            <h2>Getting started</h2>
            <div className="stack two-columns">
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span className="icon icon-circle"></span>
                  <a href="/settings/profile">Customize your profile</a>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span
                    className="icon icon-check-circle-fill"
                    style={{ backgroundColor: 'rgb(var(--success))' }}
                  ></span>
                  <s>Create your first product</s>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span className="icon icon-circle"></span>
                  <a href="/followers">Get your first follower</a>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span className="icon icon-circle"></span>
                  <a href="/dashboard/sales">Make your first sale</a>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span className="icon icon-circle"></span>
                  <a href="/settings/payments">Get your first pay out</a>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', gap: 'var(--spacer-3)' }}>
                  <span className="icon icon-circle"></span>
                  <a href="/posts">Send out your first email blast</a>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacer-4)' }}>
            <h2>Best selling</h2>
            <div className="placeholder">
              <p>
                You haven't made any sales yet. Learn how to
                <a href="#https://help.gumroad.jacquesdesmarais.dev/article/170-audience" target="_blank" rel="noopener noreferrer">
                  build a following
                </a>
                and
                <a
                  href="#https://help.gumroad.jacquesdesmarais.dev/article/79-gumroad-discover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  sell on Gumroad Discover
                </a>
              </p>
            </div>
          </div>
          <div style={{ display: 'grid', gap: 'var(--spacer-4)' }}>
            <h2>Activity</h2>
            <div className="placeholder">
              <p>
                Followers and sales will show up here as they come in.
                <span>
                  For now, <a href="/products">create a product</a> or
                  <a href="/settings/profile">customize your profile</a>
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
