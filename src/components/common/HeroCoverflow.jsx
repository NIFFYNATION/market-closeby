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
  '/imgs/banner-7.svg',
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
        loopedSlides={slides.length}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        speed={800}
        spaceBetween={isMobile ? -30 : 24} // Negative spacing for overlap
        slidesPerView={isMobile ? 1.8 : 1.2} // Show more slides on mobile
        centeredSlides={isMobile}
        breakpoints={{
          640: { 
            slidesPerView: isMobile ? 2.2 : 1.6, 
            spaceBetween: isMobile ? -60 : 28 
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
              // Mobile: Coverflow effect
              let scale, rotateY, translateX, translateZ, zIndex, opacity;
              
              if (abs < 0.1) {
                // Center slide - large, straight, in focus
                scale = 1.0;
                rotateY = 0;
                translateX = 0;
                translateZ = 0;
                zIndex = 20;
                // opacity = 1;
              } else {
                // Side slides - smaller, rotated, stacked behind
                const side = p > 0 ? 1 : -1;
                const distance = Math.min(abs, 1);
                
                // Scale: center is largest, sides get progressively smaller
                scale = 0.7 + (1 - distance) * 0.25; // 0.7 to 0.95
                
                // Rotation: sides are rotated towards center
                rotateY = side * (35 + distance * 15); // 35 to 50 degrees
                
                // Position: spread out horizontally
                translateX = side * (80 + distance * 120); // 80 to 120px
                translateZ = distance * 100; // Push back for depth
                
                // Z-index: closer to center = higher
                zIndex = Math.max(1, 15 - Math.floor(distance * 12));
                
                // Opacity: sides slightly faded
                // opacity = 0.6 + (1 - distance) * 0.3; // 0.6 to 0.9
              }

              slideEl.style.transform = `
                translate3d(${translateX}px, 0, ${translateZ}px)
                rotateY(${rotateY}deg)
                scale(${scale})
              `;
              slideEl.style.zIndex = zIndex;
              slideEl.style.opacity = opacity;
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
              slideEl.style.opacity = '';
            }
            
            slideEl.style.transition = 'transform 800ms ease, opacity 800ms ease';
            slideEl.style.willChange = 'transform, opacity';
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
              ? "w-full h-[200px] sm:h-[220px] rounded-2xl overflow-hidden shadow-2xl" 
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