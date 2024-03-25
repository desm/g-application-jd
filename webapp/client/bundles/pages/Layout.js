import * as React from 'react';

import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            {/* <Link to="">Home</Link> */}
            <a href="#">Home</a>
          </li>
          <li>
            {/* <Link to="blogs">Blogs</Link> */}
            <a href="#blogs">Blogs</a>
          </li>
          <li>
            {/* <Link to="contact">Contact</Link> */}
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
