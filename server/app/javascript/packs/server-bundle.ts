import ReactOnRails from 'react-on-rails'
import HelloWorld from '../bundles/HelloWorld/components/HelloWorldServer'
import Nav from '../bundles/Dashboard/components/NavServer'
import Dashboard from '../bundles/Dashboard/components/DashboardServer'

// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  HelloWorld,
  Nav,
  Dashboard
})