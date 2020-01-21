import React, { useContext } from 'react';
import { IsMobileContext } from '@/contexts/IsMobileContext';

export default Comp => props => {
  const { isMobile } = useContext(IsMobileContext);
  return <Comp {...props} isMobile={isMobile} />;
};
