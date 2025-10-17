import React from 'react'
import CategoryBrowser from '../components/common/CategoryBrowser'

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
        {/* <div class=" w-full h-full ">
  <svg width="100%" height="10px" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg">
    <path d="M 0,500 L 0,187 C 160.53333333333336,161.53333333333333 321.0666666666667,136.06666666666666 485,121 C 648.9333333333333,105.93333333333332 816.2666666666667,101.26666666666667 976,114 C 1135.7333333333333,126.73333333333333 1287.8666666666668,156.86666666666667 1440,187 L 1440,500 L 0,500 Z"
    fill="#abb8c3" transform="rotate(-180 720 250)"></path>
  </svg>
</div> */}



        {/* Banner */}
            <div className="relative overflow-hidden">
              <div className="absolute h-10 w-full rounded-b-[600px] bg-blue-500 top-0 left-0 ">
   
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
  </svg>


              <div className="flex z-1 b  space-x-4 overflow-x-auto pb-4 scrollbar-hide">
                <img src="/imgs/homepage-heroBanner.svg" alt="Market Closeby" className="w-full h-auto rounded-lg" />
              </div>

              <div className="absolute top-0 left-0 w-full h-full">
              </div>
             
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