import type { FunctionComponent } from 'react';
import * as React from 'react';
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom';
import Blogs from './pages/Blogs.js';
import Contact from './pages/Contact.js';
import Home from './pages/Home.js';
import Layout from './pages/Layout.js';
import NoPage from './pages/NoPage.js';

export interface Props {}

// Note, you need to declare the `FunctionComponent` type so that it complies
// with `ReactOnRails.register` type.
const Routed: FunctionComponent<Props> = (props: Props) => {
  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default Routed;
