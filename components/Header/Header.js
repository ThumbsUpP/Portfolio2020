import './Header.scss';
import React, { useState } from 'react';
import cn from 'classnames';

const headerButton = ['home', 'projects'];

const Header = () => {
  const [isSelected, setIsSelected] = useState(0);
  return (
    <div className="header">
      {headerButton.map((button, i) => (
        <button
          key={button}
          className={cn({ 'is-selected': isSelected === i })}
          onClick={() => setIsSelected(i)}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

export default Header;
