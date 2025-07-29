import React, { useRef, useState } from "react";

import { featureCards } from "./data/featureCardsData";
import FeatureCard from "./cards/FeatureCard";
import ScrollControlButtons from "./common/ScrollControlButtons";

const FeatureCardsCarousel = () => {
  const scrollRef = useRef(null);
  const [activeBtn, setActiveBtn] = useState(null);

  const scrollByAmount = (amount, direction) => {
    if (scrollRef.current) {
      setActiveBtn(direction);
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
      setTimeout(() => setActiveBtn(null), 180);
    }
  };

  const iconFilter = (direction) =>
    activeBtn === direction ? 'invert brightness-200' : 'filter-none';

  return (
    <div className="w-full py-8 px-3 sm:px-4 md:px-6 lg:px-10">
      <div className="flex justify-end mb-4">
        <div className="hidden md:flex items-center space-x-2">
          <ScrollControlButtons
           onLeft={() => scrollByAmount(-350)}
           onRight={() => scrollByAmount(350)}
            />
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {featureCards.map((card, idx) => (
          <div key={idx} className="min-w-[320px] max-w-[350px] flex-shrink-0">
            <FeatureCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCardsCarousel;