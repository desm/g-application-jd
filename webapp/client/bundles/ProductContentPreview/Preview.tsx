import { exampleSetup } from 'prosemirror-example-setup';
import { EditorState } from 'prosemirror-state';
import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { useEffect } from 'react';
import { mySchema } from './mySchema';
import { applicationState } from './stateStores/application';
import { setEditorView } from './stateStores/textEditor';

function Preview() {
  useEffect(() => {
    const editorState = EditorState.fromJSON(
      {
        schema: mySchema,
        plugins: exampleSetup({ schema: mySchema, menuBar: false }),
      },
      applicationState.richTextDescription
    );

    const editorView = new EditorView(document.querySelector('#rich-text-preview'), {
      state: editorState,
    });

    setEditorView('previewPane', editorView);
  }, []);

  return (
    <>
      <div role="document" style={{ height: '494px', overflow: 'hidden' }}>
        <div
          style={{
            pointerEvents: 'none',
            transform: 'scale(0.4)',
            transformOrigin: 'left top',
            width: '250%',
            maxWidth: 'unset',
          }}
        >
          <dialog aria-labelledby=":r1:">
            <header>
              <h2 id=":r1:"></h2>
              <div role="button" className="close" aria-label="Close"></div>
            </header>
            <div style={{ whiteSpace: 'pre-wrap' }}></div>
            <footer>Last updated Mar 9, 2024</footer>
          </dialog>
          <article className="product">
            <div className="preview-container carousel" aria-label="Product preview" style={{ paddingBottom: '25%' }}>
              <div className="items"></div>
            </div>
            <section>
              <header>
                <h1 itemProp="name">{applicationState.productName}</h1>
              </header>
              <section className="details">
                <div
                  itemScope={true}
                  itemProp="offers"
                  itemType="https://schema.org/Offer"
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <div className="has-tooltip right" aria-describedby=":r2:">
                    <div className="price" itemProp="price" content="4.15">
                      CAD$4.15
                    </div>
                    <div role="tooltip" id=":r2:">
                      CAD$4.15
                    </div>
                  </div>
                  <link itemProp="url" href="" />
                  <div itemProp="availability" hidden={true}>
                    https://schema.org/InStock
                  </div>
                  <div itemProp="priceCurrency" hidden={true}>
                    cad
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacer-2)' }}>
                  <a
                    href="https://jdesma.gumroad.jacquesdesmarais.dev/"
                    target="_blank"
                    className="user"
                    rel="noreferrer"
                    style={{ position: 'relative' }}
                  >
                    <img className="user-avatar" src={applicationState.avatarUrl} />
                    Jacques
                  </a>
                </div>
                <div className="rating">
                  <span className="rating-number">0 ratings</span>
                </div>
              </section>
              <section style={{ minHeight: '15rem' }}>
                <div className="rich-text" id="rich-text-preview"></div>
              </section>
              {applicationState.hasOpenaiAssistantThreadForDescription && (
                <section>
                  <div style={{ fontSize: '.5rem' }}>
                    N.B. AI may have been used to help write parts of this description - The Gumroad Team.
                  </div>
                </section>
              )}
            </section>
            <section>
              <section>
                <div role="status" className="warning">
                  This product is not currently for sale.
                </div>
                <div style={{ textAlign: 'center' }}></div>
                <div style={{ display: 'grid', gap: 'var(--spacer-2)', gridTemplateColumns: '1fr auto' }}>
                  <div className="combobox">
                    <div
                      role="combobox"
                      aria-expanded="false"
                      aria-controls=":r4:"
                      aria-disabled="false"
                      tabIndex={0}
                      className="input"
                      aria-label="Add to wishlist"
                    >
                      <span className="fake-input text-singleline">Add to wishlist</span>
                      <span className="icon icon-outline-cheveron-down"></span>
                    </div>
                    <div hidden={true}>
                      <datalist id=":r4:">
                        <div role="option" id=":r4:-0" className="">
                          <div>
                            <span className="icon icon-plus-circle"></span> New wishlist
                          </div>
                        </div>
                      </datalist>
                    </div>
                  </div>
                  <span className="has-tooltip">
                    <span aria-describedby=":r5:" style={{ display: 'contents' }}>
                      <span style={{ display: 'contents' }}>
                        <button className="" type="button" aria-label="Copy product URL">
                          <span className="icon icon-link"></span>
                        </button>
                      </span>
                    </span>
                    <span role="tooltip" id=":r5:">
                      Copy product URL
                    </span>
                  </span>
                </div>
              </section>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}

export default Preview;
