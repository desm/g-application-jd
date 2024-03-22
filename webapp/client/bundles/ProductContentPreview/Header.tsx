import * as React from 'react';

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
          <a role="tab" href="#" aria-selected="true">
            Product
          </a>
          <a role="tab" href="#content" aria-selected="false">
            Content
          </a>
          <a role="tab" href="#share" aria-selected="false">
            Share
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
