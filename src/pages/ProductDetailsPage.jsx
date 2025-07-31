import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productsData } from "../components/productsData";
import { Button } from "../components/common/Button";
import StarRating from "../components/common/StarRating";

const socialIcons = [
  { icon: "/icons/facebook-filled.svg", alt: "Facebook" },
  { icon: "/icons/twitter-filled.svg", alt: "Twitter" },
  { icon: "/icons/instagram-filled.svg", alt: "Instagram" },
];

const ProductDetailsPage = () => {
  const { id } = useParams();
  const product = productsData.find((p) => String(p.id) === String(id));

  // For image gallery
  const [mainImage, setMainImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);

  // Helper function to calculate savings
  const calculateSavings = (currentPrice, oldPrice) => {
    if (!currentPrice || !oldPrice) return '';
    
    // Remove currency symbol and commas, then convert to number
    const current = parseFloat(currentPrice.replace(/[₦,]/g, ''));
    const old = parseFloat(oldPrice.replace(/[₦,]/g, ''));
    
    if (isNaN(current) || isNaN(old) || old <= current) return '';
    
    const savings = old - current;
    return `₦${savings.toLocaleString()}`;
  };

  if (!product) {
    return <div className="p-10 text-center text-lg">Product not found.</div>;
  }

  // Get product images or fallback to an array with the main image repeated
  const productImages = product.images || [product.image, product.image, product.image];

  const handleQuantityChange = (change) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <div className="px-0 md:px-6 lg:px-10 pt-40 md:pt-48 min-h-screen py-8">
      {/* Breadcrumb */}
      <div className="text-xs text-text-grey px-6 pt-6 pb-2">
        <Link to="/" className="hover:underline">Market CloseBy</Link>
        {" / "}
        {product.category && (
          <>
            <Link to={`/search?category=${encodeURIComponent(product.category)}`} className="hover:underline">
              {product.category}
            </Link>
            {" / "}
          </>
        )}
        <span className="text-primary font-semibold">{product.name.split('–')[0].trim()}</span>
      </div>
      
      {/* Title */}
      <h1 className="text-2xl font-bold text-primary px-6 mb-6">{product.name.split('–')[0].trim()}</h1>
      
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-6 px-6">
        {/* Left Content */}
        <div className="bg-background shadow-xl flex flex-col md:flex-row w-full lg:w-[80%]">
          <div className="p-6 mb-4">
            <img
              src={mainImage}
              alt={product.name}
              className="w-80 h-80 object-contain mb-4 mx-auto"
            />
            {/* Gallery Thumbnails */}
            <div className="flex gap-6">
              {productImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name} - View ${idx + 1}`}
                  className={`w-18 h-16 object-contain rounded border cursor-pointer ${
                    mainImage === img ? "border-secondary" : "border-gray-200"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
            {/* Share */}
            <div className="py-8">
              <span className="text-xs font-semibold mb-3 block">SHARE THIS PRODUCT</span>
              <div className="flex gap-3">
                {socialIcons.map((s, i) => (
                  <a key={i} href="#" className="w-10 h-10 flex items-center justify-center rounded-full bg-[#130C761A] hover:bg-gray-300 transition-colors">
                    <img src={s.icon} alt={s.alt} className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Center: Product Info */}
        <div className="p-6 flex-1">
          {/* Conditional Verified Seller Badge */}
          {product.verified && (
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary text-white text-xs px-3 py-1 rounded font-semibold">Verified Seller</span>
            </div>
          )}
          
          <h2 className="text-xl md:text-2xl font-semibold mb-3">{product.name}</h2>
          
          <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
            <span>Brand:</span>
            <Link to="#" className="text-primary font-semibold hover:underline capitalize">{product.brand || 'Unknown'}</Link>
            <span className="mx-2 text-gray-400 hidden sm:inline">|</span>
            <Link to="#" className="text-primary font-semibold hover:underline sm:ml-0 ml-auto capitalize">More {product.brand || 'Brand'} Products</Link>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 text-sm mb-4">
            <span>SKU: 320010</span>
            <span className="mx-2 text-gray-400 hidden sm:inline">|</span>
            <div className="flex items-center gap-1 sm:ml-0 ml-auto">
              <img src="/icons/location.svg" alt="Location" className="w-4 h-4" />
              <span className="text-xs sm:text-sm">Lagos, Nigeria, 1 hour ago</span>
            </div>
          </div>
          
          <div className="border-b border-gray-200 mb-4 pt-4" />
          
          <div className="mb-8">
            <div className="text-3xl font-bold text-primary mb-3">{product.price}</div>
            {product.oldPrice && (
              <div className="text-lg text-gray-400 line-through mb-3">{product.oldPrice}</div>
            )}
            {product.oldPrice && product.price && (
              <div className="text-sm text-primary font-bold">
                Save {calculateSavings(product.price, product.oldPrice)}
              </div>
            )}
          </div>
          {/* Quantity and Add to Cart */}
          <div className="mb-6 border-t border-gray-200 pt-6">
            <div className="flex items-center gap-2 md:gap-6 mb-4">
              <span className="text-sm font-semibold">QTY:</span>
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  onClick={() => handleQuantityChange(-1)}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100 transition-colors border-r border-gray-300"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(1)}
                  className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100 transition-colors border-l border-gray-300"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-text-grey font-medium">Few units left</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col lg:flex-row gap-3 mb-6">
              <Button variant="secondary">
                Add to Cart
              </Button>
              <button className="flex justify-center items-center gap-2 bg-[#130C761A] text-gray-700 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors">
                <div className="w-6 h-6 rounded-full flex items-center justify-center">
                  <img src="/icons/heart-fill.svg" alt="Like" />
                </div>
                Save for later
              </button>
            </div>
          </div>

          <div className="border-y border-gray-200 mb-4 py-6">
               {/* Rating */}
          <StarRating rating={product.rating} reviews={product.reviews} />
       
        </div>
        </div>
         
        </div>
        
        
        
        {/* Right: Shipping and Returns */}
       <div className="bg-background shadow-xl w-full lg:w-80">
       
           <h2 className="border-b border-gray-200 p-6 mb-4 font-semibold">SHIPPING AND RETURNS</h2>

        <div className="px-6">
          <div className="space-y-3 text-sm text-gray-600">
            <div>Free delivery on orders over ₦10,000</div>
            <div>Return within 7 days of purchase</div>
            <div>Warranty: 1 year manufacturer warranty</div>
          </div>
        </div>
       </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;