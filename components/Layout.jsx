import React from 'react';
// framework
import Head from 'next/head';
// components
import { Footer, Navbar } from './';

const Layout = ({ children }) => (
  <div className="layout">
    <Head>
      <title>Comtrya Commerce</title>
    </Head>

    <header>
      <Navbar />
    </header>
    <main className="main-container">{children}</main>
    <footer>
      <Footer />
    </footer>
  </div>
);

export default Layout;
