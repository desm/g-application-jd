import type { FunctionComponent } from 'react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import ConfirmDeleteProductDialog from './ConfirmDeleteProductDialog';

export interface Props {
  product: {
    name: string;
    permalink: string;
    price_formatted: string;
  };
  sectionWidth: number;
}

const ProductListing: FunctionComponent<Props> = (props: Props) => {
  const [translateXValue, setTranslateXValue] = useState(0);
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState<'open' | 'closed'>('closed');

  const threeDots = {
    detailsElement: useRef(),
    button: useRef(),
  };
  const confirmDeleteDialogRef = useRef(confirmDeleteDialog);

  useEffect(() => {
    confirmDeleteDialogRef.current = confirmDeleteDialog;
  }, [confirmDeleteDialog]);

  useEffect(() => {
    const elementRect = (threeDots.button.current as any).getBoundingClientRect();
    setTranslateXValue(window.innerWidth - elementRect.right);

    (window as any).addEventListener('resize', () => {
      if (threeDots.button.current) {
        const elementRect = (threeDots.button.current as any).getBoundingClientRect();
        setTranslateXValue(window.innerWidth - elementRect.right);
      }
    });

    document.body.addEventListener('mousedown', () => {
      (threeDots.detailsElement.current as any)?.removeAttribute('open');
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
          {props.product.price_formatted}
        </td>
        <td data-label="Status" style={{ whiteSpace: 'nowrap' }}>
          <span className="icon icon-circle"></span> Unpublished
        </td>
        <td>
          <details className="popover toggle" ref={threeDots.detailsElement}>
            <summary>
              <span
                className="icon icon-three-dots"
                role="button"
                aria-label="Open product action menu"
                aria-haspopup="true"
                aria-expanded="false"
                ref={threeDots.button}
                onMouseDown={(e) => {
                  e.stopPropagation(); // prevents dropdown from flashing when "..." is clicked again
                }}
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
                  <span className="icon icon-outline-duplicate"></span> Duplicate
                </div>
                <div role="menuitem" aria-disabled="true">
                  <span className="icon icon-archive"></span> Archive
                </div>
                <div
                  className="danger"
                  aria-disabled="false"
                  role="menuitem"
                  onMouseDown={(e) => {
                    e.stopPropagation(); // prevents dropdown from being closed by parent handler and dialog not opening
                  }}
                  onClick={(e) => {
                    setConfirmDeleteDialog('open');
                    (threeDots.button.current as any).click(); // closes dropdown
                  }}
                >
                  <span className="icon icon-trash2"></span> Delete permanently
                </div>
              </div>
            </div>
          </details>
          <ConfirmDeleteProductDialog
            state={confirmDeleteDialog}
            close={() => {
              setConfirmDeleteDialog('closed');
            }}
            productName={props.product.name}
            permalink={props.product.permalink}
          />
        </td>
      </tr>
    </>
  );
};

export default ProductListing;
