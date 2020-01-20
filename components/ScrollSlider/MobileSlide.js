import React from 'react';
import cn from 'classnames';
import './MobileSlide.scss';

const MobileSlide = ({ slideTitle, slideSubTitle, image, points }) => {
  const { alt, srcMobile } = image;
  return (
    <div className={cn('mobile-slide')}>
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
  );
};

export default MobileSlide;
