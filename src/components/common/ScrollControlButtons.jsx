// src/components/common/ScrollControlButtons.jsx
import React, { useState } from 'react';

const ScrollControlButtons = ({ onLeft, onRight, className = "" }) => {
  const [activeBtn, setActiveBtn] = useState(null);

  // Helper for icon color (SVG filter for white/primary)
  const iconFilter = (direction) =>
    activeBtn === direction ? 'invert brightness-200' : 'filter-none';

  const handleClick = (direction, callback) => {
    setActiveBtn(direction);
    callback();
    setTimeout(() => setActiveBtn(null), 180);
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <button
        aria-label="Scroll left"
        className={`p-2 rounded-md border transition-colors duration-150 ${activeBtn === 'left' ? 'bg-secondary border-secondary ring-2 ring-secondary' : 'bg-[#F1F1F1] border-gray-200'}`}
        onClick={() => handleClick('left', onLeft)}
      >
        <img
          src='/icons/arrow-left.svg'
          className={`w-4 h-4 ${iconFilter('left')}`}
          alt="Scroll left"
        />
      </button>
      <button
        aria-label="Scroll right"
        className={`p-2 rounded-md border transition-colors duration-150 ${activeBtn === 'right' ? 'bg-secondary border-secondary ring-2 ring-secondary' : 'bg-secondary border-gray-200'}`}
        onClick={() => handleClick('right', onRight)}
      >
        <img
          src='/icons/arrow-right.svg'
          className={`w-4 h-4 ${iconFilter('right')}`}
          alt="Scroll right"
        />
      </button>
    </div>
  );
};

export default ScrollControlButtons;