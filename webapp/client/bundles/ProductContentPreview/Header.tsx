import * as React from 'react';
import { state } from './stateStores/application';

function Header({ productName }) {
  return (
    <>
      <h1>{productName || 'Untitled'}</h1>
      <div className="actions">
        <button className="primary" type="submit">
          Save and continue
        </button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 'var(--spacer-4)',
        }}
      >
        <div role="tablist" style={{ marginTop: 'unset', width: 'max-content' }}>
          <a role="tab" href="#" aria-selected={state.activeTab === 'ACTIVE_TAB_PRODUCT'}>
            Product
          </a>
          <a role="tab" href="#content" aria-selected={state.activeTab === 'ACTIVE_TAB_CONTENT'}>
            Content
          </a>
          <a role="tab" href="#share" aria-selected={state.activeTab === 'ACTIVE_TAB_SHARE'}>
            Share
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
