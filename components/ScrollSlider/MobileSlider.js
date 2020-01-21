import './MobileSlider.scss';
import React from 'react';
import Slider from '@/components/Slider/Slider';
import cn from 'classnames';

const SLIDER_DEFAULT_SETTING = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
};

const MobileSlider = ({ nodes, title }) => {
  console.log({ nodes, title });
  return (
    <section className="slider-mobile">
      <div className="slider-mobile__presentation">
        <p className="slider-mobile__presentation__title">{title}</p>
      </div>
      <Slider options={SLIDER_DEFAULT_SETTING}>
        {nodes.map(
          ({ slideTitle, slideSubTitle, image: { alt, srcMobile }, points }, i) => (
            <div className={cn('mobile-slide')} key={i}>
              <div className="mobile-slide__img">
                <img alt={alt} src={srcMobile} className="cover" />
              </div>
              <div>
                <div className="mobile-slide__title">
                  <p className="mobile-slide__title-text">{slideTitle}</p>
                  <p className="mobile-slide__title-subtitle">{slideSubTitle}</p>
                </div>
                {points && (
                  <div className="mobile-slide__points">
                    {points.map((string, i) => (
                      <span key={i}>{string}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )
        )}
      </Slider>
    </section>
  );
};

export default MobileSlider;
