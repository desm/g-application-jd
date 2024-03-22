import { EditorView } from 'prosemirror-view';
import * as React from 'react';
import { useEffect } from 'react';

function Preview({ productName, state }) {
  useEffect(() => {
    (window as any).view2 = new EditorView(document.querySelector('#rich-text-preview'), {
      state: state.editor,
      dispatchTransaction(transaction) {},
    });
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
                <h1 itemProp="name">{productName}</h1>
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
                    <img
                      className="user-avatar"
                      src="/assets/gumroad-default-avatar-5-623b6723477dd15920db554b0a4e9aac6a5e41159fd3d7bb4c9f9745a44e4f85.png"
                    />
                    Jacques
                  </a>
                </div>
                <div className="rating">
                  <span className="rating-number">0 ratings</span>
                </div>
              </section>
              <section>
                <div className="rich-text" id="rich-text-preview"></div>
              </section>
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
