import * as React from 'react';
import { applicationState } from './stateStores/application';
import { showMessage } from '../lib';

function Header({ productName, dosomething }) {
  const preventSwitchingToShareTabIfNotPublished = (e) => {
    if (!applicationState.published) {
      e.preventDefault();
      showMessage(
        "Not yet! You've got to publish your awesome product before you can share it with your audience and the world."
      );
    }
  };

  return (
    <>
      <h1>{productName || 'Untitled'}</h1>
      {applicationState.activeTab === 'ACTIVE_TAB_PRODUCT' && !applicationState.published && (
        <div className="actions">
          <button className="primary" type="submit" onClick={dosomething}>
            Save and continue
          </button>
        </div>
      )}
      {applicationState.activeTab === 'ACTIVE_TAB_CONTENT' && !applicationState.published && (
        <div className="actions">
          <button className="primary" type="submit">
            Save changes
          </button>
          <button className="accent" type="submit">
            Publish and continue
          </button>
        </div>
      )}
      {applicationState.published && (
        <div className="actions">
          <button>Unpublish</button>
          <button className="primary" type="submit">
            Save changes
          </button>
          <span className="has-tooltip bottom">
            <span aria-describedby=":r6:" style={{ display: 'contents' }}>
              <span style={{ display: 'contents' }}>
                <button>
                  <span className="icon icon-link"></span>
                </button>
              </span>
            </span>
            <span role="tooltip" id=":r6:">
              Copy to Clipboard
            </span>
          </span>
        </div>
      )}
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
          <a role="tab" href="#" aria-selected={applicationState.activeTab === 'ACTIVE_TAB_PRODUCT'}>
            Product
          </a>
          <a role="tab" href="#content" aria-selected={applicationState.activeTab === 'ACTIVE_TAB_CONTENT'}>
            Content
          </a>
          <a
            role="tab"
            href="#share"
            aria-selected={applicationState.activeTab === 'ACTIVE_TAB_SHARE'}
            onClick={preventSwitchingToShareTabIfNotPublished}
          >
            Share
          </a>
        </div>
      </div>
    </>
  );
}

export default Header;
