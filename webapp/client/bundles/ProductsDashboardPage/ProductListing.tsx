import type { FunctionComponent } from 'react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';

export interface Props {
  product: {
    name: string;
    permalink: string;
  };
  sectionWidth: number;
}

const ProductListing: FunctionComponent<Props> = (props: Props) => {
  const [translateXValue, setTranslateXValue] = useState(0);
  const iconThreeDots = useRef();

  useEffect(() => {
    const elementRect = (iconThreeDots.current as any).getBoundingClientRect();
    setTranslateXValue(window.innerWidth - elementRect.right);
    
    (window as any).addEventListener('resize', () => {
      const elementRect = (iconThreeDots.current as any).getBoundingClientRect();
      setTranslateXValue(window.innerWidth - elementRect.right);
    });
  }, []);

  return (
    <>
      <tr>
        <td className="icon-cell">
          <span className="icon icon-card-image-fill"></span>
        </td>
        <td>
          <div>
            <a href={`/products/${props.product.permalink}/edit`} style={{ textDecoration: 'none' }}>
              <h4>{props.product.name}</h4>
            </a>
            <a
              href="#"
              title={`https://jdesma.gumroad.jacquesdesmarais.dev/l/{props.product.permalink}`}
              rel="noreferrer"
            >
              <small>jdesma.gumroad.jacquesdesmarais.dev/l/{props.product.permalink}</small>
            </a>
          </div>
        </td>
        <td data-label="Sales" style={{ whiteSpace: 'nowrap' }}>
          <a href="/customers/foioyb">0</a>
        </td>
        <td data-label="Revenue" style={{ whiteSpace: 'nowrap' }}>
          $0
        </td>
        <td data-label="Price" style={{ whiteSpace: 'nowrap' }}>
          CAD$999
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
                ref={iconThreeDots}
              ></span>
            </summary>
            <div
              className="dropdown"
              style={{
                transform: `translateX(min(${translateXValue}px - 100% - var(--spacer-4), 0px))`,
                maxWidth: `calc(${props.sectionWidth}px - 2 * var(--spacer-4))`,
              }}
            >
              <div role="menu">
                <div role="menuitem" aria-disabled="true">
                  <span className="icon icon-outline-duplicate"></span>
                  Duplicate
                </div>
                <div role="menuitem" aria-disabled="true">
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
    </>
  );
};

export default ProductListing;
