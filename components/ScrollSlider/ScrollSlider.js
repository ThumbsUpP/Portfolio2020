import './ScrollSlider.scss';
import React, { useEffect, useState, useContext } from 'react';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';
import { IsMobileContext } from '@/contexts/IsMobileContext';
import Slider from '@/components/Slider/Slider';
import { size } from 'lodash/fp';
import data from './data.json';
import cn from 'classnames';
import MobileSlide from './MobileSlide';

const SLIDER_DEFAULT_SETTING = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
};

const getSlideZIndex = (active, index) => {
  if (active === index) return 99;
  if (index > active) return -index;
  return index;
};

const renderSlide = ({ slideTitle, slideSubTitle, image, points }, i, activeSlide) => {
  const { alt, src } = image;
  return (
    <div
      className={cn('slide', { active: activeSlide === i })}
      style={{ zIndex: getSlideZIndex(activeSlide, i) }}
      key={i}
    >
      <div className="skew-wrapper">
        <div className="slide__img">
          <img alt={alt} src={src} className="cover" />
        </div>
        <div>
          <div className="slide__title">
            <p className="slide__title-text">{slideTitle}</p>
            <p className="slide__title-subtitle">{slideSubTitle}</p>
          </div>
          {points && (
            <div className="slide__points">
              {points.map((string, i) => (
                <span key={i}>{string}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScrollSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { isMobile } = useContext(IsMobileContext);
  const { nodes, title } = data;
  const slideNumber = size(nodes);

  console.log({ isMobile });

  const handleScroll = () => {
    let activeIndex = 0;
    const slides = document.querySelectorAll('.slide');
    slides.forEach((el, i) => {
      if (el.style.transform !== 'translate(100%, 0%) matrix(1, 0, 0, 1, 0, 0)') {
        activeIndex = i;
      }
    });
    return setActiveSlide(activeIndex);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => handleScroll(), true);
    return () => window.removeEventListener('scroll', () => handleScroll(), true);
  }, []);

  return isMobile ? (
    <section className="slider-mobile">
      <div className="slider-mobile__presentation">
        <p className="slider-mobile__presentation__title">{title}</p>
      </div>
      <Slider options={SLIDER_DEFAULT_SETTING}>
        {nodes.map((item, i) => (
          <MobileSlide {...item} key={i} />
        ))}
      </Slider>
    </section>
  ) : (
    <section className="scroll-magic-slider">
      <div id="pinSection">
        <Controller>
          <Scene
            triggerHook="onLeave"
            classToggle="active"
            duration={slideNumber * 800}
            pin
          >
            <Timeline wrapper={<div id="pinContainer" />}>
              <div className="scroll-magic-slider__presentation">
                <p className="scroll-magic-slider__presentation__title">{title}</p>
                <p className="scroll-magic-slider__presentation__subtitle">
                  {nodes[activeSlide].presentation}
                </p>
              </div>
              {nodes.map((item, i) => (
                <Tween
                  from={i !== 0 && { css: { opacity: 0, x: '100%' } }}
                  to={i !== 0 && { css: { opacity: 1, x: '0%' } }}
                  key={i}
                >
                  {renderSlide(item, i, activeSlide, isMobile)}
                </Tween>
              ))}
            </Timeline>
          </Scene>
        </Controller>
      </div>
    </section>
  );
};

export default ScrollSlider;
