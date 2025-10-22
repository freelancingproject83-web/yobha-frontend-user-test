import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus, Minus, Heart, Trash2, ShoppingBag, ArrowRight, Truck, RotateCcw
} from "lucide-react";
// eslint-disable-next-line no-unused-vars
import { deleteCartItem, getCartDetails, updateCartQuantity } from "../../service/productAPI";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../redux/cartSlice";


/**
 * Format price based on currency - same as product description page
 */
const formatPrice = (price, currency) => {
  if (typeof price !== 'number') return '0';

  return price.toLocaleString(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};


const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // API State
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error] = useState(null);
  
  // Button Loading States
  const [loadingButtons, setLoadingButtons] = useState({});


  const fetchCart = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await getCartDetails()
      console.log(response.data);
      setCartItems(response.data.items)
      dispatch(setCartCount(response.data.items.length));
    }
    catch (err) {
      console.log(err || "something went wrong")
    }
    finally{
      setIsLoading(false)
    }

  }, [dispatch])

  useEffect(() => {
    fetchCart(); 
  }, [fetchCart]);

  const handleUpdateCartQuantity = async (itemId, q) => {
    setLoadingButtons(prev => ({ ...prev, [`update_${itemId}`]: true }));
    try {
      const payload = { cartItemId: itemId, quantity: q };
      const data = await updateCartQuantity(payload);
      console.log("Cart quantity updated:", data);
      return data;
    } catch (err) {
      console.error("Error updating cart quantity:", err);
    } finally {
      setLoadingButtons(prev => ({ ...prev, [`update_${itemId}`]: false }));
    }
  };
  // Update quantity
 const updateQuantity = async (itemId, delta) => {
  setCartItems(items =>
    items.map(item => {
      if (item.id === itemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        const maxQuantity = item.product.stockQuantity - item.product.reservedQuantity;

        const finalQuantity = Math.min(newQuantity, maxQuantity);

        // Call API to update cart quantity
        handleUpdateCartQuantity(itemId, finalQuantity);

        return {
          ...item,
          quantity: finalQuantity,
          lineTotal: getCorrectPrice(item) * finalQuantity
        };
      }
      return item;
    })
  );
};

