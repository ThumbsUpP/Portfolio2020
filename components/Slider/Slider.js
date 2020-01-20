import React from 'react';
import SlickSlider from 'react-slick';
import SliderArrow from './SliderArrow';
import './Slider.scss';

const Slider = ({ children, options }) => (
  <SlickSlider
    className="generic-slider"
    {...options}
    prevArrow={<SliderArrow to="prev" />}
    nextArrow={<SliderArrow to="next" />}
  >
    {children}
  </SlickSlider>
);

export default Slider;
