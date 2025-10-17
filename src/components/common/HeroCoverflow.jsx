import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Reusable: pass any image list you want
const defaultImages = [
  '/imgs/banner-1.svg',
  '/imgs/banner-2.svg',
  '/imgs/banner-3.svg',
  '/imgs/banner-4.svg',
  '/imgs/banner-5.svg',
  '/imgs/banner-6.svg',
];

function HeroCoverflow({ images = defaultImages, className = '' }) {
  // Make sure list is unique and valid
  const slides = images.filter(Boolean);

  return (
    <div className={className}>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        className="w-full"
        loop
        loopAdditionalSlides={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={650}
        spaceBetween={24}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 1.6, spaceBetween: 28 },
          768: { slidesPerView: 2.2, spaceBetween: 32 },
          1024: { slidesPerView: 3.2, spaceBetween: 36 },
          1280: { slidesPerView: 3.6, spaceBetween: 40 },
        }}
        watchSlidesProgress
        onProgress={(swiper, progress) => {
          // custom 3D coverflow effect:
          // - center is slightly smaller (scale ~0.9)
          // - sides are slightly larger (scale up to ~1.1)
          swiper.slides.forEach((slideEl) => {
            const p = slideEl.progress; // -2..2
            const abs = Math.abs(p);

            // Scale: invert the usual coverflow (center smaller)
            // abs 0 -> 0.9, abs 1 -> 1.1, clamp for >1
            const scale = 0.9 + Math.min(abs, 1) * 0.2;

            // Rotate and translate for subtle 3D feel
            const rotate = p * 18; // deg
            const translateX = p * 40; // px
            const z = -Math.min(abs, 1) * 60; // push slightly back

            slideEl.style.transform = `
              translate3d(${translateX}px, 0, ${z}px)
              rotateY(${rotate}deg)
              scale(${scale})
            `;
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
  const wrapperClass = slide.wrapperClass || "w-full h-[220px] sm:h-[260px] md:h-[320px] lg:h-[360px] xl:h-[420px]";
  const imgClass = slide.imgClass || "w-full h-full object-cover";
  return (
    <SwiperSlide key={idx}>
      <div className={`${wrapperClass} rounded-2xl overflow-hidden`}>
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