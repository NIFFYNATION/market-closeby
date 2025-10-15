import React from 'react'
import CategoryBrowser from '../components/common/CategoryBrowser'
import TrendingProducts from '../components/TrendingProducts'

function HomePage() {
  return (
    <div className='w-full pt-[210px] md:pt-[250px]'>
      {/* Hero Section */}
      <div className="bg- py-8 px-4 md:px-6 lg:px-10 ">
        <div className="container mx-auto ">
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
            <div className=" overflow-hidden">
              <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                <img src="/imgs/homepage-heroBanner.svg" alt="Market Closeby" className="w-full h-auto rounded-lg" />
              </div>
            </div>
      </div>
      
      {/* Category Browser Section */}
      <CategoryBrowser />
      
      {/* Trending Products Section */}
      <TrendingProducts />
      
      {/* Additional content */}
      <div className='container mx-auto py-8 px-4'>
        {/* Your existing content */}
      </div>
    </div>
  )
}

export default HomePage