const handleDeleteCartItem = async (id) => {
  setLoadingButtons(prev => ({ ...prev, [`delete_${id}`]: true }));
  try {
    await deleteCartItem(id);
    await fetchCart();
    console.log("Item deleted successfully");
  } catch (err) {
    console.error("Failed to delete cart item:", err);
  } finally {
    setLoadingButtons(prev => ({ ...prev, [`delete_${id}`]: false }));
  }
};
  // Remove item
  const removeItem = (itemId) => {
  
    handleDeleteCartItem(itemId)
  };

  const moveToWishlist = (itemId) => {
    removeItem(itemId);
  };


  // Helper function to get correct price from priceList based on currency and size
  const getCorrectPrice = (item) => {
    const product = item?.product || {};
    const priceList = product?.priceList || [];
    
    if (!priceList || priceList.length === 0) {
      return product?.unitPrice || 0;
    }

    // Find matching price based on currency and size
    const matchingPrice = priceList.find(price => 
      price.currency === product.currency && 
      price.size === product.size
    );

    return matchingPrice ? matchingPrice.priceAmount : (product?.unitPrice || 0);
  };

  // Helper function to get shipping price based on countryPrice
  const getShippingPrice = (cartItems) => {
    if (!cartItems || cartItems.length === 0) return 0;
    
    // Calculate total shipping cost from all items
    let totalShipping = 0;
    
    cartItems.forEach(item => {
      const countryPrice = item?.product?.countryPrice;
      if (countryPrice && countryPrice.priceAmount !== undefined) {
        // Add shipping cost for this item (multiply by quantity)
        totalShipping += countryPrice.priceAmount ;
      }
    });
    
    return totalShipping;
  };

  // Get currency from cart items (assuming all items have the same currency)
  const getCurrency = () => {
    if (!cartItems || cartItems.length === 0) return 'INR';
    const firstItem = cartItems[0];
    return firstItem?.product?.currency || 'INR';
  };

  // Calculate totals from cart items (used when summary is not available)
  const calculateTotals = () => {
    if (!cartItems || cartItems.length === 0) {
      return {
        subTotal: 0,
        totalSavings: 0,
        shipping: 0,
        tax: 0,
        couponDiscount: 0,
        grandTotal: 0,
      };
    }

    const subTotal = cartItems.reduce((sum, item) => {
      const correctPrice = getCorrectPrice(item);
      const qty = item?.quantity || 0;
      return sum + (correctPrice * qty);
    }, 0);

    // Removed discount calculation

    // Shipping calculation based on countryPrice
    const shipping = getShippingPrice(cartItems);

    const tax = 0; // Tax calculation can be added if needed
    const grandTotal = subTotal + shipping + tax;

    return { subTotal,  shipping, tax, grandTotal };
  };

  // Use API summary if available, otherwise calculate
  const totals = cartSummary || calculateTotals();

  // Loading state
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-premium-cream flex items-center justify-center"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-premium-beige border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-medium text-sm uppercase tracking-wider">Loading Cart...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="min-h-screen bg-premium-cream flex items-center justify-center"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
            Something Went Wrong
          </h2>
          <p className="text-text-medium mb-8">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-black text-white px-8 py-3 font-semibold hover:bg-text-dark transition-colors uppercase tracking-wider text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-premium-cream"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-12">

        {/* Page Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase tracking-wide mb-2 md:mb-3">
            Shopping Cart
          </h1>
          <p className="text-text-medium text-sm md:text-base">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-12 md:py-20">
            <div className="max-w-md mx-auto px-4">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 border-2 border-text-light/20 flex items-center justify-center">
                <ShoppingBag size={40} className="text-text-light md:w-12 md:h-12" strokeWidth={1.5} />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-black mb-3 md:mb-4 uppercase tracking-wider">
                Your Cart is Empty
              </h2>
              <p className="text-sm md:text-base text-text-medium mb-6 md:mb-8">
                Discover our premium collection of luxury sleepwear
              </p>
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 md:gap-3 bg-black text-white px-6 md:px-8 py-3 md:py-4 font-semibold hover:bg-text-dark transition-colors uppercase tracking-wider text-xs md:text-sm"
              >
                Start Shopping
                <ArrowRight size={18} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

            {/* Left Column - Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => {
                const product = item?.product || {};
                const availableStock = (product.stockQuantity || 0) - (product.reservedQuantity || 0);

                return (
                  <div
                    key={item.id}
                    className="bg-white border border-text-light/20 p-4 md:p-6 hover:shadow-md transition-all"
                  >
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div
                        className="w-full sm:w-28 md:w-32 h-32 flex-shrink-0 bg-premium-beige overflow-hidden cursor-pointer"
                        onClick={() => navigate(`/productDetail/${product.productObjectId}`)}
                      >
                        <img
                          src={product.thumbnailUrl}
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between gap-2 mb-3">
                          <div className="flex-1 min-w-0">
                            <h3
                              className="font-semibold text-black text-base md:text-lg mb-2 line-clamp-2 hover:underline cursor-pointer uppercase tracking-tight"
                              onClick={() => navigate(`/productDetail/${product.productObjectId}`)}
                            >
                              {product.name}
                            </h3>
                            <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-text-medium mb-2">
                              {product.variantColor && (
                                <span>Color: <span className="text-black font-medium capitalize">{product.variantColor}</span></span>
                              )}
                              {product.variantSize && (
                                <span>Size: <span className="text-black font-medium">{product.variantSize}</span></span>
                              )}
                            </div>
                            {item.note && (
                              <p className="text-xs text-text-light italic line-clamp-1">Note: {item.note}</p>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(item.id)}
                            disabled={loadingButtons[`delete_${item.id}`]}
                            className="text-text-medium hover:text-black transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed relative"
                            aria-label="Remove item"
                          >
                            {loadingButtons[`delete_${item.id}`] ? (
                              <div className="w-4 h-4 border border-text-light border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Trash2 size={18} strokeWidth={1.5} />
                            )}
                          </button>
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                          <div className="flex flex-wrap items-baseline gap-2 mb-1">
                            <span className="text-xl md:text-2xl font-bold text-black">
                              {formatPrice(getCorrectPrice(item), product.currency)}
                            </span>
                          </div>
                          <p className="text-xs md:text-sm text-text-medium">
                            {/* Line Total: <span className="font-bold text-black">{formatPrice(getCorrectPrice(item) * item.quantity, product.currency)}</span> */}
                          </p>
                        </div>

                        {/* Quantity Controls & Actions */}
                        <div className="flex flex-wrap items-center gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center border-2 border-text-light/30">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity <= 1 || loadingButtons[`update_${item.id}`]}
                              className="p-2 hover:bg-premium-beige transition-colors disabled:opacity-30 disabled:cursor-not-allowed relative"
                              aria-label="Decrease quantity"
                            >
                              {loadingButtons[`update_${item.id}`] && item.quantity <= 1 ? (
                                <div className="w-3 h-3 border border-text-light border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Minus size={14} strokeWidth={2} />
                              )}
                            </button>
                            <span className="px-4 md:px-6 py-2 font-semibold text-sm md:text-base min-w-[50px] text-center">
                              {loadingButtons[`update_${item.id}`] ? (
                                <div className="w-4 h-4 border border-text-light border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : (
                                item.quantity
                              )}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              disabled={item.quantity >= availableStock || loadingButtons[`update_${item.id}`]}
                              className="p-2 hover:bg-premium-beige transition-colors disabled:opacity-30 disabled:cursor-not-allowed relative"
                              aria-label="Increase quantity"
                            >
                              {loadingButtons[`update_${item.id}`] && item.quantity >= availableStock ? (
                                <div className="w-3 h-3 border border-text-light border-t-transparent rounded-full animate-spin"></div>
                              ) : (
                                <Plus size={14} strokeWidth={2} />
                              )}
                            </button>
                          </div>

                          {/* Move to Wishlist */}
                          <button
                            onClick={() => moveToWishlist(item.id)}
                            className="flex items-center gap-2 text-xs md:text-sm text-text-medium hover:text-black transition-colors"
                          >
                            <Heart size={14} strokeWidth={1.5} />
                            <span className="hidden sm:inline">Wishlist</span>
                          </button>

                          {/* Stock Warning */}
                          {availableStock <= 5 && availableStock > 0 && (
                            <span className="text-xs text-luxury-rose-gold whitespace-nowrap">
                              Only {availableStock} left
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-text-light/20 lg:sticky lg:top-24">
                <div className="p-4 md:p-6 border-b border-text-light/20">
                  <h2 className="text-lg md:text-xl font-bold text-black uppercase tracking-wider mb-1">
                    Order Summary
                  </h2>
                  <p className="text-xs md:text-sm text-text-medium">
                    {cartSummary?.distinctItems || cartItems.length} {(cartSummary?.distinctItems || cartItems.length) === 1 ? 'item' : 'items'}
                  </p>
                </div>

                <div className="p-4 md:p-6 space-y-4">
                  {/* Price Breakdown */}
                  <div className="space-y-3 pb-4 border-b border-text-light/10">
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-text-medium">Subtotal</span>
                      <span className="text-black font-semibold">
                        {formatPrice(cartSummary?.subTotal || totals.subTotal, getCurrency())}
                      </span>
                    </div>



                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-text-medium">Shipping</span>
                      {(cartSummary?.shipping || totals.shipping) === 0 ? (
                        <span className="text-black font-semibold">FREE</span>
                      ) : (
                        <span className="text-black font-semibold">
                          {formatPrice(cartSummary?.shipping || totals.shipping, getCurrency())}
                        </span>
                      )}
                    </div>

                    {(cartSummary?.tax || totals.tax || 0) > 0 && (
                      <div className="flex justify-between text-xs md:text-sm">
                        <span className="text-text-medium">Tax</span>
                        <span className="text-black font-semibold">
                          {formatPrice(cartSummary?.tax || totals.tax, getCurrency())}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Total */}
                  <div className="flex justify-between pt-4 pb-4 md:pb-6 border-b border-text-light/20">
                    <span className="text-base md:text-lg font-bold text-black uppercase tracking-wider">
                      Total
                    </span>
                    <span className="text-xl md:text-2xl font-bold text-black">
                      {formatPrice(cartSummary?.grandTotal || totals.grandTotal, getCurrency())}
                    </span>
                  </div>

                  {/* Shipping Info - Only show when shipping is free */}
                  {(cartSummary?.shipping || totals.shipping) === 0 && (
                    <div className="space-y-3 py-4 border-b border-text-light/20">
                      <div className="flex items-start gap-3">
                        <Truck size={16} className="text-text-medium mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-medium text-black">Free Shipping</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <RotateCcw size={16} className="text-text-medium mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs md:text-sm font-medium text-black">Easy Returns</p>
                          <p className="text-xs text-text-medium">30-day return policy</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <button
                    onClick={() => {
                      setLoadingButtons(prev => ({ ...prev, checkout: true }));
                      setTimeout(() => {
                        navigate("/checkout");
                        setLoadingButtons(prev => ({ ...prev, checkout: false }));
                      }, 500);
                    }}
                    disabled={cartItems.length === 0 || loadingButtons.checkout}
                    className="w-full bg-black text-white py-3 md:py-4 font-semibold hover:bg-text-dark transition-colors uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-2 md:gap-3 disabled:bg-text-light disabled:cursor-not-allowed"
                  >
                    {loadingButtons.checkout ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Checkout</span>
                        <ArrowRight size={18} strokeWidth={1.5} />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => navigate("/products")}
                    className="w-full mt-3 border-2 border-text-light/30 text-black py-3 md:py-4 font-semibold hover:border-black transition-colors uppercase tracking-wider text-xs md:text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
