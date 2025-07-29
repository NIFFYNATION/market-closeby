import React, { useEffect, useRef } from "react";
import "../../styles/OrangeRangeSlider.css"; 


const OrangeRangeSlider = ({ min = 0, max = 50000, value, onChange }) => {
  const sliderRef = useRef(null);

  // Update the fill percentage when value changes
  useEffect(() => {
    if (sliderRef.current) {
      const percent = ((value - min) / (max - min)) * 100;
      sliderRef.current.style.setProperty('--value-percent', `${percent}%`);
      
      // For better browser support
      const track = sliderRef.current;
      track.style.background = `linear-gradient(to right, #FFAC24 0%, #FFAC24 ${percent}%, #E5E5E5 ${percent}%, #E5E5E5 100%)`;
    }
  }, [value, min, max]);

  return (
    <input
      ref={sliderRef}
      type="range"
      min={min}
      max={max}
      value={value}
      onChange={onChange}
      className="orange-range-slider w-full"
    />
  );
};

export default OrangeRangeSlider;