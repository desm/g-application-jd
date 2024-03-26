import * as React from 'react';
import { state } from './stateStores/application';

function ProductContent() {
  return (
    <>
      <main className="product-content" style={{ height: '100%' }}>
        <div role="toolbar" className="rich-text-editor-toolbar">
          <span role="button" aria-pressed="false" aria-label="Bold">
            <span className="icon icon-bold"></span>
          </span>
          <span role="button" aria-pressed="false" aria-label="Italic">
            <span className="icon icon-italic"></span>
          </span>
          <span role="button" aria-pressed="false" aria-label="Underline">
            <span className="icon icon-underline"></span>
          </span>
          <span role="button" aria-pressed="false" aria-label="Strikethrough">
            <span className="icon icon-strikethrough"></span>
          </span>
          <details className="popover toggle">
            <summary>
              <span role="button" aria-pressed="false" aria-label="Headings" aria-haspopup="true" aria-expanded="false">
                <span className="icon icon-headings"></span>
              </span>
            </summary>
            <div
              className="dropdown"
              style={{
                transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                maxWidth: 'calc(0px - 2 * var(--spacer-4))',
              }}
            >
              <ul role="menu" style={{ padding: '0px', overflowX: 'hidden' }}>
                <li role="menuitemradio" aria-checked="false">
                  <span className="icon icon-h1"></span>
                  <span>Large heading</span>
                </li>
                <li role="menuitemradio" aria-checked="false">
                  <span className="icon icon-h2"></span>
                  <span>Medium heading</span>
                </li>
                <li role="menuitemradio" aria-checked="false">
                  <span className="icon icon-h3"></span>
                  <span>Small heading</span>
                </li>
              </ul>
            </div>
          </details>
          <span role="button" aria-pressed="false" aria-label="Toggle code block">
            <span className="icon icon-code"></span>
          </span>
          <span role="button" aria-pressed="false" aria-label="Bulleted list">
            <span className="icon icon-unordered-list"></span>
          </span>
          <span role="button" aria-pressed="false" aria-label="Numbered list">
            <span className="icon icon-ordered-list"></span>
          </span>
          <span role="button" aria-label="Horizontal line">
            <span className="icon icon-horizontal-rule"></span>
          </span>
          <span role="button" aria-pressed="false" aria-label="Quote">
            <span className="icon icon-quote"></span>
          </span>
          <details className="popover toggle">
            <summary>
              <span
                role="button"
                aria-pressed="false"
                aria-label="Insert link"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="icon icon-link"></span>
              </span>
            </summary>
            <div
              className="dropdown"
              style={{
                transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                maxWidth: 'calc(0px - 2 * var(--spacer-4))',
              }}
            >
              <fieldset className="tiptap__link-popover">
                <input className="top-level-input" type="text" placeholder="Enter text" defaultValue="" tabIndex={-1} />
                <input className="top-level-input" type="text" placeholder="Enter URL" defaultValue="" tabIndex={-1} />
                <button className="primary" type="button">
                  Add link
                </button>
              </fieldset>
            </div>
          </details>
          <div role="separator" aria-orientation="vertical"></div>
          <label>
            <span role="button" aria-pressed="false" aria-label="Insert image">
              <span className="icon icon-image"></span>
            </span>
            <input multiple={false} type="file" accept=".jpeg,.jpg,.png,.gif,.webp" tabIndex={-1} />
          </label>
          <details className="popover toggle">
            <summary>
              <span role="button" aria-label="Insert button" aria-haspopup="true" aria-expanded="false">
                <span className="icon icon-button"></span>
              </span>
            </summary>
            <div
              className="dropdown"
              style={{
                transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                maxWidth: 'calc(0px - 2 * var(--spacer-4))',
              }}
            >
              <fieldset className="tiptap__link-popover">
                <input className="top-level-input" type="text" placeholder="Enter text" defaultValue="" tabIndex={-1} />
                <input className="top-level-input" type="text" placeholder="Enter URL" defaultValue="" tabIndex={-1} />
                <button className="primary" type="button">
                  Add button
                </button>
              </fieldset>
            </div>
          </details>
          <details className="popover toggle">
            <summary>
              <span
                role="button"
                aria-pressed="false"
                aria-label="Insert file"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span className="icon icon-upload"></span>
              </span>
            </summary>
            <div
              className="dropdown"
              style={{
                transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                maxWidth: 'calc(0px - 2 * var(--spacer-4))',
              }}
            >
              <div aria-label="Product file uploader">
                <input type="file" name="file" multiple={false} tabIndex={-1} />
                <div className="tab-buttons small" role="tablist">
                  <button className="" role="tab" type="button">
                    <span className="icon icon-upload-fill"></span>Computer files
                  </button>
                  <button
                    className="disabled"
                    role="tab"
                    type="button"
                    aria-selected="false"
                    aria-controls=":r1e:"
                    aria-disabled="true"
                  >
                    <span className="icon icon-files-earmark"></span>Existing product
                  </button>
                  <button className="" role="tab" type="button">
                    <span className="icon icon-dropbox"></span>Dropbox import
                  </button>
                  <button className="" role="tab" type="button" aria-selected="false" aria-controls=":r1d:">
                    <span className="icon icon-embed"></span>Embed video
                  </button>
                </div>
              </div>
            </div>
          </details>
          <details className="popover toggle">
            <summary>
              <span role="button" aria-label="More options" aria-haspopup="true" aria-expanded="false">
                <span className="icon icon-outline-dots-circle-horizontal"></span>
              </span>
            </summary>
            <div
              className="dropdown"
              style={{
                transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                maxWidth: 'calc(0px - 2 * var(--spacer-4))',
              }}
            >
              <div role="menu">
                <div role="menuitem">
                  <span className="icon icon-file-earmark-medical"></span>
                  <span>List of posts</span>
                </div>
                <div role="menuitem">
                  <span className="icon icon-outline-key"></span>
                  <span>License key</span>
                </div>
                <details className="popover toggle" style={{ display: 'block' }}>
                  <summary>
                    <div role="menuitem">
                      <span className="icon icon-twitter"></span>
                      <span>Insert tweet</span>
                    </div>
                  </summary>
                  <div
                    className="dropdown"
                    style={{
                      transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                      maxWidth: 'calc(0px - 2 * var(--spacer-4))',
                    }}
                  >
                    <fieldset>
                      <legend>
                        <label htmlFor=":r1g:">Tweet URL</label>
                      </legend>
                      <input
                        id=":r1g:"
                        className="top-level-input"
                        type="text"
                        placeholder="https://x.com/gumroad/status/1663556902624845824"
                        tabIndex={-1}
                      />
                      <button className="primary" type="button">
                        Insert
                      </button>
                    </fieldset>
                  </div>
                </details>
              </div>
            </div>
          </details>
          <div role="separator" aria-orientation="vertical"></div>
          <span role="button" aria-label="Create page">
            <span className="icon icon-file-earmark-plus"></span>
          </span>
          <div style={{ display: 'flex', marginLeft: 'auto' }}>
            <div className="combobox version-dropdown" style={{ width: '300px' }}>
              <div
                role="combobox"
                aria-expanded="false"
                aria-controls=":r1h:"
                tabIndex={0}
                className="input"
                aria-label="Select a version"
              >
                <span className="fake-input text-singleline">Editing: one</span>
                <span className="icon icon-outline-cheveron-down"></span>
              </div>
              <div hidden={true}>
                <datalist id=":r1h:" aria-multiselectable="true">
                  <div role="option" id=":r1h:-0" className="" aria-selected="true" aria-disabled="false">
                    <div>
                      <h4>one</h4>
                      <small>Editing</small>
                    </div>
                  </div>
                  <div role="option" id=":r1h:-1" className="" aria-selected="false" aria-disabled="false">
                    <div>
                      <h4>Untitled</h4>
                      <small className="text-muted">No content yet</small>
                    </div>
                  </div>
                  <div className="option">
                    <label>
                      <input type="checkbox" tabIndex={-1} />
                      <small>Use the same content for all versions</small>
                    </label>
                  </div>
                </datalist>
              </div>
            </div>
            <span role="button" aria-pressed="false" aria-disabled="true" aria-label="Undo last change">
              <span className="icon icon-undo"></span>
            </span>
            <span role="button" aria-pressed="false" aria-disabled="true" aria-label="Redo last undone change">
              <span className="icon icon-redo"></span>
            </span>
          </div>
        </div>
        <div className="has-sidebar">
          <div className="paragraphs">
            <div className="stack">
              <div>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 'var(--spacer-2)' }}
                >
                  <label htmlFor=":r13:">Liked it? Give it a rating:</label>
                  <div className="rating" role="radiogroup" aria-label="Your rating:">
                    <span
                      className="icon icon-outline-star"
                      aria-label="1 star"
                      aria-checked="false"
                      role="radio"
                      aria-disabled="true"
                    ></span>
                    <span
                      className="icon icon-outline-star"
                      aria-label="2 stars"
                      aria-checked="false"
                      role="radio"
                      aria-disabled="true"
                    ></span>
                    <span
                      className="icon icon-outline-star"
                      aria-label="3 stars"
                      aria-checked="false"
                      role="radio"
                      aria-disabled="true"
                    ></span>
                    <span
                      className="icon icon-outline-star"
                      aria-label="4 stars"
                      aria-checked="false"
                      role="radio"
                      aria-disabled="true"
                    ></span>
                    <span
                      className="icon icon-outline-star"
                      aria-label="5 stars"
                      aria-checked="false"
                      role="radio"
                      aria-disabled="true"
                    ></span>
                  </div>
                </div>
                <textarea
                  id=":r13:"
                  placeholder="Want to leave a written review?"
                  disabled={false}
                  tabIndex={-1}
                ></textarea>
                <button className="primary" disabled={false} type="button" style={{ width: '100%' }}>
                  Post review
                </button>
              </div>
            </div>
            <div className="stack">
              <details>
                <summary aria-disabled="true">Receipt</summary>
              </details>
              <details>
                <summary aria-disabled="true">Library</summary>
              </details>
            </div>
            <div className="stack">
              <div>dfgasdf - one</div>
              <div>
                <span style={{ display: 'flex', gap: 'var(--spacer-2)' }}>
                  <img className="user-avatar" src={state.avatarUrl} />
                  <span>
                    By
                    <a
                      href="https://jdesma.gumroad.jacquesdesmarais.dev/"
                      target="_blank"
                      rel="noreferrer"
                      style={{ position: 'relative' }}
                    >
                      Jacques
                    </a>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="rich-text" data-gumroad-ignore="true">
            <div className="tiptap ProseMirror" aria-label="Content editor" id=":r14:" tabIndex={0} translate="no">
              <p
                data-placeholder="Enter the content you want to sell. Upload your files or start typing."
                className="is-empty is-editor-empty"
              >
                <br className="ProseMirror-trailingBreak" />
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ProductContent;
