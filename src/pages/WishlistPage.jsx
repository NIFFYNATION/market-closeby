import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "../store/cartStore";
import { useToast } from "../context/ToastContext";
import { Button } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";
import StarRating from "../components/common/StarRating";

const WishlistPage = () => {
  const navigate = useNavigate();
  const items = useWishlistStore((state) => state.items);
  const removeItem = useWishlistStore((state) => state.removeItem);
  const clearWishlist = useWishlistStore((state) => state.clearWishlist);
  const addItemToCart = useCartStore((state) => state.addItem);
  const { showToast } = useToast();

  // Helper to calculate savings
  const calculateSavings = (currentPrice, oldPrice) => {
    if (!currentPrice || !oldPrice) return '';
    const current = parseFloat(String(currentPrice).replace(/[₦,]/g, ''));
    const old = parseFloat(String(oldPrice).replace(/[₦,]/g, ''));
    if (isNaN(current) || isNaN(old) || old <= current) return '';
    const savings = old - current;
    return `₦${savings.toLocaleString()}`;
  };

  const handleAddToCart = (item) => {
    addItemToCart(item, 1);
    showToast(`${item.name} added to cart!`, 'success');
    navigate("/cart");
  };

  const handleRemoveItem = (itemId, itemName) => {
    removeItem(itemId);
    showToast(`${itemName} removed from wishlist`, 'info');
  };

  const handleClearWishlist = () => {
    clearWishlist();
    showToast('Wishlist cleared', 'info');
  };

  if (!items.length) {
    return (
      <section className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center px-6 animate-fade-in-up">
        <div className="mb-8">
          <svg
            className="w-32 h-32 md:w-40 md:h-40 mx-auto text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
          Your wishlist is empty
        </h1>
        <p className="text-text-grey max-w-lg mb-8">
          Start saving your favorite products! Click "Save for later" on any product to add it to your wishlist.
        </p>
        <Button variant="secondary" size="md" shape="rounded" onClick={() => navigate("/")}>
          Discover products
        </Button>
      </section>
    );
  }

  // Prepare breadcrumbs
  const breadcrumbs = [
    { label: 'Market CloseBy', link: '/' },
    { label: 'Wishlist', active: true }
  ];

  return (
    <section className="min-h-screen pb-20">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="My Wishlist"
        containerStyle="shadow"
        titleSize="large"
        rightContent={
          <Button
            variant="textPrimary"
            size="md"
            shape="rounded"
            className="bg-white px-6 py-3 shadow-sm hover:shadow-lg transition duration-300"
            onClick={handleClearWishlist}
          >
            Clear wishlist
          </Button>
        }
      />

      <div className="px-4 md:px-8 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-text-grey">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 animate-fade-in-up group"
              >
                {/* Product Image */}
                <div className="relative mb-4 bg-background-alt rounded-2xl overflow-hidden">
                  <Link to={`/product/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-danger hover:text-white transition-all duration-300 group/btn"
                    aria-label="Remove from wishlist"
                  >
                    <svg
                      className="w-5 h-5 group-hover/btn:scale-110 transition-transform"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Verified Badge */}
                  {item.verified && (
                    <div className="absolute top-3 left-3 bg-primary text-white text-xs px-2 py-1 rounded font-semibold">
                      Verified
                    </div>
                  )}

                  {/* Discount Badge */}
                  {item.oldPrice && (
                    <div className="absolute bottom-3 left-3 bg-secondary text-white text-xs px-2 py-1 rounded font-semibold">
                      {calculateSavings(item.price, item.oldPrice) && 'Save ' + calculateSavings(item.price, item.oldPrice)}
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-lg font-semibold text-text-primary mb-1 line-clamp-2 hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    {item.brand && (
                      <p className="text-xs text-text-grey capitalize">{item.brand}</p>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2">
                    <StarRating rating={item.rating} reviews={item.reviews} />
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-primary">{item.price}</span>
                    {item.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">{item.oldPrice}</span>
                    )}
                  </div>

                  {/* Location */}
                  {item.location && (
                    <div className="flex items-center gap-1 text-xs text-text-grey">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{item.location}</span>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 pt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      shape="rounded"
                      fullWidth
                      onClick={() => handleAddToCart(item)}
                      className="transition-all duration-300 hover:scale-105"
                    >
                      Add to Cart
                    </Button>
                    <Link to={`/product/${item.id}`}>
                      <Button
                        variant="outline"
                        size="sm"
                        shape="rounded"
                        fullWidth
                        className="transition-all duration-300"
                      >
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WishlistPage;

