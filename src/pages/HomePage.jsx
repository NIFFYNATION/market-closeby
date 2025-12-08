import React, { useState } from "react";
import CategoryBrowser from "../components/common/CategoryBrowser";
import TrendingProducts from "../components/TrendingProducts";
import "./HomePage.css";
import HeroCoverflow from "../components/common/HeroCoverflow";
import { Link } from "react-router-dom";

const heroImages = [
  '/imgs/hero/banner1.jpg',
  '/imgs/hero/banner2.jpg',
  '/imgs/hero/banner3.jpg',
  '/imgs/hero/banner4.jpg',
];

function HomePage() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleImageChange = (index) => {
    // Ensure the index loops within the heroImages length
    const loopedIndex = index % heroImages.length;
    setActiveImageIndex(loopedIndex);
  };

  return (
   <div className="w-full">
      {/* Hero Section */}
      <div 
        className="herosection pt-[130px] md:pt-[250px] relative overflow-hidden"
        style={{
          backgroundImage: window.innerWidth < 768 ? `url(${heroImages[activeImageIndex]})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          transition: 'background-image 1000ms ease-in-out',
        }}
      >
        {/* Blurred overlay background - Heavy blur effect (mobile only) */}
        <div 
          className="md:hidden absolute inset-0"
          style={{
            backgroundImage: `url(${heroImages[activeImageIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(120px) brightness(0.3)',
            opacity: 0.8,
            zIndex: 0,
            transition: 'all 1000ms ease-in-out',
          }}
        ></div>

        {/* Dark overlay for more contrast and readability (mobile only) */}
        <div 
          className="md:hidden absolute inset-0 bg-white/60"
          style={{
            zIndex: 1,
            transition: 'background-color 1000ms ease-in-out',
          }}
        ></div>

        {/* Content wrapper */}
        <div className="relative z-10 bg- py-4 px-2 md:px-6 lg:px-10">
          <div className="container mx-auto">
            {/* Title */}
            <div className="text-center">
              <div className="relative">
                <div className="absolute bottom-2 left-2 md:left-32 lg:left-80">
                  <h2 className="bg-[#FF8A24] px-4 py-0 md:px-8 md:py-2 rounded-md text-sm text-white transform rotate-16 md:rotate-8">
                    Trusted Sellers
                  </h2>
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium mb-2 md:mb-4">
                Buy & Sell with Ease
              </h1>
              <div className="relative">
                <h2 className="text-3xl md:text-4xl lg:text-7xl font-bold mb-6 leading-snug md:leading-none">
                  Fast, Secure, & Nearby!
                </h2>
                <div className="absolute -top-3 md:-top-7 right-0 md:right-32 lg:right-110 xl:right-70">
                  <h2 className="bg-[#3EC8FF] px-4 py-0 md:px-8 md:py-2 rounded-md text-sm text-white transform -rotate-12">
                    Great Deals
                  </h2>
                </div>
              </div>
              <Link to="/signin" className="bg-secondary hover:bg-secondary-light text-white px-4 py-2 my-4 md:my-16 rounded-full font-medium transition-colors duration-300">
                Sell on Market Closeby
              </Link>
            </div>
          </div>

          {/* Banner */}
          <div className="relative overflow-hidden">
            {/* Desktop curves */}
            <div className="hidden md:block curve top_curve"></div>

            {/* Responsive Coverflow */}
            <HeroCoverflow
              className="px-2 py-4 md:py-4 md:px-6 lg:px-10"
              images={heroImages}
              onImageChange={handleImageChange}
            />

            <div className="hidden md:block curve bottom_curve"></div>
          </div>
        </div>
      </div>
      

      {/* Category Browser Section */}
      <CategoryBrowser />

      {/* Additional content */}
      <div className="w-full mx-auto py-4 px-2">
        <TrendingProducts />
      </div>
    </div>
  );
}

export default HomePage;
