import type { FunctionComponent } from 'react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import ProductListing from './ProductsDashboardPage/ProductListing';
import { DELETE_PRODUCT_SUCCESS_EVENT } from './ProductsDashboardPage/ConfirmDeleteProductDialog';
import { sendGetRequest } from './util';

export interface Props {
  memberships: any[];
  products: any[];
  empty_products_image_url: string;
}

const ProductsDashboardPage: FunctionComponent<Props> = (props: Props) => {
  const sectionRef = useRef();
  const [sectionWidth, setSectionWidth] = useState(0);
  const [products, setProducts] = useState(props.products);

  useEffect(() => {
    setSectionWidth((sectionRef.current as any).clientWidth);

    (window as any).addEventListener('resize', () => {
      setSectionWidth((sectionRef.current as any).clientWidth);
    });

    document.addEventListener(DELETE_PRODUCT_SUCCESS_EVENT, handleDeleteProduct);
    return () => {
      document.removeEventListener('customAction', handleDeleteProduct);
    };
  }, []);

  const handleDeleteProduct = async () => {
    const response = await sendGetRequest('/products/paged?page=1');
    if (response.entries) {
      setProducts(response.entries);
    }
  };

  return (
    <>
      <main>
        <header>
          <h1>Products</h1>
          <div className="actions">
            <details className="popover toggle">
              <summary>
                <span className="has-tooltip bottom">
                  <span aria-describedby=":R2p:" style={{ display: 'contents' }}>
                    <button type="button" aria-label="Toggle Search" aria-haspopup="true" aria-expanded="false">
                      <span className="icon icon-solid-search"></span>
                    </button>
                  </span>
                  <span role="tooltip" id=":R2p:">
                    Search
                  </span>
                </span>
              </summary>
              <div
                className="dropdown"
                style={{
                  transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                  maxWidth: 'calc(0px - 2 * var(--spacer-4))',
                }}
              >
                <div className="input">
                  <span className="icon icon-solid-search"></span>
                  <input type="text" placeholder="Search products" />
                </div>
              </div>
            </details>
            <a className="accent button" aria-disabled="false" href="/products/new">
              New product
            </a>
          </div>
          <div role="tablist">
            <a aria-selected="true" href="/products" role="tab">
              All products
            </a>
            <a aria-selected="false" href="/products/discover" role="tab">
              Discover
            </a>
            <a aria-selected="false" href="/products/affiliated" role="tab">
              Affiliated
            </a>
            <a aria-selected="false" href="/products/collabs" role="tab">
              Collabs
            </a>
          </div>
        </header>
        <section ref={sectionRef}>
          {props.memberships.length + products.length === 0 ? (
            <div className="placeholder">
              <figure>
                <img src={props.empty_products_image_url} />
              </figure>
              <h2>We've never met an idea we didn't like.</h2>
              <p>Your first product doesn't need to be perfect. Just put it out there, and see if it sticks.</p>
              <div>
                <a className="accent button" aria-disabled="false" href="/products/new" style={{ alignSelf: 'center' }}>
                  New product
                </a>
              </div>
              <span>
                or
                <a href="https://help.gumroad.com/article/304-products-dashboard" target="_blank" rel="noreferrer"> learn more about the products dashboard
                </a>
              </span>
            </div>
          ) : (
            <div style={{ display: 'grid;gap:var(--spacer-7)' }}>
              {props.memberships.length > 0 && (
                <section className="paragraphs">
                  <table aria-busy="false">
                    <caption>Memberships</caption>
                    <thead>
                      <tr>
                        <th></th>
                        <th aria-sort="none" title="Sort by Name">
                          Name
                        </th>
                        <th aria-sort="none" title="Sort by Members">
                          Members
                        </th>
                        <th aria-sort="none" title="Sort by Revenue">
                          Revenue
                        </th>
                        <th aria-sort="none" title="Sort by Price">
                          Price
                        </th>
                        <th aria-sort="none" title="Sort by Status">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="icon-cell">
                          <span className="icon icon-card-image-fill"></span>
                        </td>
                        <td>
                          <a href="/products/ptpaj/edit" style={{ textDecoration: 'none' }}>
                            <h4>Podcast</h4>
                          </a>
                          <a
                            href="https://jdesma.gumroad.jacquesdesmarais.dev/l/ptpaj"
                            title="https://jdesma.gumroad.jacquesdesmarais.dev/l/ptpaj"
                            target="_blank"
                            rel="noreferrer"
                          >
                            <small>jdesma.gumroad.jacquesdesmarais.dev/l/ptpaj</small>
                          </a>
                        </td>
                        <td data-label="Members">0</td>
                        <td data-label="Revenue">
                          $0<small>$0 /mo</small>
                        </td>
                        <td data-label="Price">$5 a month</td>
                        <td data-label="Status">
                          <span className="icon icon-circle"></span>
                          Unpublished
                        </td>
                        <td>
                          <details className="popover toggle">
                            <summary>
                              <span
                                className="icon icon-three-dots"
                                role="button"
                                aria-label="Open product action menu"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></span>
                            </summary>
                            <div
                              className="dropdown"
                              style={{
                                transform:
                                  'translateX(min(0px - 100% - var(--spacer-4), 0px));max-width:calc(0px - 2 * var(--spacer-4))',
                              }}
                            >
                              <div role="menu">
                                <div role="menuitem" aria-disabled="false">
                                  <span className="icon icon-outline-duplicate"></span>
                                  Duplicate
                                </div>
                                <div role="menuitem" aria-disabled="false">
                                  <span className="icon icon-archive"></span>
                                  Archive
                                </div>
                                <div className="danger" aria-disabled="false" role="menuitem">
                                  <span className="icon icon-trash2"></span>
                                  Delete permanently
                                </div>
                              </div>
                            </div>
                          </details>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={2}>Totals</td>
                        <td>0</td>
                        <td colSpan={4}>$0</td>
                      </tr>
                    </tfoot>
                  </table>
                </section>
              )}
              <div className="paragraphs">
                <table aria-live="polite" aria-busy="false">
                  <caption>Products</caption>
                  <thead>
                    <tr>
                      <th></th>
                      <th aria-sort="none" title="Sort by Name">
                        Name
                      </th>
                      <th aria-sort="none" title="Sort by Sales">
                        Sales
                      </th>
                      <th aria-sort="none" title="Sort by Revenue">
                        Revenue
                      </th>
                      <th aria-sort="none" title="Sort by Price">
                        Price
                      </th>
                      <th aria-sort="none" title="Sort by Status">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <ProductListing key={index} product={product} sectionWidth={sectionWidth} />
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={2}>Totals</td>
                      <td>2</td>
                      <td colSpan={5}>$0</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default ProductsDashboardPage;
