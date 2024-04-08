import type { FunctionComponent } from 'react';
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { sendDeleteRequest } from '../lib/clientRequests/base';

export const DELETE_PRODUCT_SUCCESS_EVENT = 'DELETE_PRODUCT_SUCCESS_EVENT';

export interface Props {
  state: 'open' | 'closed';
  close: () => void;
  productName: string;
  permalink: string;
}

const ConfirmDeleteProductDialog: FunctionComponent<Props> = (props: Props) => {
  const [isPending, setPending] = useState(false);

  const dialogRef = useRef();

  useEffect(() => {
    if (props.state == 'open') {
      (dialogRef.current as any).showModal();
    } else {
      (dialogRef.current as any).close();
    }
  }, [props.state]);

  const doDelete = async (e) => {
    if (isPending) return;
    setPending(true);
    const response = await sendDeleteRequest(`/links/${props.permalink}`);
    if (response.success) {
      props.close();
      document.dispatchEvent(new CustomEvent(DELETE_PRODUCT_SUCCESS_EVENT));
    } else {
      console.error(response);
    }
    setPending(false);
  };

  return (
    <dialog ref={dialogRef} aria-labelledby=":r1:">
      <header>
        <h2 id=":r1:">Delete Product</h2>
        <div role="button" className="close" aria-label="Close" onClick={props.close}></div>
      </header>
      <h4>Are you sure you want to delete {props.productName}?</h4>
      <footer>
        <button onClick={props.close}>Cancel</button>
        <button className="danger" onClick={doDelete}>
          Confirm
        </button>
      </footer>
    </dialog>
  );
};

export default ConfirmDeleteProductDialog;
