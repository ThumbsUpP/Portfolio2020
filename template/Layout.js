import './Layout.scss';
import React from 'react';
import cn from 'classnames';
import ScrollIcon from '@/public/scroll.svg';

const Layout = ({ children, className }) => (
  <div className={cn('layout', { [className]: !!className })}>
    {children}
    <ScrollIcon className="scroll-icon" />
  </div>
);

export default Layout;
