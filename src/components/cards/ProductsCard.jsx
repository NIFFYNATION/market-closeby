import { Link } from "react-router-dom";

const ProductsCard = ({ product }) => {
  // Star rating component
  const StarRating = ({ rating, reviews }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-secondary' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">({reviews} Review{reviews !== 1 ? 's' : ''})</span>
    </div>
  );

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          {product.verified && (
            <>
            <div className="absolute top-4 
            right-4 z-10">
             <img src="/icons/verified-user.svg" alt="Verified User" />
            </div>
            <div className="absolute top-10 
            right-4 z-10">
             <img src="/icons/check.svg" 
             alt="Check User" />
            </div>
            </>
          )}
          <div className="p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-bold text-primary text-lg">{product.price}</span>
            {product.oldPrice && (
              <span className="text-gray-400 line-through text-sm">{product.oldPrice}</span>
            )}
            {product.discount && (
              <span className="bg-[#FFEAEA] text-[#FF4D4F] text-xs font-semibold px-2 py-1 rounded-full">{product.discount}</span>
            )}
          </div>
          <h3 className="text-sm font-medium text-text-grey mb-2 truncate">{product.name}</h3>
          <div className="flex items-center mb-2 gap-1 text-text-primary">
            <img src="/icons/location.svg" alt="Location" className='w-4 h-4' />
            <span className="text-xs">{product.location}</span>
          </div>
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>
      </Link>
    </div>
  );
};

export default ProductsCard;