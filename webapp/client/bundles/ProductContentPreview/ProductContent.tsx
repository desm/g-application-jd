import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { useEffect } from 'react';
import { createMenuPlugin } from './ProductContentRichTextMenu';
import { state } from './stateStores/application';
import {
  changeContentEditorState,
  editorState,
  reconfigureContentEditorState,
  setContentEditorView,
} from './stateStores/textEditor';
import './styles.css';

function ProductContent() {
  useEffect(() => {
    const editorView = new EditorView(document.querySelector('#content-editor'), {
      state: editorState.contentEditorState,
      dispatchTransaction(transaction) {
        changeContentEditorState(transaction);
      },
    });
    setContentEditorView(editorView);
    reconfigureContentEditorState(
      editorView.state.reconfigure({
        plugins: [...editorView.state.plugins, createMenuPlugin()],
      })
    );
  }, []);

  return (
    <>
      <main className="product-content" style={{ height: '100%' }}>
        <div role="toolbar" className="rich-text-editor-toolbar">
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
          <div
            id="content-editor"
            style={{ marginBottom: '23px', paddingTop: 0 }}
            className="rich-text"
            data-gumroad-ignore="true"
          ></div>
        </div>
      </main>
    </>
  );
}

export default ProductContent;
