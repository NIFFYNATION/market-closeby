import { Link } from "react-router-dom";
import StarRating from "../common/StarRating";

const ProductsCard = ({ product }) => {
  

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
          <div className="flex flex-col-1 items-center gap-2 mb-1">
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