import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useToast } from "../context/ToastContext";
import { Button } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";

const formatCurrency = (value) =>
  `₦${Math.max(value, 0)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const CartPage = () => {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const subtotal = useCartStore((state) => state.subtotal());
  const deliveryFee = useCartStore((state) => state.deliveryFee());
  const grandTotal = useCartStore((state) => state.grandTotal());
  const addToWishlist = useWishlistStore((state) => state.addItem);
  const { showToast } = useToast();

  const handleSaveForLater = (item) => {
    const product = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      brand: item.seller,
      category: item.category || '',
    };
    
    const added = addToWishlist(product);
    if (added) {
      removeItem(item.id);
      showToast(`${item.name} moved to wishlist!`, 'success');
    } else {
      showToast('Item is already in your wishlist', 'info');
    }
  };

  if (!items.length) {
    return (
      <section className="min-h-screen pt-20 pb-16 md:mt-30 flex flex-col items-center justify-center text-center px-6 animate-fade-in-up">
        <img
          src="/imgs/empty-cart.png"
          alt="Empty cart"
          className="w-52 md:w-72"
        />
        <h1 className="text-2xl md:text-3xl font-semibold text-primary mb-4">
          Your cart is currently empty
        </h1>
        <p className="text-text-grey max-w-lg mb-8">
          Looks like you haven’t added anything yet. Start exploring today’s
          deals and bring your favourites closer to checkout.
        </p>
        <Button variant="secondary" size="md" shape="rounded" onClick={() => navigate("/")}>
          Discover products
        </Button>
      </section>
    );
  }

  return (
    <section className="min-h-screen pb-20 ">
   
          {/* Page Header */}
   <PageHeader
        breadcrumbs={[]}
        title="Review & confirm your order"
        subtitle="Please review your order details before proceeding to checkout."
        containerStyle="shadow"

        titleSize="medium"
      />
         
          {/* <Button
            variant="textPrimary"
            size="md"
            shape="rounded"
            className="bg-white px-6 py-3 shadow-sm hover:shadow-lg transition duration-300"
            onClick={clearCart}
          >
            Clear cart
          </Button> */}
      <div className="max-w-6xl mx-auto space-y-10">
   
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            {items.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-3xl p-5 md:p-6 shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 animate-fade-in-up"
              >
                <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                  <div className="bg-background-alt rounded-2xl p-4 flex-shrink-0 flex items-center justify-center h-32 w-full md:w-36">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 flex flex-col gap-4">
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <h2 className="text-lg md:text-xl font-semibold text-text-primary">
                          {item.name}
                        </h2>
                        <p className="text-sm text-text-grey mt-1">
                          Sold by{" "}
                          <span className="font-medium text-primary">
                            {item.seller}
                          </span>
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-danger hover:text-danger transition"
                        aria-label="Remove from cart"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-text-grey">
                          Quantity
                        </span>
                        <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-lg text-primary hover:bg-secondary hover:text-white transition"
                          >
                            −
                          </button>
                          <span className="w-12 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-lg text-primary hover:bg-secondary hover:text-white transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <p className="text-2xl font-semibold text-primary">
                        {formatCurrency(
                          parseFloat(String(item.price).replace(/[₦,]/g, "")) *
                            item.quantity
                        )}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        shape="rounded"
                        onClick={() => addItem(item, 1)}
                        className="transition duration-300"
                      >
                        Add one more
                      </Button>
                      <button
                        onClick={() => handleSaveForLater(item)}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-secondary transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Save for later
                      </button>
                      <Link
                        to={`/product/${item.id}`}
                        className="text-sm text-primary hover:underline"
                      >
                        View product details
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="bg-background rounded-3xl p-6 shadow-lg h-fit animate-fade-in-up">
            <h3 className="text-xl font-semibold text-text-primary mb-4">
              Order summary
            </h3>
            <div className="space-y-4 border-b border-gray-100 pb-4">
              <div className="flex justify-between text-sm text-text-grey">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-text-grey">
                <span>Delivery</span>
                <span>{deliveryFee ? formatCurrency(deliveryFee) : "Free"}</span>
              </div>
              <div className="flex justify-between text-sm text-text-grey">
                <span>Discount</span>
                <span>₦0</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-lg font-semibold text-text-primary mt-6">
              <span>Total</span>
              <span>{formatCurrency(grandTotal)}</span>
            </div>

            <Button
              variant="secondary"
              size="lg"
              shape="rounded"
              fullWidth
              className="mt-6 shadow-lg hover:shadow-xl transition duration-300"
              onClick={() => navigate("/checkout")}
            >
              Proceed to checkout
            </Button>

            <Button
              variant="textPrimary"
              size="md"
              shape="rounded"
              fullWidth
              className="mt-3 bg-background-alt hover:bg-background transition"
              onClick={() => navigate("/search")}
            >
              Continue shopping
            </Button>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CartPage;