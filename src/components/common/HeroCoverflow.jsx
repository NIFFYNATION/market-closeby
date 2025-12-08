import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';


const defaultImages = [
  '/imgs/hero/banner1.jpg',
  '/imgs/hero/banner2.jpg',
  '/imgs/hero/banner3.jpg',
  '/imgs/hero/banner4.jpg',
];

function HeroCoverflow({ images = defaultImages, className = '', onImageChange }) {
  const [isMobile, setIsMobile] = useState(false);
  const [loadingStates, setLoadingStates] = useState({}); // per-slide loading state
  const slides = images.filter(Boolean);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={`${className} flex justify-center w-full`}>
      <Swiper
        modules={[Autoplay]}
        className="w-full max-w-6xl"
        loop
        loopedSlides={slides.length}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1000}
        spaceBetween={isMobile ? -10 : 24}
        slidesPerView={isMobile ? 1.15 : 1.2}
        centeredSlides={true}
        breakpoints={{
          640: { 
            slidesPerView: 1.15, 
            spaceBetween: -10 
          },
          768: { 
            slidesPerView: 2.1, 
            spaceBetween: 28 
          },
          1024: { 
            slidesPerView: 2.4, 
            spaceBetween: 32 
          },
          1280: { 
            slidesPerView: 2.8, 
            spaceBetween: 36 
          },
        }}
        watchSlidesProgress
        onSlideChange={(swiper) => {
          // Call callback when slide actually changes for real-time accuracy
          if (onImageChange) {
            onImageChange(swiper.realIndex);
          }
        }}
        onProgress={(swiper, progress) => {
          swiper.slides.forEach((slideEl) => {
            const p = slideEl.progress;
            const abs = Math.abs(p);

            if (isMobile) {
              // Mobile: Coverflow effect
              let scale, rotateY, translateX, translateZ, zIndex, opacity;
              
              if (abs < 0.1) {
                // Center slide - large, straight, in focus
                scale = 1.0;
                rotateY = 0;
                translateX = 0;
                translateZ = 0;
                zIndex = 20;
                opacity = 1;
              } else {
                // Side slides - smaller, rotated, stacked behind
                const side = p > 0 ? 1 : -1;
                const distance = Math.min(abs, 1);
                
                // increase images behind size range
                // 0.75 to 0.95 roughly
                scale = 0.75 + (1 - distance) * 0.2;
                
                // Rotation: sides are rotated towards center
                rotateY = side * (25 + distance * 10); // 25 to 35 degrees
                
                // Position: spread out horizontally
                translateX = side * (40 + distance * 80); // smaller offsets for mobile
                translateZ = distance * 60; // Push back for depth
                
                // Z-index: closer to center = higher
                zIndex = Math.max(1, 15 - Math.floor(distance * 12));
                
                // Opacity: sides slightly faded
                opacity = 0.6 + (1 - distance) * 0.35; // 0.6 to ~0.95
              }

              slideEl.style.transform = `
                translate3d(${translateX}px, 0, ${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
              `;
              slideEl.style.zIndex = zIndex;
              slideEl.style.opacity = opacity;
              
              // Enhance side-slide appearance with subtle backdrop
              if (abs > 0.1) {
                slideEl.style.filter = 'brightness(0.85) saturate(0.9)';
              } else {
                slideEl.style.filter = 'brightness(1) saturate(1)';
              }
            } else {
              // Desktop: Improved subtle effect with better 3D
              const scale = 0.88 + Math.min(abs, 1) * 0.25;
              const rotateY = p * 20;
              const translateX = p * 50;
              const translateZ = -Math.min(abs, 1) * 80;
            
              slideEl.style.transform = `
                translate3d(${translateX}px, 0, ${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
              `;
              slideEl.style.opacity = 0.7 + Math.max(0, 1 - Math.abs(p)) * 0.3;
              slideEl.style.filter = Math.abs(p) > 0.1 ? 'brightness(0.9) saturate(0.95)' : 'brightness(1) saturate(1)';
              slideEl.style.zIndex = '';
            }
            
            slideEl.style.transition = 'transform 1000ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 1000ms ease-out, filter 1000ms ease';
            slideEl.style.willChange = 'transform, opacity, filter';
          });
        }}
        onSetTransition={(swiper, duration) => {
          swiper.slides.forEach((slideEl) => {
            slideEl.style.transitionDuration = `${Math.max(duration, 1000)}ms`;
          });
        }}
        
      >
        {slides.map((item, idx) => {
          const slide = typeof item === 'string' ? { src: item } : item;
          
          // Enhanced wrapper: width-constrained on mobile with taller aspect, rounded, shadowed
          const wrapperClass = slide.wrapperClass || (
            isMobile
              ? "w-[70vw] max-w-xs h-[380px] sm:h-[420px] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 relative bg-gradient-to-br from-gray-50 to-gray-100"
              : "w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[380px] xl:h-[420px] rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 relative bg-gradient-to-br from-gray-50 to-gray-100"
          );

          // Image class: use object-cover centered to fill container properly
          const imgClass = slide.imgClass || "w-full h-full object-cover object-center";
          
          const isLoading = loadingStates[idx] === false;
          const isLoaded = loadingStates[idx] === true;

          const handleLoad = () => {
            setLoadingStates((prev) => ({ ...prev, [idx]: true }));
          };

          const handleError = () => {
            setLoadingStates((prev) => ({ ...prev, [idx]: 'error' }));
          };

          return (
            <SwiperSlide key={idx} className="flex items-center justify-center">
              <div className={wrapperClass}>
                {/* Enhanced loading placeholder with skeleton animation */}
                {!isLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 overflow-hidden z-10">
                    {/* Animated skeleton bars */}
                    <div className="w-full h-full space-y-4 p-4 flex flex-col justify-center">
                      <div className="h-8 bg-gray-300 rounded-lg animate-pulse"></div>
                      <div className="h-6 bg-gray-300 rounded-lg animate-pulse w-5/6"></div>
                      <div className="h-6 bg-gray-300 rounded-lg animate-pulse w-4/6"></div>
                    </div>
                    {/* Loading text indicator */}
                    <div className="absolute bottom-4 text-xs font-medium text-gray-500 animate-pulse">
                      Loading...
                    </div>
                  </div>
                )}

                {/* Image with fade-in transition */}
                <img
                  src={slide.src}
                  alt={slide.alt || `banner-${idx + 1}`}
                  className={`${imgClass} ${
                    isLoaded
                      ? 'opacity-100'
                      : 'opacity-0'
                  } transition-opacity duration-700 ease-in-out`}
                  style={{
                    ...slide.style,
                    backfaceVisibility: 'hidden',
                    perspective: '1000px',
                  }}
                  loading="lazy"
                  decoding="async"
                  onLoad={handleLoad}
                  onError={handleError}
                />

                {/* Subtle overlay on load for depth */}
                {isLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none"></div>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default HeroCoverflow;