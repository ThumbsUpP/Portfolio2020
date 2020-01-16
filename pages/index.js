import './index.scss';
import '@/style/global.scss';
import React from 'react';
import Head from 'next/head';
import Layout from '@/template/Layout';
import ScrollSlider from '@/components/ScrollSlider/ScrollSlider';
import { IsMobileProvider } from '@/contexts/IsMobileContext';

const Home = () => (
  <IsMobileProvider>
    <Layout className="home">
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,600"
          rel="stylesheet"
        ></link>
      </Head>
      <ScrollSlider />
    </Layout>
  </IsMobileProvider>
);

export default Home;
