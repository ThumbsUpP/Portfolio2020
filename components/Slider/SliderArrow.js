import React from 'react';
import Chevron from '@/public/chevron.inline.svg';

const SliderArrow = ({ className, to, onClick }) => (
  <button
    onClick={onClick}
    className={`button button--text button--icon ${className}`}
    aria-label={to}
  >
    <Chevron />
  </button>
);

export default SliderArrow;
