import ReactOnRails from 'react-on-rails';

import Nav from '../bundles/Dashboard/components/Nav';
import Dashboard from '../bundles/Dashboard/components/Dashboard';
import ProductsDashboardPage from '../bundles/ProductsDashboardPage/ProductsDashboardPage';
import NewProductPage from '../bundles/NewProductPage/NewProductPage';

// This is how react_on_rails can see these components in the browser.
ReactOnRails.register({
  Nav,
  Dashboard,
  ProductsDashboardPage,
  NewProductPage,
});
