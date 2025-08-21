import React, { useState, useEffect } from "react";
import { Button } from "../components/common/Button";

function SellerLandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonialSlide, setCurrentTestimonialSlide] = useState(0);

  const sellerImages = [
    {
      src: "/imgs/seller-1.svg",
      alt: "Seller with braids on phone",
    },
    {
      src: "/imgs/seller-2.svg",
      alt: "Woman at desk with packages",
    },
    {
      src: "/imgs/seller-3.svg",
      alt: "Man on phone with shopping bags",
    },
    {
      src: "/imgs/seller-4.svg",
      alt: "Person in workshop",
    },
    {
      src: "/imgs/seller-5.svg",
      alt: "Woman with shopping bag",
    },
  ];

  const testimonials = [
    {
      name: "Daniel",
      username: "@dvdwinden",
      text: "Joining this platform doubled my monthly orders. The dashboard is easy to use, and my payouts are always on time",
    },
    {
      name: "Sarah",
      username: "@sarahbiz",
      text: "Amazing support team and seamless integration. My sales increased by 150% within the first month!",
    },
    {
      name: "Michael",
      username: "@mikesells",
      text: "The analytics dashboard gives me insights I never had before. Perfect for scaling my business.",
    },
    {
      name: "Aisha",
      username: "@aishastore",
      text: "Zero setup fees and instant payments made switching to this platform a no-brainer.",
    },
    {
      name: "James",
      username: "@jamestech",
      text: "Customer support is outstanding. They helped me optimize my store for better conversions.",
    },
    {
      name: "Fatima",
      username: "@fatimacraft",
      text: "The integrated shipping feature saved me hours of work every week. Highly recommended!",
    }
  ];

  // Auto-slide functionality for seller images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sellerImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [sellerImages.length]);

  // Auto-slide functionality for testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonialSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sellerImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sellerImages.length) % sellerImages.length
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Testimonial carousel controls
  const nextTestimonial = () => {
    setCurrentTestimonialSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonialSlide(index);
  };

  // Calculate how many testimonials to show per slide based on screen size
  const getTestimonialsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1024) return 3; // lg screens
      if (window.innerWidth >= 768) return 2;  // md screens
      return 1; // mobile
    }
    return 3;
  };

  const [testimonialsPerSlide, setTestimonialsPerSlide] = useState(getTestimonialsPerSlide());

  useEffect(() => {
    const handleResize = () => {
      setTestimonialsPerSlide(getTestimonialsPerSlide());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 bg-background">
      {/* Hero Section */}
      <section className="py-8 sm:py-12 lg:py-16 md:mt-40">
        <div className="w-full mx-auto text-center">
          <div className="pt-16 sm:pt-24 md:pt-[170px] lg:pt-[250px] md:bg-[url('/imgs/arc.svg')] bg-cover">
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-2">
              Launch Your Online Store in
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>Minutes
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 leading-relaxed">
              Join the fastest-growing seller marketplace with built-in tools for
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>visibility, payment, and logistics
            </p>

            {/* CTA Button */}
            <Button variant="secondary" className="mb-8 sm:mb-10 w-full sm:w-auto px-8 py-3 text-base sm:text-lg">
              Start selling now
            </Button>
          </div>

          {/* Seller Images Carousel */}
          <div className="relative mx-auto mt-8 sm:mt-12">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {sellerImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-4 px-2 sm:px-4">
                      {sellerImages.map((img, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="rounded-xl sm:rounded-2xl overflow-hidden shadow-sm my-4 sm:my-8"
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-32 sm:h-48 md:h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows - Hidden on mobile for better UX */}
            <button
              onClick={prevSlide}
              className="hidden sm:block absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-background rounded-full p-2 shadow-lg transition-all duration-200 z-10"
            >
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="hidden sm:block absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background rounded-full p-2 shadow-lg transition-all duration-200 z-10"
            >
              <svg
                className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-4 sm:mt-6 space-x-2">
              {sellerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index ? "bg-orange-400" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Benefits */}
            <div className="order-2 lg:order-1">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                Key Benefits
              </h2>
              <p className="text-gray-600 mb-6 sm:mb-8 text-base sm:text-lg">
                Built to make selling simple, profitable, and stress-free
              </p>

              {/* Benefits List */}
              <div className="space-y-3 sm:space-y-4 text-gray-600">
                {/* Zero Setup Fees */}
                <div className="flex items-start">
                  <div className="w-full sm:w-2/3 lg:w-1/2 hover:bg-secondary hover:text-background px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 cursor-pointer">
                    Zero Setup Fees
                  </div>
                </div>

                {/* Integrated Shipping */}
                <div className="flex items-start">
                  <div className="w-full sm:w-2/3 lg:w-1/2 hover:bg-secondary hover:text-background px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 cursor-pointer">
                    Integrated Shipping
                  </div>
                </div>

                {/* Secure Payments */}
                <div className="flex items-start">
                  <div className="w-full sm:w-2/3 lg:w-1/2 hover:bg-secondary hover:text-background px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 cursor-pointer">
                    Secure Payments
                  </div>
                </div>

                {/* Analytics Dashboard */}
                <div className="flex items-start">
                  <div className="w-full sm:w-2/3 lg:w-1/2 hover:bg-secondary hover:text-background px-3 sm:px-4 py-2 sm:py-3 rounded-lg font-semibold text-base sm:text-lg transition-all duration-200 cursor-pointer">
                    Analytics Dashboard
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image and Description */}
            <div className="relative order-1 lg:order-2">
              <div className="rounded-xl sm:rounded-2xl p-4 sm:p-6 bg-[#F5F6FA] overflow-hidden shadow-lg">
                <img
                  src="/imgs/seller-benefits.svg"
                  alt="Woman in store with products"
                  className="w-full object-cover"
                />
                {/* Description Text */}
                <div className="mt-4 sm:mt-6">
                  <p className="text-text-primary font-semibold text-base sm:text-lg leading-relaxed">
                    Start selling instantly with no upfront costs or technical
                    setup; just sign up and go.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            How it works
          </h2>
          <p className="text-gray-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4 text-base sm:text-lg leading-relaxed">
            Getting started is easier than you think. We've simplified every
            step so you can focus on what matters most: selling your products
            and growing your brand
          </p>

          {/* Steps - Mobile Optimized */}
          <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 mx-auto">
            {/* Step 1 */}
            <div className="group sm:col-span-1 lg:col-span-1">
              <div className="p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-background sm:bg-transparent rounded-xl sm:rounded-none">
                <div className="flex items-center justify-center mb-4">
                  <img src="./icons/create-your-store.svg" alt="Create store icon" className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Create your store
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">Add products, images, prices.</p>
              </div>
            </div>

            {/* Arrow 1 - Hidden on mobile */}
            <div className="hidden lg:flex items-center justify-center">
              <img src="./icons/curve-arrow-up.svg" alt="Arrow" className="" />
            </div>

            {/* Step 2 */}
            <div className="group sm:col-span-1 lg:col-span-1">
              <div className="p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-background sm:bg-transparent rounded-xl sm:rounded-none">
                <div className="flex items-center justify-center mb-4">
                  <img src="./icons/start-selling.svg" alt="Start selling icon" className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Start selling
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Promote, receive orders, chat with buyers.
                </p>
              </div>
            </div>

            {/* Arrow 2 - Hidden on mobile */}
            <div className="hidden lg:flex items-center justify-center">
              <img src="./icons/curve-arrow-down.svg" alt="Arrow" className="" />
            </div>

            {/* Step 3 */}
            <div className="group sm:col-span-1 lg:col-span-1">
              <div className="p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-background sm:bg-transparent rounded-xl sm:rounded-none">
                <div className="flex items-center justify-center mb-4">
                  <img src="./icons/get-paid.svg" alt="Get paid icon" className="w-12 h-12 sm:w-16 sm:h-16" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
                  Get paid
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">Fast payouts, clear dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sellers Who Trusted Us Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Sellers Who Trusted Us, Grew With Us
          </h2>
          <p className="text-gray-600 mb-8 sm:mb-12 px-4 text-base sm:text-lg">
            Trusted by thousands of sellers across Nigeria and growing fast
          </p>

          {/* Testimonials Grid - Mobile Optimized */}
          <div className="mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Testimonial Cards */}
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-[#F5F6FA] rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-background font-bold text-sm sm:text-lg flex-shrink-0`}>
                      <img src="./icons/testimonial-icon.svg" alt="Testimonial" className="" />
                    </div>
                    <div className="ml-3 text-left min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm sm:text-base truncate">{testimonial.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{testimonial.username}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-left leading-relaxed text-sm sm:text-base">
                    {testimonial.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-8 sm:mt-12">
            <Button variant="secondary" className="w-full sm:w-auto px-6 sm:px-8 py-3 text-base sm:text-lg">
              Start selling now
            </Button>
          </div>
        </div>

        {/* Final CTA Section */}
        <div className="mt-8 sm:mt-16 lg:mt-24 py-12 sm:py-16 lg:py-[170px] text-center bg-[url('/imgs/passion-profit.svg')] bg-center bg-cover rounded-xl sm:rounded-2xl mx-4 sm:mx-0">
          {/* Main Heading */}
          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl max-w-3xl mx-auto font-bold text-background mb-4 sm:mb-6 leading-tight px-4">
            Turn Your Passion Into Profit. Start Selling Today.
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-background mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            Sell online without the stress
          </p>

          {/* CTA Button */}
          <Button variant="secondary" >
            Join the Marketplace
          </Button>
        </div>
      </section>
    </div>
  );
}

export default SellerLandingPage;