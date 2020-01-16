import './ScrollTop.scss';
import React from 'react';
import Arrow from '@/public/arrow.inline.svg';

const handleScrollTop = () => {
  if (window !== 'unedefined') window.scrollTo({ top: 0, behavior: 'smooth' });
};

const ScrollTop = () => {
  return (
    <div className="scroll-top" onClick={handleScrollTop}>
      <Arrow width={25} height={30} />
    </div>
  );
};

export default ScrollTop;
