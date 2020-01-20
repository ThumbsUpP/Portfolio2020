import './ScrollTop.scss';
import React, { useContext } from 'react';
import Arrow from '@/public/arrow.inline.svg';
import { IsMobileContext } from '@/contexts/IsMobileContext';

const handleScrollTop = () => {
  if (window !== 'unedefined') window.scrollTo({ top: 0, behavior: 'smooth' });
};

const ScrollTop = () => {
  const { isMobile } = useContext(IsMobileContext);
  return (
    !isMobile && (
      <div className="scroll-top" onClick={handleScrollTop}>
        <Arrow width={25} height={30} />
      </div>
    )
  );
};

export default ScrollTop;
