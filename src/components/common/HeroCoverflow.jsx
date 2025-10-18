import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const defaultImages = [
  '/imgs/banner-1.svg',
  '/imgs/banner-2.svg',
  '/imgs/banner-3.svg',
  '/imgs/banner-4.svg',
  '/imgs/banner-5.svg',
  '/imgs/banner-6.svg',
];

function HeroCoverflow({ images = defaultImages, className = '' }) {
  const [isMobile, setIsMobile] = useState(false);
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
    <div className={className}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        className="w-full"
        loop
        loopAdditionalSlides={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={650}
        spaceBetween={isMobile ? 16 : 24}
        slidesPerView={isMobile ? 1.4 : 1.2}
        breakpoints={{
          640: { 
            slidesPerView: isMobile ? 1.6 : 1.6, 
            spaceBetween: isMobile ? 20 : 28 
          },
          768: { 
            slidesPerView: 2.2, 
            spaceBetween: 32 
          },
          1024: { 
            slidesPerView: 3.2, 
            spaceBetween: 36 
          },
          1280: { 
            slidesPerView: 3.6, 
            spaceBetween: 40 
          },
        }}
        watchSlidesProgress
        onProgress={(swiper, progress) => {
          swiper.slides.forEach((slideEl) => {
            const p = slideEl.progress;
            const abs = Math.abs(p);

            if (isMobile) {
              // Mobile: Fan-like coverflow effect with proper layering
              const scale = 0.75 + Math.min(abs, 1) * 0.35; // Center larger (1.1), sides smaller (0.75)
              const rotateY = p * -30; // More dramatic rotation
              const translateX = p * 100; // More spread
              const translateZ = -abs * 120; // More depth separation
              const rotateZ = p * 6; // More Z rotation for fan effect
              
              // Z-index: center image on top, sides behind
              const zIndex = abs < 0.3 ? 10 : Math.max(1, 10 - Math.floor(abs * 10));
            
              slideEl.style.transform = `
                translate3d(${translateX}px, 0, ${translateZ}px)
                rotateY(${rotateY}deg)
                rotateZ(${rotateZ}deg)
                scale(${scale})
              `;
              slideEl.style.zIndex = zIndex;
            } else {
              // Desktop: Original subtle effect
              const scale = 0.9 + Math.min(abs, 1) * 0.2;
              const rotateY = p * 18;
              const translateX = p * 40;
              const translateZ = -Math.min(abs, 1) * 60;
            
              slideEl.style.transform = `
                translate3d(${translateX}px, 0, ${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
              `;
              slideEl.style.zIndex = '';
            }
            slideEl.style.transition = 'transform 650ms ease';
            slideEl.style.willChange = 'transform';
          });
        }}
        onSetTransition={(swiper, duration) => {
          swiper.slides.forEach((slideEl) => {
            slideEl.style.transitionDuration = `${duration}ms`;
          });
        }}
        pagination={{ clickable: true }}
        navigation
      >
        {slides.map((item, idx) => {
          const slide = typeof item === 'string' ? { src: item } : item;
          const wrapperClass = slide.wrapperClass || 
            (isMobile 
              ? "w-full h-[180px] sm:h-[200px] rounded-3xl overflow-hidden shadow-2xl" 
              : "w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px] xl:h-[420px] rounded-2xl overflow-hidden"
            );
          const imgClass = slide.imgClass || "w-full h-full object-cover";
          
          return (
            <SwiperSlide key={idx}>
              <div className={wrapperClass}>
                <img
                  src={slide.src}
                  alt={`banner-${idx + 1}`}
                  className={imgClass}
                  style={slide.style}
                />
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default HeroCoverflow;