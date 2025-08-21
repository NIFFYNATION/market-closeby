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
      bgColor: "bg-[#FF6F61]"
    },
    {
      name: "Sarah",
      username: "@sarahbiz",
      text: "Amazing support team and seamless integration. My sales increased by 150% within the first month!",
      bgColor: "bg-[#4ECDC4]"
    },
    {
      name: "Michael",
      username: "@mikesells",
      text: "The analytics dashboard gives me insights I never had before. Perfect for scaling my business.",
      bgColor: "bg-[#45B7D1]"
    },
    {
      name: "Aisha",
      username: "@aishastore",
      text: "Zero setup fees and instant payments made switching to this platform a no-brainer.",
      bgColor: "bg-[#96CEB4]"
    },
    {
      name: "James",
      username: "@jamestech",
      text: "Customer support is outstanding. They helped me optimize my store for better conversions.",
      bgColor: "bg-[#FFEAA7]"
    },
    {
      name: "Fatima",
      username: "@fatimacraft",
      text: "The integrated shipping feature saved me hours of work every week. Highly recommended!",
      bgColor: "bg-[#DDA0DD]"
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
    <div className="min-h-screen px-6 bg-background">
      {/* Hero Section */}
      <section className="py-16">
        <div className="w-full mx-auto text-center">
          <div className="md:mt-35 pt-[170px] md:pt-[250px] md:bg-[url('/imgs/arc.svg')] bg-cover">
            {/* Main Heading */}
            <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Launch Your Online Store in
              <br />
              Minutes
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join the fastest-growing seller marketplace with built-in tools
              for
              <br />
              visibility, payment, and logistics
            </p>

            {/* CTA Button */}
            <Button variant="secondary" className="mb-10">
              Start selling now
            </Button>
          </div>

          {/* Seller Images Carousel */}
          <div className="relative mx-auto">
            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-2xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {sellerImages.map((image, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 px-4">
                      {sellerImages.map((img, imgIndex) => (
                        <div
                          key={imgIndex}
                          className="rounded-2xl overflow-hidden shadow-sm my-8"
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <svg
                className="w-6 h-6 text-gray-600"
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
            <div className="flex justify-center mt-6 space-x-2">
              {sellerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    currentSlide === index ? "bg-orange-400" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section className="py-16">
        <div className=" mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-">
            {/* Left Side - Benefits */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Key Benefits
              </h2>
              <p className="text-gray-600 mb-8">
                Built to make selling simple, profitable, and stress-free
              </p>

              {/* Benefits List */}
              <div className="space-y-6 text-gray-600">
                {/* Zero Setup Fees */}
                <div className="flex items-start ">
                  <div className="w-1/3 hover:bg-secondary hover:text-white px-4 py-2 rounded-lg font-semibold text-lg  flex-shrink-0">
                    Zero Setup Fees
                  </div>
                </div>

                {/* Integrated Shipping */}
                <div className="flex items-start">
                  <div className="w-1/3 hover:bg-secondary hover:text-white px-4 py-2 rounded-lg font-semibold text-lg  flex-shrink-0">
                    Integrated Shipping
                  </div>
                </div>

                {/* Secure Payments */}
                <div className="flex items-start">
                  <div className="w-1/3 hover:bg-secondary hover:text-white px-4 py-2 rounded-lg font-semibold text-lg  flex-shrink-0">
                    Secure Payments
                  </div>
                </div>

                {/* Analytics Dashboard */}
                <div className="flex items-start">
                  <div className="w-1/3 hover:bg-secondary hover:text-white px-4 py-2 rounded-lg font-semibold text-lg  flex-shrink-0">
                    Analytics Dashboard
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Image and Description */}
            <div className="relative">
              <div className="rounded-2xl p-6 bg-[#F5F6FA] overflow-hidden shadow-lg">
                <img
                  src="/imgs/seller-benefits.svg"
                  alt="Woman in store with products"
                  className="w-full  object-cover"
                />
                {/* Description Text */}
                <div className="mt-6">
                  <p className="text-text-primary font-semibold text-lg leading-relaxed">
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
      <section className="py-16 bg-gray-50">
        <div className="mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
            Getting started is easier than you think. We've simplified every
            step so you can focus on what matters most: selling your products
            and growing your brand
          </p>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-h mx-auto">
            {/* Step 1 */}
            <div className=" group">
              <div className="p-8   hover:shadow-xs transition-all duration-300 transform hover:-translate-y-2">
                <div className=" flex items-center justify-center ">
                  <img src="./icons/create-your-store.svg" alt="" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Create your store
                </h3>
                <p className="text-gray-600">Add products, images, prices.</p>
              </div>
            </div>

            <div className=" flex items-center justify-center ">
              <img src="./icons/curve-arrow-up.svg" alt="" />
            </div>

            {/* Step 2 */}
            <div className=" group">
              <div className=" p-8   hover:shadow-xs transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-center">
                  <img src="./icons/start-selling.svg" alt="" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Start selling
                </h3>
                <p className="text-gray-600">
                  Promote, receive orders, chat with buyers.
                </p>
              </div>
            </div>

            <div className=" flex items-center justify-center ">
              <img src="./icons/curve-arrow-down.svg" alt="" />
            </div>

            {/* Step 3 */}
            <div className="group">
              <div className="p-8   hover:shadow-xs transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-center justify-center">
                  <img src="./icons/get-paid.svg" alt="" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Get paid
                </h3>
                <p className="text-gray-600">Fast payouts, clear dashboard.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sellers Who Trusted Us Section */}
      <section className="py-16">
        <div className="mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Sellers Who Trusted Us, Grew With Us
          </h2>
          <p className="text-gray-600 mb-12">
            Trusted by thousands of sellers across Nigeria and growing fast
          </p>

          {/* Testimonials Grid - Static Layout as per UI */}
          <div className=" mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Row 1 */}
              <div className="bg-[#F5F6FA] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#FF6F61] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <img src="./icons/testimonial-icon.svg" alt="" className="w-6 h-6" />
                  </div>
                  <div className="ml-3 text-left">
                    <h4 className="font-bold text-gray-900">Daniel</h4>
                    <p className="text-sm text-gray-500">@dvdwinden</p>
                  </div>
                </div>
                <p className="text-gray-600 text-left leading-relaxed">
                  Joining this platform doubled my monthly orders. The dashboard is easy to use, and my payouts are always on time
                </p>
              </div>

              <div className="bg-[#F5F6FA] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#FF6F61] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <img src="./icons/testimonial-icon.svg" alt="" className="w-6 h-6" />
                  </div>
                  <div className="ml-3 text-left">
                    <h4 className="font-bold text-gray-900">Daniel</h4>
                    <p className="text-sm text-gray-500">@dvdwinden</p>
                  </div>
                </div>
                <p className="text-gray-600 text-left leading-relaxed">
                  Joining this platform doubled my monthly orders. The dashboard is easy to use, and my payouts are always on time
                </p>
              </div>

              <div className="bg-[#F5F6FA] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#FF6F61] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <img src="./icons/testimonial-icon.svg" alt="" className="w-6 h-6" />
                  </div>
                  <div className="ml-3 text-left">
                    <h4 className="font-bold text-gray-900">Daniel</h4>
                    <p className="text-sm text-gray-500">@dvdwinden</p>
                  </div>
                </div>
                <p className="text-gray-600 text-left leading-relaxed">
                  Joining this platform doubled my monthly orders. The dashboard is easy to use, and my payouts are always on time
                </p>
              </div>

              {/* Row 2 */}
              <div className="bg-[#F5F6FA] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#FF6F61] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <img src="./icons/testimonial-icon.svg" alt="" className="w-6 h-6" />
                  </div>
                  <div className="ml-3 text-left">
                    <h4 className="font-bold text-gray-900">Daniel</h4>
                    <p className="text-sm text-gray-500">@dvdwinden</p>
                  </div>
                </div>
                <p className="text-gray-600 text-left leading-relaxed">
                  Joining this platform doubled my monthly orders. The dashboard is easy to use, and my payouts are always on time
                </p>
              </div>

              <div className="bg-[#F5F6FA] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#FF6F61] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <img src="./icons/testimonial-icon.svg" alt="" className="w-6 h-6" />
                  </div>
                  <div className="ml-3 text-left">
                    <h4 className="font-bold text-gray-900">Daniel</h4>
                    <p className="text-sm text-gray-500">@dvdwinden</p>
                  </div>
                </div>
                <p className="text-gray-600 text-left leading-relaxed">
                  Joining this platform doubled my monthly orders. The dashboard is easy to use, and my payouts are always on time
                </p>
              </div>

              <div className="bg-[#F5F6FA] rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-[#FF6F61] rounded-full flex items-center justify-center text-white font-bold text-lg">
                    <img src="./icons/testimonial-icon.svg" alt="" className="w-6 h-6" />
                  </div>
                  <div className="ml-3 text-left">
                    <h4 className="font-bold text-gray-900">Daniel</h4>
                    <p className="text-sm text-gray-500">@dvdwinden</p>
                  </div>
                </div>
                <p className="text-gray-600 text-left leading-relaxed">
                  Joining this platform doubled my monthly orders. The dashboard is easy to use, and my payouts are always on time
                </p>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="mt-12">
            <Button variant="secondary" className="px-8 py-3">
              Start selling now
            </Button>
          </div>
        </div>

        <div className="md:mt-35 py-8 mt-8  md:py-[170px] text-center items-center  bg-[url('/imgs/passion-profit.svg')] bg-center bg-cover">
            {/* Main Heading */}
            <h1 className="text-2xl md:text-5xl lg:text-6xl max-w-3xl mx-auto font-bold text-background mb-6 leading-tight">
             Turn Your Passion Into Profit. Start Selling Today.
             
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-background mb-8 max-w-2xl mx-auto">
              Sell online without the stress
            </p>

            {/* CTA Button */}
            <Button variant="secondary" className="mb-10">
              Join the Marketplace
            </Button>
          </div>
      </section>
    </div>
  );
}

export default SellerLandingPage;