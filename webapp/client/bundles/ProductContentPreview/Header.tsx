import * as React from 'react';
import { state } from './stateStores/application';

function Header({ productName }) {
  const preventIfNotPublished = (e) => {
    if (!state.published) {
      e.preventDefault();
      const x = document.querySelector('.js-message') as HTMLElement;
      x.textContent =
        "Not yet! You've got to publish your awesome product before you can share it with your audience and the world.";
      x.classList.add('message--warning', 'warning');
      const o = document.querySelector('.js-flash-message') as HTMLElement;
      o.style.transform = 'translateY(0px)';
      o.style.visibility = 'visible';
      // o.style.transform = 'translateY(-100%);'
      // o.style.visibility = 'hidden';
    }
  };

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
          <a
            role="tab"
            href="#share"
            aria-selected={state.activeTab === 'ACTIVE_TAB_SHARE'}
            onClick={preventIfNotPublished}
          >
            Share
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
