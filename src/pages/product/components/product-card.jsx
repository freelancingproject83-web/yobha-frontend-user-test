import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { addToWishlist } from "../../../service/wishlist";

/**
 * ProductCard Component - Luxury Gucci-inspired design
 * 
 * Props:
 * @param {Object} product - Product data object
 * 
 * Expected product structure (from API):
 * {
 *   id: string,
 *   productId: string,
 *   name: string,
 *   price: number,
 *   category: string,
 *   images: string[],
 *   available: boolean,
 *   productMainCategory: string,
 *   availableColors: string[],
 *   availableSizes: string[]
 * }
 */
const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Safe data extraction with null checks
  const productId = product?.id || '';
  const productName = product?.name || 'Untitled Product';
  const productPrice = product?.price || 0;
  const productImages = Array.isArray(product?.images) && product.images.length > 0
    ? product.images
    : ['data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4='];
  const hasMultipleImages = productImages.length > 1;
  const availableColors = Array.isArray(product?.availableColors) ? product.availableColors : [];
  const availableSizes = Array.isArray(product?.availableSizes) ? product.availableSizes : [];

  // Format price
  const formattedPrice = typeof productPrice === 'number'
    ? `₹${productPrice.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    : productPrice;

  const handleCardClick = () => {
    if (productId) {
      navigate(`/productDetail/${productId}`);
    }
  };
  const handleAddToWishlist = async (productId) => {
    const payload = {
      "productId": "PID10001",
      "variantSku": "PID10001-NAV-S",
      "desiredQuantity": 1,
      "desiredSize": "S",
      "desiredColor": "Navy Blue",
      "notifyWhenBackInStock": true,
      "note": "Buy during Diwali sale"
    }

    try {
      const result = await addToWishlist(productId, payload);
      console.log("Added to wishlist:", result);
      alert("Product added to wishlist!");
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      alert("Failed to add to wishlist");
    }
  };
  const handleWishlist = (e) => {
    // e.stopPropagation();
    // setIsWishlisted(!isWishlisted);
    handleAddToWishlist(e)
    // TODO: Add to wishlist API call
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white border border-text-light/20 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-premium-beige">
        {/* Carousel Images */}
        <div className="relative w-full h-full">
          {productImages.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${productName} - ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${index === currentImageIndex
                ? 'opacity-100'
                : 'opacity-0'
                } group-hover:scale-105`}
              onError={(e) => {
                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMjAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+';
              }}
            />
          ))}
        </div>

        {/* Navigation Arrows - Show on hover if multiple images */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 hover:bg-white transition-all z-20"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} className="text-black" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 backdrop-blur-sm shadow-sm opacity-0 group-hover:opacity-100 hover:bg-white transition-all z-20"
              aria-label="Next image"
            >
              <ChevronRight size={16} className="text-black" />
            </button>
          </>
        )}

        {/* Wishlist Icon */}
        {/* <button
          onClick={() => handleWishlist(product.id)}
          className={`absolute top-3 right-3 z-10 p-2 backdrop-blur-sm transition-all duration-300 ${isWishlisted
              ? 'bg-black'
              : 'bg-white/90 hover:bg-white'
            }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={16}
            className={`transition-all ${isWishlisted
                ? 'text-white fill-white'
                : 'text-black'
              }`}
          />
        </button> */}

        {/* Image Indicator Dots */}
        {hasMultipleImages && (
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1 z-10">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                className={`h-1 rounded-full transition-all duration-300 ${index === currentImageIndex
                  ? 'w-6 bg-black'
                  : 'w-1 bg-black/30 hover:bg-black/60'
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
    <div className="p-5 flex flex-col flex-1 bg-white rounded-t-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out font-['Helvetica_Neue','Helvetica',sans-serif]">

  {/* Product Name */}
  <h3 className="text-gray-900 font-semibold text-lg mb-3 line-clamp-2 tracking-tight uppercase group-hover:text-[#ea5430] transition-colors duration-300">
    {productName}
  </h3>

  {/* Available Options */}
  <div className="mb-4 space-y-1">
    {availableColors.length > 0 && (
      <p className="text-gray-500 text-xs tracking-wider uppercase">
        {availableColors.length} Color{availableColors.length !== 1 ? 's' : ''}
      </p>
    )}
    {availableSizes.length > 0 && (
      <p className="text-gray-500 text-xs tracking-wider uppercase">
        Sizes: <span className="text-gray-700 font-medium">{availableSizes.join(', ')}</span>
      </p>
    )}
  </div>


</div>

    </div>
  );
};

export default ProductCard;
