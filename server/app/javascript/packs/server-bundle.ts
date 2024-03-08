import ReactOnRails from 'react-on-rails';
import HelloWorld from '../bundles/HelloWorld/components/HelloWorldServer';
import Nav from '../bundles/Dashboard/components/NavServer';
import Dashboard from '../bundles/Dashboard/components/DashboardServer';
import ProductsDashboardPage from '../bundles/ProductsDashboardPage/ProductsDashboardPage';
import NewProductPage from '../bundles/NewProductPage/NewProductPage';

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  Nav,
  Dashboard,
  ProductsDashboardPage,
  NewProductPage,
});
