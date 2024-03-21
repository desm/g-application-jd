import * as React from 'react';
import { useEffect, useState } from 'react';
import type { FunctionComponent } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import Header from './ProductContentPreview/Header';
import Sections from './ProductContentPreview/Sections';
import ProductContent from './ProductContentPreview/ProductContent';
import ShareLinks from './ProductContentPreview/ShareLinks';
import ProfileSettings from './ProductContentPreview/ProfileSettings';
import DiscoverSettings from './ProductContentPreview/DiscoverSettings';
import Preview from './ProductContentPreview/Preview';

export interface Props {}

/**
 * this component uses the following technique:
 * https://react.dev/reference/react-dom/createPortal#rendering-react-components-into-non-react-dom-nodes
 */
const ProductContentPreview: FunctionComponent<Props> = (props: Props) => {
  const [editLinkBasicForm, setEditLinkBasicForm] = useState(null);
  const [productPreviewRoot, setProductPreviewRoot] = useState(null);

  useEffect(() => {
    createRoot(document.getElementById('header-root')).render(<Header />);
    createRoot(document.getElementById('edit-link-content-form')).render(<ProductContent />);
    createRoot(document.getElementById('share-links-root')).render(<ShareLinks />);
    createRoot(document.getElementById('profile-settings-root')).render(<ProfileSettings />);
    createRoot(document.getElementById('discover-settings-root')).render(<DiscoverSettings />);

    const editElement = document.getElementById('edit-link-basic-form');
    editElement.removeChild(editElement.firstChild); // removes the text node "Initializing..."
    setEditLinkBasicForm(editElement);
    editElement.parentElement.style.display = '';

    const previewElement = document.getElementById('product-preview-root');
    setProductPreviewRoot(previewElement)
    previewElement.style.display = '';
  }, []);

  return (
    <>
      {editLinkBasicForm !== null && createPortal(<Sections />, editLinkBasicForm)}
      {productPreviewRoot !== null && createPortal(<Preview />, productPreviewRoot)}
    </>
  );
};

export default ProductContentPreview;

/*
{
  "name": "product name",
  "is_physical": false,
  "is_tiered_membership": false,
  "thumbnail_url": null,
  "native_type": "digital",
  "updated_at": "2024-03-08T16:50:59Z",
  "creator": {
    "id": "9078562000866",
    "name": "Jacques",
    "profile_url": "https://jdesma.gumroad.jacquesdesmarais.dev/",
    "avatar_url": "/assets/gumroad-default-avatar-5-623b6723477dd15920db554b0a4e9aac6a5e41159fd3d7bb4c9f9745a44e4f85.png"
  },
  "digital_variant_options": [
    { "id": "VjBqZpNx9c12Y-2cAYTCVg==", "name": "one" },
    { "id": "NxP68JiGajkgCRohWGNmOg==", "name": "Untitled" }
  ],
  "digital_variant_option_files_mapping": {
    "VjBqZpNx9c12Y-2cAYTCVg==": [],
    "NxP68JiGajkgCRohWGNmOg==": []
  },
  "content_type": "sectionless",
  "files": [],
  "folders": [],
  "content_items": [],
  "covers": [],
  "main_cover_id": null
}
*/
