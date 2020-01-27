import './Layout.scss';
import React, { useState, useEffect } from 'react';
import ScrollIcon from '@/public/scroll.svg';
import ScrollTop from '@/components/ScrollTop/ScrollTop';
import cn from 'classnames';
import useStartTimer from '@/contexts/useStartTimer';

const isScrollAtTheEndOfPage = () =>
  window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

const Layout = ({ children, className }) => {
  const [endOfPage, setEndOfPage] = useState(false);
  const [isCounting, resetTimer] = useStartTimer();

  const handleScroll = () => {
    resetTimer();
    isScrollAtTheEndOfPage() ? setEndOfPage(true) : setEndOfPage(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={cn('layout', { [className]: !!className })}>
      {children}
      {!endOfPage ? (
        <ScrollIcon
          onClick={() => window.scrollBy({ top: 1000, behavior: 'smooth' })}
          className={cn('scroll-icon', { 'is-scrolling': isCounting })}
        />
      ) : (
        <ScrollTop />
      )}
    </div>
  );
};

export default Layout;
