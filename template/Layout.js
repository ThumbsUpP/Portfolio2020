import './Layout.scss';
import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import ScrollIcon from '@/public/scroll.svg';
import ScrollTop from '@/components/ScrollTop/ScrollTop';

const Layout = ({ children, className }) => {
  const [endOfPage, setEndOfPage] = useState(false);
  const handleScroll = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
      return setEndOfPage(true);
    }
    return endOfPage && setEndOfPage(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [endOfPage]);

  return (
    <div className={cn('layout', { [className]: !!className })}>
      {children}
      {!endOfPage ? <ScrollIcon className="scroll-icon" /> : <ScrollTop />}
    </div>
  );
};

export default Layout;
