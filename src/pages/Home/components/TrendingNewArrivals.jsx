import React, { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFilteredProducts } from "../../../service/productAPI";

const TrendingNewArrivals = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch your API data
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const payload = {
        q: "",
        category: "",
        subCategory: "",
        minPrice: null,
        maxPrice: null,
        pageNumber: null,
        pageSize: 12, // Increased for better grid display
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

  // ✅ Format product for display
  const displayProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    return products
      .filter((p) => p.available)
      .slice(0, 8)
      .map((p) => ({
        id: p.id,
        title: p.name || "Untitled Product",
        price: p.price ? `₹${p.price.toLocaleString("en-IN")}` : "Price not available",
        image: p.images?.[0] || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPk5vIEltYWdlPC90ZXh0Pgo8L3N2Zz4=",
        badge: p.productMainCategory || "New",
        slug: p.productId,
        category: p.category || "Luxury Collection"
      }));
  }, [products]);

  return (
    <section
      className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 bg-premium-cream overflow-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border border-luxury-gold/30 rotate-45"></div>
        <div className="absolute top-20 right-16 w-16 h-16 border border-luxury-gold/30 rotate-12"></div>
        <div className="absolute bottom-16 left-16 w-18 h-18 border border-luxury-gold/30 -rotate-12"></div>
        <div className="absolute bottom-10 right-10 w-14 h-14 border border-luxury-gold/30 rotate-45"></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12 md:mb-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-black uppercase mb-4">
          New Arrivals
        </h2>
        <div className="w-16 h-1 bg-luxury-gold mx-auto mb-6"></div>
        <p className="text-text-medium text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
          New Arrivals crafted for elevated living
        </p>
      </div>

      {/* Premium Product Grid - Enhanced Mobile Responsiveness */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-luxury-gold/20 rounded-full animate-spin"></div>
              <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-luxury-gold rounded-full animate-spin"></div>
            </div>
            <p className="text-text-medium text-lg font-medium">Loading products...</p>
          </div>
        </div>
      ) : displayProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
          {displayProducts.map((product, index) => (
            <article
              key={product.id}
              className="group bg-white border border-text-light/10 overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 flex flex-col relative"
              onClick={() => navigate(`/productDetail/${product.id}`)}
            >
              {/* Luxury Gold Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>

              {/* Product Image Container */}
              <div className="relative aspect-square overflow-hidden bg-premium-beige">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) =>
                    (e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+")
                  }
                />

                {/* Luxury overlay effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/40 transition-all duration-500"></div>

                {/* Premium Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 text-xs px-2 py-1 bg-luxury-gold text-black font-semibold uppercase tracking-widest group-hover:bg-black group-hover:text-luxury-gold transition-all duration-300">
                    {product.badge}
                  </span>
                )}

                {/* Luxury border overlay */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>

                {/* Quick view button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button className="px-4 py-2 bg-luxury-gold text-black font-semibold text-xs uppercase tracking-widest hover:bg-black hover:text-luxury-gold transition-all duration-300 transform hover:scale-105">
                    Quick View
                  </button>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-3 sm:p-4 md:p-5 lg:p-6 flex flex-col flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ease-out font-['Helvetica_Neue','Helvetica',sans-serif] group">

                {/* Product Info */}
                <div className="mb-3 sm:mb-4 flex-1">
                  <h3 className="text-gray-900 font-semibold text-[12px] sm:text-sm md:text-base tracking-tight uppercase leading-snug line-clamp-2 min-h-[2.4rem] sm:min-h-[2.8rem] transition-colors duration-300 group-hover:text-[#ea5430]">
                    {product.title}
                  </h3>
                  <p className="text-gray-500 text-[11px] sm:text-xs tracking-wide italic line-clamp-1 mt-1">
                    {product.category}
                  </p>
                </div>

                {/* Divider + CTA */}
                <div className="mt-auto pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    {/* Optional Price */}
                    {/* <span className="text-gray-900 font-semibold text-xs sm:text-sm lg:text-base">
        ₹{product.price}
      </span> */}

                    <div className="text-[#c8a45d] text-[10px] sm:text-xs uppercase tracking-widest group-hover:text-[#ea5430] transition-all duration-300 ease-in flex items-center gap-1">
                      View Details
                      <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </div>
                </div>

              </div>

            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">✨</div>
          <p className="text-text-medium text-lg">No products available at the moment.</p>
          <p className="text-text-light text-sm mt-2">Check back soon for new arrivals</p>
        </div>
      )}

      {/* Luxury Call-to-Action */}
      {displayProducts.length > 0 && (
        <div className="text-center mt-12 md:mt-16">
          <button
            onClick={() => navigate('/products')}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-black to-text-dark text-white font-semibold text-base sm:text-lg uppercase tracking-widest hover:bg-luxury-gold hover:text-white transition-all duration-500 transform hover:scale-105 border-2 border-black hover:border-luxury-gold shadow-lg hover:shadow-2xl"
          >
            View All Products
          </button>
        </div>
      )}
    </section>
  );
};

export default TrendingNewArrivals;
