import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Star,
  Truck,
} from "lucide-react";
import { addToCart, getCartDetails, getProductDescription, submitReview, getFilteredProducts } from "../../service/productAPI";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../redux/cartSlice";
import { addToWishlist } from "../../service/wishlist";
import { message } from "../../comman/toster-message/ToastContainer";
import { Share2 } from "lucide-react";

const getAvailableQuantity = (priceList, selectedCountry, selectedSize) => {
  if (!Array.isArray(priceList) || priceList.length === 0) return 0;

  const matchedItem = priceList.find(
    (item) =>
      item.country === selectedCountry &&
      item.size === selectedSize &&
      item.quantity > 0
  );

  return matchedItem ? matchedItem.quantity : 0;
};



const formatPrice = (price, currency ) => {
  if (typeof price !== 'number') return '0';

  return price.toLocaleString(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // UI State
  const savedCountry = localStorage.getItem('selectedCountry');
const parsedCountry = savedCountry ? JSON.parse(savedCountry) : countryOptions[0];

// const [selectedCountry] = useState(parsedCountry);
  const [selectedCountry, setSelectedCountry] = useState(parsedCountry.code);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [isImageFull, setIsImageFull] = useState(false);
  const [currentImageFull, setCurrentImageFull] = useState(null);

  // Button Loading States
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const [itemAddedToCart, setItemAddedToCart] = useState(false);
  // API State
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState(null);
  const [newProducts, setProducts] = useState([])

  // Review Form State
  const [averageProdRating, setAverageProdRating] = useState(0);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const countryOptions = [
    { code: "IN", label: "India" },
    { code: "AE", label: "United Arab Emirates (UAE)" },
    { code: "SA", label: "Saudi Arabia" },
    { code: "QA", label: "Qatar" },
    { code: "KW", label: "Kuwait" },
    { code: "OM", label: "Oman" },
    { code: "BH", label: "Bahrain" },
    { code: "JO", label: "Jordan" },
    { code: "LB", label: "Lebanon" },
    { code: "EG", label: "Egypt" },
    { code: "IQ", label: "Iraq" },
  ];

  const fetchProductDetail = useCallback(async (productId) => {
    setIsLoading(true)
    try {
      const response = await getProductDescription(productId);
      setProduct(response.data);
      setAverageProdRating(() => {
        const reviews = response.data.reviews || [];
        if (reviews.length === 0) return 0;
        const total = reviews.reduce((sum, item) => sum + item.rating, 0);
        return (total / reviews.length).toFixed(1);
      });
      fetchProducts(response?.data?.productMainCategory)

    } catch (error) {
      console.error("Error fetching product:", error);
    }
    finally {
      setIsLoading(false)
    }
  }, []);

  useEffect(() => {
    if (productId) {
      fetchProductDetail(productId);
    }
  }, [productId, fetchProductDetail]);

  useEffect(() => {
    if (product) {
      if (product.availableColors.length > 0 && !selectedColor) {
        setSelectedColor(product.availableColors[0]);
      }
      if (product.sizeOfProduct.length > 0 && !selectedSize) {
        setSelectedSize(product.sizeOfProduct[0]);
      }
    }
  }, [product, selectedColor, selectedSize]);

  const fetchProducts = async (category) => {
    setIsLoading(true);
    try {
      const payload = {
        q: "",
        category: category,
        subCategory: "",
        minPrice: null,
        maxPrice: null,
        pageNumber: null,
        pageSize: 4,
        sort: "latest",
        country: null,
      };

      const response = await getFilteredProducts(payload);
      if (response && response.success && response.data) {
        setProducts(response.data.items || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!reviewComment.trim()) {
      message.error("Please enter a review comment");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const reviewData = {
        rating: reviewRating,
        comment: reviewComment.trim()
      };

      await submitReview(productId, reviewData);
      message.success("Your opinion matters to us.");

      // Reset form
      setReviewComment('');
      setReviewRating(5);
      setShowReviewForm(false);

      await fetchProductDetail(productId);

    } catch (error) {
      console.error("Error submitting review:", error);
      message.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  const availableQuantity = product
    ? getAvailableQuantity(product.priceList, selectedCountry, selectedSize)
    : 0;

  const handlePrevImage = () => {
    if (!product || product.images.length === 0) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!product || product.images.length === 0) return;
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  // Quantity controls
  const handleIncrement = () => {
    if (quantity < availableQuantity) {
      setQuantity(prev => prev + 1);
      setItemAddedToCart(false);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
      setItemAddedToCart(false);
    }
  };

  const fetchCart = async () => {

    try {
      const response = await getCartDetails()
      console.log(response.data.items.length);
      dispatch(setCartCount(response.data.items.length));
    }
    catch (err) {
      console.log(err || "something went wrong")
    }
    finally {

    }

  }
  // Add to cart
  // const handleAddToCart = async () => {
  //   if (!selectedColor || !selectedSize || availableQuantity === 0) {
  //     message.error('Please select color and size');
  //     return;
  //   }

  //   setAddingToCart(true);

  //   const payload = {
  //     productId: product.productId,
  //     size: selectedSize,
  //     quantity: quantity,
  //     currency: product?.priceList?.find(
  //       (item) => item.country === selectedCountry && item.size === selectedSize
  //     ).currency,
  //     note: ""
  //   };

  //   try {
  //     const response = await addToCart(payload);
  //     console.log("Added to cart:", response);
  //     console.log(response.data.success)
  //     if (response.data.success === 'true') {
  //       message.success("Product added to cart successfully!");
  //     }
  //     else {
  //       message.error(response.data.message)
  //     }
  //     setItemAddedToCart(true);
  //     fetchCart()
  //   } catch (err) {
  //     console.error("Error adding to cart:", err);
  //     message.error("Failed to add product to cart. Please try again.");
  //   } finally {
  //     setAddingToCart(false);
  //   }
  // };
const handleAddToCart = (product, selectedSize, selectedCountry, quantity) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];


  const safeProduct = JSON.parse(
    JSON.stringify(product, (key, value) => {
      if (typeof value === "function") return undefined;
      if (key.startsWith("__react")) return undefined;
      return value;
    })
  );

  // 🛑 Restrict to one country
  const existingCountry = cart.length > 0 ? cart[0].country : null;
  if (existingCountry && existingCountry !== selectedCountry) {
    alert(`You can only add items from ${existingCountry}.`);
    return;
  }


  const itemIndex = cart.findIndex(
    (item) => item.id === safeProduct.id && item.size === selectedSize
  );

  if (itemIndex !== -1) {
   
    cart[itemIndex] = {
      ...cart[itemIndex],
      quantity: quantity,
    };
  } else {

    cart.push({
      ...safeProduct,
      size: selectedSize,
      country: selectedCountry,
      quantity: quantity,
      country:selectedCountry
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${safeProduct.name || "Product"} added to cart!`);
};



  const handleGoToCart = () => {
    navigate("/cart");
  };

 
const handleBuyNow = () => {
 
   const selectedPrice =
    product.priceList.find(
      (p) =>
        p.size === selectedSize && p.country === selectedCountry
    ) || {};

  const lineTotal = (selectedPrice.priceAmount || product.unitPrice) * quantity;
   console.log(product.priceList,"pro")
  const checkoutProd={
    items: [
      {
        product: {
          ...product,
          currency:selectedPrice.currency,
          variantSize:selectedSize,
          variantColor:selectedColor,
          size:selectedSize,
           thumbnailUrl:product.images[0].url,
          // countryPrice: {
          //   priceAmount: selectedPrice.priceAmount || product.unitPrice,
          //   currency: selectedPrice.currency || product.currency,
          // },
        },
        quantity:quantity,
       
        lineTotal:lineTotal,
        addedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        note: "",
        success: true,
        message: "OK",
        suggestedCountryPrice: null,
      },
    ],
  };
  navigate("/checkout/buynow", { state: { checkoutProd,selectedCountry , selectedSize ,quantity} });
};


  // Wishlist toggle
  const handleAddToWishlist = async (productId) => {
    setAddingToWishlist(true);
    const selectedVariant = product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );

    const payload = {
      productId: product.productId,
      size: selectedVariant?.sku || '',
      desiredQuantity: quantity,
      desiredSize: selectedSize,
      desiredColor: selectedColor,
      notifyWhenBackInStock: true,

    }

    try {
      const result = await addToWishlist(productId, payload);
      console.log("Added to wishlist:", result);
      message.success("Product added to wishlist!");
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      message.error("Failed to add to wishlist");
    } finally {
      setAddingToWishlist(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-premium-cream flex items-center justify-center"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-premium-beige border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-medium text-sm uppercase tracking-wider">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div
        className="min-h-screen bg-premium-cream flex items-center justify-center"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
            Product Not Found
          </h2>
          <p className="text-text-medium mb-8">
            {error || 'The product you are looking for does not exist or is no longer available.'}
          </p>
          <a
            href="/products"
            className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-text-dark transition-colors uppercase tracking-wider text-sm"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }
  const displayedReviews = showAll ? product.reviews : product.reviews.slice(0, 5);
  const currentImage = product.images[selectedImageIndex] || product.images[0];
  const hasMultipleImages = product.images.length > 1;
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    // You can also trigger other logic here if needed
    console.log('Selected Country:', e.target.value);
  };
  const matchedPrice = product?.priceList?.find(
    (item) =>
      item.country === selectedCountry &&
      item.size === selectedSize
  );

  const shippingInfo = product.countryPrices.find(
    (item) => item.country === selectedCountry
  );
  const handleShare = async () => {
    const shareData = {
      title: product?.productName,
      text: `Check out this product: ${product?.productName}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share cancelled or failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div
      className="min-h-screen bg-premium-cream"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 py-12">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-text-medium">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-black transition-colors">Products</a>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white overflow-hidden group">
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                className="w-full h-full object-cover"
                onClick={() => {
                  setIsImageFull(true);
                  setCurrentImageFull(currentImage.url);
                }}
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjgwMCIgdmlld0JveD0iMCAwIDgwMCA4MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iODAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iNDAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+';
                }}
              />
              <button
                onClick={handleShare}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-gray-100"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </button>

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 hover:bg-white transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-black" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 hover:bg-white transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-black" strokeWidth={1.5} />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`h-1 rounded-full transition-all ${index === selectedImageIndex
                        ? 'w-6 bg-black'
                        : 'w-1 bg-black/30'
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {hasMultipleImages && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white overflow-hidden transition-all ${index === selectedImageIndex
                      ? 'ring-2 ring-black'
                      : 'ring-1 ring-text-light/20 hover:ring-text-light'
                      }`}
                  >
                    <img
                      src={image.thumbnailUrl}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5OTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD4KPC9zdmc+';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">

            {/* Product Name */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase tracking-wide mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              {product.reviewCount > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(averageProdRating)
                            ? "fill-black text-black"
                            : "fill-none text-text-light"
                        }
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-medium">
                    {averageProdRating} ({product.reviews.length} review{product.reviewCount !== 1 ? 's' : ''})
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-text-medium text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Country Selector */}
            {/* <div className="mt-4">
              <label htmlFor="country" className="block text-sm text-text-light mb-1">
                Select Country
              </label>
              <select
                id="country"
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full px-4 py-2 border border-text-light/20 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                {countryOptions.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div> */}

            {/* Debug or use selected country */}
            <div className="mt-2 text-sm text-text-light">
              Selected Country: <span className="font-medium">{selectedCountry}</span>
            </div>
            {/* Price */}
            {/* <div className="py-6 border-y border-text-light/20">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-black">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xl text-text-light line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div> */}
            {/* Price - Based on selectedCountry and selectedSize */}
            <div className="py-6 border-y border-text-light/20">
              <div className="flex items-baseline gap-4">
                {(() => {
                  const matchedPrice = product.priceList?.find(
                    (item) =>
                      item.country === selectedCountry &&
                      item.size === selectedSize
                  );

                  return matchedPrice ? (
                    <>
                      <span className="text-4xl font-bold text-black">
                        {formatPrice(matchedPrice.priceAmount , matchedPrice.currency)}
                      </span>

                      {/* Uncomment below if compareAtPrice exists in data */}
                      {/* {matchedPrice.compareAtPrice && (
            <span className="text-xl text-text-light line-through">
              {formatPrice(matchedPrice.compareAtPrice)}
            </span>
          )} */}
                    </>
                  ) : (
                    <span className="text-xl text-red-500">Item not available</span>
                  );
                })()}
              </div>
            </div>
            {/* Color Selection */}
            {product?.availableColors?.length > 0 && (
              <div className="bg-white border border-text-light/10 p-4 sm:p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-black uppercase tracking-widest">
                    Color
                  </h3>
                  <span className="text-sm text-text-medium font-medium">
                    {selectedColor}
                  </span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-3 pt-3 scrollbar-hide px-1 -mx-1">
                  {product?.availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color);
                        setItemAddedToCart(false);
                      }}
                      className={`flex-shrink-0 px-6 py-3 border-2 transition-all duration-300 uppercase text-xs tracking-wider font-medium rounded-full relative group min-h-[44px] flex items-center justify-center ${selectedColor === color
                        ? 'border-black bg-black text-white  transform scale-105'
                        : 'border-text-light/20 text-black hover:border-black/30 hover:bg-black/5'
                        }`}
                    >
                      {selectedColor === color && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      )}
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizeOfProduct.length > 0 && (
              <div className="bg-white border border-text-light/10 p-4 sm:p-6 rounded-lg ">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-black uppercase tracking-widest">
                    Size
                  </h3>
                  <span className="text-sm text-text-medium font-medium">
                    {selectedSize}
                  </span>
                </div>
                <div className="flex gap-3 overflow-x-auto pb-3 pt-2 scrollbar-hide px-1 -mx-1">
                  {product.sizeOfProduct.map((size) => (
                    <button
                      key={size}
                      onClick={() => {
                        setSelectedSize(size);
                        setItemAddedToCart(false);
                      }}
                      className={`flex-shrink-0 w-14 h-14 border-2 transition-all duration-300 uppercase text-sm tracking-wider font-bold rounded-lg relative group flex items-center justify-center min-h-[44px] ${selectedSize === size
                        ? 'border-black bg-black text-white shadow-lg transform scale-105'
                        : 'border-text-light/20 text-black hover:border-black/30 hover:bg-black/5'
                        }`}
                    >
                      {selectedSize === size && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-black rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-1 h-1 bg-white rounded-full"></div>
                        </div>
                      )}
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-black mb-4 uppercase tracking-widest">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-text-light/30">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-premium-beige transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} strokeWidth={2} />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= availableQuantity}
                    className="p-3 hover:bg-premium-beige transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} strokeWidth={2} />
                  </button>
                </div>

              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              {availableQuantity === 0 ? (
                // Out of Stock - Show only one button
                <div className="flex gap-3 sm:gap-4 flex-1">
                  <button
                    disabled
                    className="flex-1 bg-text-light text-white py-3 sm:py-4 px-4 sm:px-6 font-semibold uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-3 cursor-not-allowed min-h-[48px] sm:min-h-[56px]"
                  >
                    <ShoppingBag size={18} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
                    <span className="text-xs sm:text-sm">Out of Stock</span>
                  </button>
                </div>
              ) : (
                // In Stock - Show both buttons
                <div className="flex gap-3 sm:gap-4 flex-1">
                  <button
                    onClick={itemAddedToCart ? handleGoToCart :  () => handleAddToCart(product, selectedSize, selectedCountry,quantity)}
                    disabled={
                      !selectedColor ||
                      !selectedSize ||
                      !matchedPrice ||
                      addingToCart
                    }
                    className="flex-1 bg-black text-white py-3 sm:py-4 px-4 sm:px-6 font-semibold hover:bg-text-dark transition-colors uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-3 disabled:bg-text-light disabled:cursor-not-allowed min-h-[48px] sm:min-h-[56px]"
                  >
                    {addingToCart ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs sm:text-sm">Adding...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">
                          {!matchedPrice
                            ? 'Price Not Available'
                            : itemAddedToCart
                              ? 'Go to Cart'
                              : 'Add to Cart'}
                        </span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleBuyNow}
                    disabled={
                      !selectedColor ||
                      !selectedSize ||
                      !matchedPrice ||
                      addingToCart
                    }
                    className="flex-1 bg-black text-white py-3 sm:py-4 px-4 sm:px-6 font-semibold hover:bg-text-dark transition-colors uppercase tracking-wider text-xs sm:text-sm flex items-center justify-center gap-2 sm:gap-3 disabled:bg-text-light disabled:cursor-not-allowed min-h-[48px] sm:min-h-[56px]"
                  >
                    {addingToCart ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs sm:text-sm">Processing...</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={18} strokeWidth={1.5} className="sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm">
                          {!matchedPrice
                            ? 'Price Not Available'
                            : 'Buy Now'}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}

              <button
                onClick={() => handleAddToWishlist(product.id)}
                disabled={addingToWishlist}
                className={`p-3 sm:p-4 border-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] sm:min-h-[56px] flex items-center justify-center ${isWishlisted
                  ? 'border-black bg-black'
                  : 'border-text-light/30 hover:border-black'
                  }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                {addingToWishlist ? (
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Heart
                    size={18}
                    strokeWidth={1.5}
                    className={`sm:w-5 sm:h-5 ${isWishlisted ? 'fill-white text-white' : 'text-black'}`}
                  />
                )}
              </button>
            </div>


            {/* Shipping Info */}
            {shippingInfo && (
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-text-medium mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-black">Shipping Charges</p>
                  <p className="text-xs text-text-medium">
                    {shippingInfo.priceAmount === 0
                      ? "Free Shipment"
                      : `${shippingInfo.priceAmount.toLocaleString()} ${shippingInfo.currency}`}
                  </p>
                </div>
              </div>
            )}
            {/* <div className="space-y-3 pt-6 border-t border-text-light/20">
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-text-medium mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-black">Free Shipping</p>
                  <p className="text-xs text-text-medium">Estimated delivery: 3-5 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw size={20} className="text-text-medium mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-black">Easy Returns</p>
                  <p className="text-xs text-text-medium">30-day return policy</p>
                </div>
              </div>
            </div> */}

            {/* Product Details */}
            {(product.keyFeatures.length > 0 || Object.keys(product.specifications).length > 0 || product.fabricType.length > 0) && (
              <div className="space-y-6 pt-6 border-t border-text-light/20">

                {/* Key Features */}
                {product.keyFeatures.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-widest">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.keyFeatures.map((feature, index) => (
                        <li key={index} className="text-sm text-text-medium flex items-start">
                          <span className="mr-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Fabric Type */}
                {product.fabricType.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-widest">
                      Fabric
                    </h3>
                    <p className="text-sm text-text-medium">
                      {product.fabricType.join(', ')}
                    </p>
                  </div>
                )}

                {/* Care Instructions */}
                {product.careInstructions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-widest">
                      Care Instructions
                    </h3>
                    <ul className="space-y-2">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="text-sm text-text-medium flex items-start">
                          <span className="mr-2">•</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Review Form Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 border-t border-text-light/20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black uppercase tracking-wide mb-6 sm:mb-8">
            Customer Reviews
          </h2>

          {/* Add Review Button */}
          {!showReviewForm && (
            <div className="mb-6 sm:mb-8">
              <button
                onClick={() => setShowReviewForm(true)}
                className="w-full sm:w-auto bg-black hover:bg-text-dark text-white font-semibold py-4 sm:py-3 px-6 sm:px-8 transition-all duration-200 flex items-center justify-center gap-3 uppercase tracking-wider hover:scale-[1.02] text-sm sm:text-base"
              >
                <Star size={18} />
                Write a Review
              </button>
            </div>
          )}

          {/* Review Form */}
          {showReviewForm && (
            <div className="mb-8 sm:mb-12 p-4 sm:p-6 lg:p-8 bg-premium-beige border border-text-light/20">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6 uppercase tracking-wide">
                Share Your Experience
              </h3>

              <form onSubmit={handleSubmitReview} className="space-y-4 sm:space-y-6">
                {/* Rating Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-text-medium mb-2 sm:mb-3 uppercase tracking-[0.15em]">
                    Rating
                  </label>
                  <div className="flex items-center gap-1 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewRating(rating)}
                        className="p-1 sm:p-2 transition-all duration-200 hover:scale-110 active:scale-95"
                      >
                        <Star
                          size={20}
                          className={`sm:w-6 sm:h-6 ${rating <= reviewRating
                            ? "fill-black text-black"
                            : "fill-none text-text-light"
                            }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                    <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-text-medium">
                      {reviewRating} out of 5 stars
                    </span>
                  </div>
                </div>

                {/* Comment Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-text-medium mb-2 sm:mb-3 uppercase tracking-[0.15em]">
                    Your Review
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    rows={4}
                    className="w-full px-3 sm:px-5 py-3 sm:py-4 border-2 border-text-light/20 focus:border-black focus:outline-none text-black bg-white placeholder:text-text-light transition-colors font-medium resize-none text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="w-full sm:w-auto bg-black hover:bg-text-dark text-white font-semibold py-4 sm:py-3 px-6 sm:px-8 transition-all duration-200 flex items-center justify-center gap-3 uppercase tracking-wider hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmittingReview ? "Submitting..." : "Submit Review"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReviewForm(false);
                      setReviewComment('');
                      setReviewRating(5);
                    }}
                    className="w-full sm:w-auto bg-text-light/10 hover:bg-text-light/20 text-black font-semibold py-4 sm:py-3 px-6 sm:px-8 transition-all duration-200 uppercase tracking-wider text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Existing Reviews Section */}
        {product.reviews.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <h3 className="text-lg sm:text-xl font-bold text-black uppercase tracking-wide mb-6 sm:mb-8">
              Customer Reviews ({product.reviews.length})
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {displayedReviews.map((review, index) => (
                <div
                  key={review.id || index}
                  className="border-b border-text-light/10 pb-4 sm:pb-6 last:border-0"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`sm:w-4 sm:h-4 ${i < review.rating
                            ? "fill-black text-black"
                            : "fill-none text-text-light"
                            }`}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-text-medium">
                      {new Date(review.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-dark leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}

              {product.reviews.length > 5 && (
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="text-sm text-primary mt-2 hover:underline"
                >
                  {showAll ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
          </div>
        )}
        {newProducts?.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-text-light/20 ">
            <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-widest">
              Hot Picks Just For You
            </h3>

            <div className="px-4 py-6">
              {/* <h2 className="text-2xl font-semibold text-gray-800 mb-6">New Products</h2> */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {newProducts.map((variant) => (
                  <div
                    key={variant.id}
                    className="group border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    {/* Image Section */}
                    <div className="aspect-square overflow-hidden bg-gray-100" onClick={() => navigate(`/productDetail/${variant?.id}`)}>
                      <img
                        src={variant.images[0]}
                        alt={`${variant.color} ${variant.size}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) =>
                        (e.target.src =
                          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDMwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=")
                        }
                      />
                    </div>

                    {/* Info Section */}
                    <div className="p-4 text-center space-y-1">
                      <p className="text-sm font-medium text-gray-700 uppercase">{variant.name}</p>
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {variant.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>
      {/* Product Variants */}
      {isImageFull && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setIsImageFull(false)}
        >
          <img
            src={currentImageFull}
            alt={product?.productName}
            className="max-w-full max-h-full object-contain"
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl"
            onClick={() => setIsImageFull(false)}
          >
            ✕
          </button>
        </div>
      )}


    </div>
  );
};

export default ProductDetailPage;
