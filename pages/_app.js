import React from 'react';
// wrappers
import { StateContext } from '../context/StateContext';
import { Layout } from '../components';
import { Toaster } from 'react-hot-toast';
// styles
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
