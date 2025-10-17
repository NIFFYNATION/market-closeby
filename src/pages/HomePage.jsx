import React from 'react'
import CategoryBrowser from '../components/common/CategoryBrowser'
import './HomePage.css'
 

function HomePage() {
  return (
    <div className='w-full pt-[210px] md:pt-[250px]'>
      {/* Hero Section */}
      <div className="bg- py-8 px-4 md:px-6 lg:px-10 ">
        <div className="container mx-auto">
            {/* Title */}
            <div className="text-center">
             <div className='relative'>
               <div className="absolute bottom-2 left-2 md:left-32 lg:left-80">
                 <h2 className="bg-[#FF8A24] px-4 py-0 md:px-8 md:py-2 rounded-md text-sm text-white transform rotate-16 md:rotate-8">
                    Trusted Sellers
                  </h2>
                
              </div>
             </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium mb-2 md:mb-4">
                Buy & Sell with Ease
              </h1>
              <div className="relative">
                <h2 className="text-4xl md:text-4xl lg:text-7xl font-bold mb-6 leading-snug md:leading-none">
                  Fast, Secure, & Nearby!
                </h2>
                <div className="absolute -top-3 md:-top-7 right-0 md:right-32 lg:right-110 xl:right-70">
                  <h2 className="bg-[#3EC8FF] px-4 py-0 md:px-8 md:py-2 rounded-md text-sm text-white transform -rotate-12">
                    Great Deals
                  </h2>
                </div>
              </div>
              <button className="bg-secondary hover:bg-secondary-light text-white px-6 py-3 my-4 md:my-16  rounded-full font-medium transition-colors duration-300">
                Sell on Market Closeby
              </button>
            </div>
        </div>







        {/* Banner */}
            <div className="relative overflow-hidden">
              {/* <div className="absolute h-15 w-full rounded-b-[3000px] bg-blue-500 top- left-0 ">
              </div>
  <svg
    class="absolute -top-0 left-0 w-full   "
    viewBox="0 0 1440 320"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffff00"
      d="M0,224 C180,350 960,350 1440,224 L1440,320 L0,320 Z"
    />
  </svg> */}


              <div className='curve top_curve'></div>

              <div className=" flex z-1 b  space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                <img src="/imgs/banner-1.svg" alt="Market Closeby" className="w-full h- rounded-lg" />
                <img src="/imgs/banner-2.svg" alt="Market Closeby" className="w-full h- rounded-lg" />
                <img src="/imgs/banner-3.svg" alt="Market Closeby" className="w-full h- rounded-lg" />
                <img src="/imgs/banner-4.svg" alt="Market Closeby" className="w-full h- rounded-lg" />
                <img src="/imgs/banner-5.svg" alt="Market Closeby" className="w-full h- rounded-lg" />
                <img src="/imgs/banner-6.svg" alt="Market Closeby" className="w-full h- rounded-lg" />
              </div>


              <div className='curve bottom_curve'></div>

             
            </div>
      </div>
      
      {/* Category Browser Section */}
      <CategoryBrowser />
      
      {/* Additional content */}
      <div className='container mx-auto py-8 px-4'>
        {/* Your existing content */}
      </div>
    </div>
  )
}

export default HomePage