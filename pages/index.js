import './index.scss';
import '@/style/global.scss';
import AboutMe from '@/components/AboutMe/AboutMe';
import React from 'react';
import Head from 'next/head';
import Layout from '@/template/Layout';
import ScrollSlider from '@/components/ScrollSlider/ScrollSlider.container';
import { IsMobileProvider } from '@/contexts/IsMobileContext';

const Home = () => (
  <IsMobileProvider>
    <Layout className="home">
      <Head>
        <title>Pierre Cayol</title>
        <meta
          property="og:image"
          content="http://portfolio.pcayol.com/images/portfolio2020.png"
        ></meta>
        <link rel="icon" href="/favicon-pc.ico" />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
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
