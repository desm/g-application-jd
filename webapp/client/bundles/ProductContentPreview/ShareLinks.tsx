import * as React from 'react';

function ShareLinks() {
  return (
    <>
      <header>
        <h2>Share</h2>
      </header>
      <div
        className="list-of-actions top-level-input"
        style={{
          display: 'grid',
          gap: 'var(--spacer-3)',
          gridTemplateColumns: 'repeat(auto-fit, minmax(max-content, var(--dynamic-grid))',
        }}
      >
        <a
          className="button-social-twitter button-w-i button-twitter button not-implemented"
          // href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fjdesma.gumroad.jacquesdesmarais.dev%2Fl%2Fdcfqu&amp;text=Buy%20product%20name%20on%20%40Gumroad"
          // target="_blank"
          href="#share"
          rel="noopener noreferrer"
        >
          Share on X
        </a>
        <a
          className="button-social-facebook button-w-i button-facebook button not-implemented"
          // href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fjdesma.gumroad.jacquesdesmarais.dev%2Fl%2Fdcfqu&amp;quote=product%20name"
          // target="_blank"
          href="#share"
          rel="noopener noreferrer"
        >
          Share on Facebook
        </a>
        <span className="has-tooltip top">
          <span aria-describedby=":r15:" style={{ display: 'contents' }}>
            <span style={{ display: 'contents' }}>
              <button
                className="primary button-copy button-w-i not-implemented"
                type="button"
                style={{ width: '100%' }}
              >
                <span className="icon icon-link"></span>Copy URL
              </button>
            </span>
          </span>
          {/* <span role="tooltip" id=":r15:">
            Copy to Clipboard
          </span> */}
        </span>
      </div>
    </>
  );
}

export default ShareLinks;
