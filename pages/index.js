import './index.scss';
import '@/style/global.scss';
import AboutMe from '@/components/AboutMe/AboutMe';
import React from 'react';
import Head from 'next/head';
import Layout from '@/template/Layout';
import ScrollSlider from '@/components/ScrollSlider/ScrollSlider';
import { IsMobileProvider } from '@/contexts/IsMobileContext';

const Home = () => (
  <IsMobileProvider>
    <Layout className="home">
      <Head>
        <title>Pierre Cayol</title>
        <link rel="icon" href="/favicon-16x16.png" />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:200,300,400,500,600,900"
          rel="stylesheet"
        ></link>
      </Head>
      <AboutMe />
      <ScrollSlider />
    </Layout>
  </IsMobileProvider>
);

export default Home;
