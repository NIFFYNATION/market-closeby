import React from 'react';
import { Button } from '../components/common/Button';


function SellerLandingPage() {
  return (
    <div className=" min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className=" py-16 px-4">
        <div className="w-full mx-auto text-center">
      <div className="md:mt-35 pt-[170px] md:pt-[250px] md:bg-[url('/imgs/arc.svg')] bg-cover ">
            {/* Main Heading */}
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Launch Your Online Store in
            <br />
            Minutes
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join the fastest-growing seller marketplace with built-in tools for
            <br />
            visibility, payment, and logistics
          </p>
          
          {/* CTA Button */}
          <Button variant='secondary' className='mb-10' >
            Start selling now
          </Button>
      </div>
          
          {/* Seller Images Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto">
            {/* Image 1 - Woman with braids on phone */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/seller-1.jpg" 
                alt="Seller with braids on phone" 
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
            
            {/* Image 2 - Woman at desk with packages */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/seller-2.jpg" 
                alt="Woman at desk with packages" 
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
            
            {/* Image 3 - Man on phone with shopping bags */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/seller-3.jpg" 
                alt="Man on phone with shopping bags" 
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
            
            {/* Image 4 - Person in workshop/store */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/seller-4.jpg" 
                alt="Person in workshop" 
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
            
            {/* Image 5 - Woman with shopping bag */}
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img 
                src="/images/seller-5.jpg" 
                alt="Woman with shopping bag" 
                className="w-full h-48 md:h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}

export default SellerLandingPage;