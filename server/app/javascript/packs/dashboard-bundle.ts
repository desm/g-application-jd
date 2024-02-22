import ReactOnRails from 'react-on-rails';

import Nav from '../bundles/Dashboard/components/Nav';
import Dashboard from '../bundles/Dashboard/components/Dashboard';

// This is how react_on_rails can see these components in the browser.
ReactOnRails.register({
  Nav,
  Dashboard,
});
