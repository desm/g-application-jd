import * as React from 'react';
import type { FunctionComponent } from 'react';
import ProductListing from './ProductsDashboardPage/ProductListing';

export interface Props {
  memberships: any[];
}

const ProductsDashboardPage: FunctionComponent<Props> = (props: Props) => {
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
        <section>
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
                  <ProductListing />
                  <tr>
                    <td className="icon-cell">
                      <span className="icon icon-card-image-fill"></span>
                    </td>
                    <td>
                      <div>
                        <a href="/products/hvhng/edit" style={{ textDecoration: 'none' }}>
                          <h4>Hey</h4>
                        </a>
                        <a
                          href="https://jdesma.gumroad.jacquesdesmarais.dev/l/hvhng"
                          title="https://jdesma.gumroad.jacquesdesmarais.dev/l/hvhng"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>jdesma.gumroad.jacquesdesmarais.dev/l/hvhng</small>
                        </a>
                      </div>
                    </td>
                    <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
                      <a href="/customers/hvhng">0</a>
                    </td>
                    <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
                      $0
                    </td>
                    <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
                      CAD$123
                    </td>
                    <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
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
                            transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                            maxWidth: 'calc(0px - 2 * var(--spacer-4))',
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
                  <tr>
                    <td className="icon-cell">
                      <span className="icon icon-card-image-fill"></span>
                    </td>
                    <td>
                      <div>
                        <a href="/products/mnyev/edit" style={{ textDecoration: 'none' }}>
                          <h4>Hey</h4>
                        </a>
                        <a
                          href="https://jdesma.gumroad.jacquesdesmarais.dev/l/mnyev"
                          title="https://jdesma.gumroad.jacquesdesmarais.dev/l/mnyev"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>jdesma.gumroad.jacquesdesmarais.dev/l/mnyev</small>
                        </a>
                      </div>
                    </td>
                    <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
                      <a href="/customers/mnyev">0</a>
                    </td>
                    <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
                      $0
                    </td>
                    <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
                      CAD$123
                    </td>
                    <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
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
                            transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                            maxWidth: 'calc(0px - 2 * var(--spacer-4))',
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
                  <tr>
                    <td className="icon-cell">
                      <span className="icon icon-card-image-fill"></span>
                    </td>
                    <td>
                      <div>
                        <a href="/products/kmsanj/edit" style={{ textDecoration: 'none' }}>
                          <h4>Another</h4>
                        </a>
                        <a
                          href="https://jdesma.gumroad.jacquesdesmarais.dev/l/kmsanj"
                          title="https://jdesma.gumroad.jacquesdesmarais.dev/l/kmsanj"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>jdesma.gumroad.jacquesdesmarais.dev/l/kmsanj</small>
                        </a>
                      </div>
                    </td>
                    <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
                      <a href="/customers/kmsanj">0</a>
                    </td>
                    <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
                      $0
                    </td>
                    <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
                      CAD$33
                    </td>
                    <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
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
                            transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                            maxWidth: 'calc(0px - 2 * var(--spacer-4))',
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
                  <tr>
                    <td className="icon-cell">
                      <span className="icon icon-card-image-fill"></span>
                    </td>
                    <td>
                      <div>
                        <a href="/products/votwy/edit" style={{ textDecoration: 'none' }}>
                          <h4>Graphic Novel</h4>
                        </a>
                        <a
                          href="https://jdesma.gumroad.jacquesdesmarais.dev/l/votwy"
                          title="https://jdesma.gumroad.jacquesdesmarais.dev/l/votwy"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>jdesma.gumroad.jacquesdesmarais.dev/l/votwy</small>
                        </a>
                      </div>
                    </td>
                    <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
                      <a href="/customers/votwy">2</a>
                    </td>
                    <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
                      $0
                    </td>
                    <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
                      CAD$0+
                    </td>
                    <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
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
                            transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                            maxWidth: 'calc(0px - 2 * var(--spacer-4))',
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
                  <tr>
                    <td className="icon-cell">
                      <span className="icon icon-card-image-fill"></span>
                    </td>
                    <td>
                      <div>
                        <a href="/products/ikgcf/edit" style={{ textDecoration: 'none' }}>
                          <h4>Bundle</h4>
                        </a>
                        <a
                          href="https://jdesma.gumroad.jacquesdesmarais.dev/l/ikgcf"
                          title="https://jdesma.gumroad.jacquesdesmarais.dev/l/ikgcf"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>jdesma.gumroad.jacquesdesmarais.dev/l/ikgcf</small>
                        </a>
                      </div>
                    </td>
                    <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
                      <a href="/customers/ikgcf">0</a>
                    </td>
                    <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
                      $0
                    </td>
                    <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
                      $5
                    </td>
                    <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
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
                            transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                            maxWidth: 'calc(0px - 2 * var(--spacer-4))',
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
                  <tr>
                    <td className="icon-cell">
                      <span className="icon icon-card-image-fill"></span>
                    </td>
                    <td>
                      <div>
                        <a href="/products/toslm/edit" style={{ textDecoration: 'none' }}>
                          <h4>Physical good</h4>
                        </a>
                        <a
                          href="https://jdesma.gumroad.jacquesdesmarais.dev/l/toslm"
                          title="https://jdesma.gumroad.jacquesdesmarais.dev/l/toslm"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>jdesma.gumroad.jacquesdesmarais.dev/l/toslm</small>
                        </a>
                      </div>
                    </td>
                    <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
                      <a href="/customers/toslm">0</a>
                    </td>
                    <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
                      $0
                    </td>
                    <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
                      $5
                    </td>
                    <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
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
                            transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                            maxWidth: 'calc(0px - 2 * var(--spacer-4))',
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
                  <tr>
                    <td className="icon-cell">
                      <span className="icon icon-card-image-fill"></span>
                    </td>
                    <td>
                      <div>
                        <a href="/products/riwfx/edit" style={{ textDecoration: 'none' }}>
                          <h4>Audiobook</h4>
                        </a>
                        <a
                          href="https://jdesma.gumroad.jacquesdesmarais.dev/l/riwfx"
                          title="https://jdesma.gumroad.jacquesdesmarais.dev/l/riwfx"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>jdesma.gumroad.jacquesdesmarais.dev/l/riwfx</small>
                        </a>
                      </div>
                    </td>
                    <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
                      <a href="/customers/riwfx">0</a>
                    </td>
                    <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
                      $0
                    </td>
                    <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
                      $5
                    </td>
                    <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
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
                            transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                            maxWidth: 'calc(0px - 2 * var(--spacer-4))',
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
                  <tr>
                    <td className="icon-cell">
                      <span className="icon icon-card-image-fill"></span>
                    </td>
                    <td>
                      <div>
                        <a href="/products/dfhafm/edit" style={{ textDecoration: 'none' }}>
                          <h4>E-book</h4>
                        </a>
                        <a
                          href="https://jdesma.gumroad.jacquesdesmarais.dev/l/dfhafm"
                          title="https://jdesma.gumroad.jacquesdesmarais.dev/l/dfhafm"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>jdesma.gumroad.jacquesdesmarais.dev/l/dfhafm</small>
                        </a>
                      </div>
                    </td>
                    <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
                      <a href="/customers/dfhafm">0</a>
                    </td>
                    <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
                      $0
                    </td>
                    <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
                      $5
                    </td>
                    <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
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
                            transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                            maxWidth: 'calc(0px - 2 * var(--spacer-4))',
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
                  <tr>
                    <td className="icon-cell">
                      <span className="icon icon-card-image-fill"></span>
                    </td>
                    <td>
                      <div>
                        <a href="/products/puhut/edit" style={{ textDecoration: 'none' }}>
                          <h4>Course or tutorial</h4>
                        </a>
                        <a
                          href="https://jdesma.gumroad.jacquesdesmarais.dev/l/puhut"
                          title="https://jdesma.gumroad.jacquesdesmarais.dev/l/puhut"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>jdesma.gumroad.jacquesdesmarais.dev/l/puhut</small>
                        </a>
                      </div>
                    </td>
                    <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
                      <a href="/customers/puhut">0</a>
                    </td>
                    <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
                      $0
                    </td>
                    <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
                      $5
                    </td>
                    <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
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
                            transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                            maxWidth: 'calc(0px - 2 * var(--spacer-4))',
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
                  <tr>
                    <td className="icon-cell">
                      <span className="icon icon-card-image-fill"></span>
                    </td>
                    <td>
                      <div>
                        <a href="/products/anjhlb/edit" style={{ textDecoration: 'none' }}>
                          <h4>Digital product</h4>
                        </a>
                        <a
                          href="https://jdesma.gumroad.jacquesdesmarais.dev/l/anjhlb"
                          title="https://jdesma.gumroad.jacquesdesmarais.dev/l/anjhlb"
                          target="_blank"
                          rel="noreferrer"
                        >
                          <small>jdesma.gumroad.jacquesdesmarais.dev/l/anjhlb</small>
                        </a>
                      </div>
                    </td>
                    <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
                      <a href="/customers/anjhlb">0</a>
                    </td>
                    <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
                      $0
                    </td>
                    <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
                      $6
                    </td>
                    <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
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
                            transform: 'translateX(min(0px - 100% - var(--spacer-4), 0px))',
                            maxWidth: 'calc(0px - 2 * var(--spacer-4))',
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
                    <td>2</td>
                    <td colSpan={5}>$0</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProductsDashboardPage;
