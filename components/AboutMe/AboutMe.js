import './AboutMe.scss';
import React from 'react';
import Mail from '@/public/mail.svg';

const AboutMe = () => (
  <section className="about-me">
    <div className="about-me__wrapper">
      <img src="/images/me.jpg" alt="photo of Pierre Cayol" />
      <div className="about-me__wrapper__text">
        <h1>Pierre Cayol</h1>
        <h2>Frontend developer</h2>
        <h3>
          Passionate Front End Developer with 2+ years of extensive practice, I worked for
          a major luxury brand, on the development of a world-wide ecommerce website built
          with ReactJs / NextJs / Redux / RxJs. I like to build beautiful UI, with a
          careful attention to details and performance.
        </h3>
        <p>
          I’m now available for new projects as a freelance developer, on-site or remote.
        </p>
      </div>
      <a href="mailto:pierre.cayol@gmail.com" className="about-me__wrapper__contact">
        <Mail />
        {"Let's connect"}
      </a>
    </div>
  </section>
);

export default AboutMe;
