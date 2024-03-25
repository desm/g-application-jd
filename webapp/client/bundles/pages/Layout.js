import * as React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#blogs">Blogs</a>
          </li>
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault(); // prevents the route from changing
              }}
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
