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
                <div
                  className="radio-buttons"
                  role="radiogroup"
                  itemProp="offers"
                  itemType="https://schema.org/AggregateOffer"
                  itemScope={false}
                >
                  <button
                    role="radio"
                    aria-checked="true"
                    aria-label="one"
                    itemProp="offer"
                    itemType="https://schema.org/Offer"
                    itemScope={false}
                  >
                    <div className="pill">
                      CAD$1
                      <div itemProp="price" hidden={false}>
                        1
                      </div>
                      <div itemProp="priceCurrency" hidden={false}>
                        cad
                      </div>
                    </div>
                    <div>
                      <h4>one</h4>
                    </div>
                  </button>
                  <button
                    role="radio"
                    aria-checked="false"
                    aria-label="Untitled"
                    itemProp="offer"
                    itemType="https://schema.org/Offer"
                    itemScope={false}
                  >
                    <div className="pill">
                      CAD$1
                      <div itemProp="price" hidden={false}>
                        1
                      </div>
                      <div itemProp="priceCurrency" hidden={false}>
                        cad
                      </div>
                    </div>
                    <div>
                      <h4>Untitled</h4>
                    </div>
                  </button>
                  <div itemProp="offerCount" hidden={false}>
                    2
                  </div>
                  <div itemProp="lowPrice" hidden={false}>
                    1
                  </div>
                  <div itemProp="priceCurrency" hidden={false}>
                    cad
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}></div>
              </section>
            </section>
          </article>
        </div>
      </div>
    </>
  );
}

export default Preview;
