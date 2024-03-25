import ReactOnRails from 'react-on-rails';
import Nav from '../bundles/Nav';
import Dashboard from '../bundles/Dashboard';
import ProductsDashboardPage from '../bundles/ProductsDashboardPage';
import NewProductPage from '../bundles/NewProductPage';
import ProductPreviewVariantDropdown from '../bundles/ProductPreviewVariantDropdown';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  Nav,
  Dashboard,
  ProductsDashboardPage,
  NewProductPage,
  ProductPreviewVariantDropdown,
});
