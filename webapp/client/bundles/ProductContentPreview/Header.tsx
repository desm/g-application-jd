import * as React from 'react';
import { showMessage } from '../lib/uiMessages';
import { applicationState } from './stateStores/application';

function Header({ productName, saveAndContinueButtonClickHandler, saveButtonClickHandler, publishButtonClickHandler, unpublishButtonClickHandler }) {
  const preventSwitchingToShareTabIfNotPublished = (e) => {
    if (!applicationState.published) {
      e.preventDefault();
      showMessage(
        "Not yet! You've got to publish your awesome product before you can share it with your audience and the world.",
        'warning'
      );
    }
  };

  return (
    <>
      <h1>{productName || 'Untitled'}</h1>
      {applicationState.activeTab === 'ACTIVE_TAB_PRODUCT' && !applicationState.published && (
        <div className="actions">
          <button className="primary" type="submit" onClick={saveAndContinueButtonClickHandler}>
            Save and continue
          </button>
        </div>
      )}
      {applicationState.activeTab === 'ACTIVE_TAB_CONTENT' && !applicationState.published && (
        <div className="actions">
          <button className="primary" type="submit" onClick={saveButtonClickHandler}>
            Save changes
          </button>
          <button className="accent" type="submit" onClick={publishButtonClickHandler}>
            Publish and continue
          </button>
        </div>
      )}
      {applicationState.published && (
        <div className="actions">
          <button onClick={unpublishButtonClickHandler}>Unpublish</button>
          <button className="primary" type="submit" onClick={saveButtonClickHandler}>
            Save changes
          </button>
          <span className="has-tooltip bottom">
            <span aria-describedby=":r6:" style={{ display: 'contents' }}>
              <span style={{ display: 'contents' }}>
                <button className="not-implemented">
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
