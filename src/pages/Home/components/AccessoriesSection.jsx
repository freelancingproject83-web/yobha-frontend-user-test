import React from "react";
import { useNavigate } from "react-router-dom";
import SCRUNCHIES from "../../../assets/SCRUNCHIES.jpg";
import Socks from "../../../assets/SOCKS.jpg";
import headband from "../../../assets/HEADBAND.jpg";
import eyemask from "../../../assets/EYEMASKS.jpg";
import cushions from "../../../assets/CUSHIONS.jpg";
const AccessoriesSection = () => {
  const navigate = useNavigate();

  // Define all accessories categories with their details
  const accessoriesCategories = [
    {
      id: "scrunchies",
      title: "Scrunchies",
      description: "Elegant hair accessories for every style",
      // image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNjcnVuY2hpZXM8L3RleHQ+Cjwvc3ZnPg==",
      image:SCRUNCHIES,
      gradient: "from-pink-500/20 via-rose-500/10 to-transparent",
      featured: true // Featured accessory
    },
    {
      id: "socks",
      title: "Socks",
      description: "Premium comfort for your feet",
      image:Socks,
      // image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlNvY2tzPC90ZXh0Pgo8L3N2Zz4=",
      gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
      featured: true // Featured accessory
    },
    {
      id: "eyemasks",
      title: "Eye Masks",
      description: "Luxury sleep accessories for better rest",
      image:eyemask,
      // image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkV5ZSBNYXNrczwvdGV4dD4KPC9zdmc+",
      gradient: "from-purple-500/20 via-indigo-500/10 to-transparent",
      featured: false
    },
    {
      id: "headband",
      title: "Headbands",
      description: "Sophisticated hair styling essentials",
      image:headband,
      // image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkhlYWRiYW5kczwvdGV4dD4KPC9zdmc+",
      gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
      featured: false
    },
    {
      id: "cushions",
      title: "Cushions",
      description: "Decorative comfort for your home",
      image:cushions,
      // image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkN1c2hpb25zPC90ZXh0Pgo8L3N2Zz4=",
      gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
      featured: false
    }
  ];

  const handleNavigate = (category) => {
    navigate(`/products/${category.toLowerCase()}`);
  };

  return (
    <section 
      className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 bg-white overflow-hidden"
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
          Accessories
        </h2>
        <div className="w-16 h-1 bg-luxury-gold mx-auto mb-6"></div>
        <p className="text-text-medium text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
          Essential luxury accessories for every lifestyle
        </p>
      </div>

      {/* Premium Accessories Showcase - Enhanced Mobile Responsiveness */}
      <div className="space-y-6 md:space-y-8 lg:space-y-12">
        {/* Featured Accessories - Large Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {accessoriesCategories.filter(cat => cat.featured).map((category) => (
            <article
              key={category.id}
              className="group bg-white border border-text-light/10 overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 flex flex-col relative"
              onClick={() => handleNavigate(category.id)}
            >
              {/* Luxury Gold Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              
              <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden bg-premium-cream">
                <img
                  src={category.image}
                  alt={`${category.title} Collection`}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+";
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent ${category.gradient}`}></div>
                
                {/* Luxury border overlay */}
                <div className="absolute inset-0 border-2 border-white/20 group-hover:border-luxury-gold/40 transition-all duration-500"></div>
                
                {/* Featured badge */}
                <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-3 py-1.5 sm:px-4 sm:py-2 bg-luxury-gold text-black text-xs font-semibold uppercase tracking-widest">
                  Featured
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider mb-3 group-hover:scale-105 transition-transform duration-300">
                    {category.title}
                  </div>
                  <div className="text-white/90 text-sm sm:text-base lg:text-lg tracking-wide mb-4">
                    {category.description}
                  </div>
                  <div className="text-luxury-gold text-xs sm:text-sm uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                    Explore Collection →
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Regular Accessories - Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {accessoriesCategories.filter(cat => !cat.featured).map((category) => (
            <article
              key={category.id}
              className="group bg-white border border-text-light/10 overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transition-all duration-700 flex flex-col relative"
              onClick={() => handleNavigate(category.id)}
            >
              {/* Luxury Gold Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              
              <div className="relative h-[180px] sm:h-[220px] md:h-[280px] lg:h-[320px] overflow-hidden bg-premium-cream">
                <img
                  src={category.image}
                  alt={`${category.title} Collection`}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+";
                  }}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent ${category.gradient}`}></div>
                
                {/* Luxury border overlay */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6">
                  <div className="text-base sm:text-lg lg:text-xl font-bold text-white uppercase tracking-wider mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300">
                    {category.title}
                  </div>
                  <div className="text-white/90 text-xs sm:text-sm tracking-wide line-clamp-2">
                    {category.description}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Luxury Call-to-Action */}
      <div className="text-center mt-12 md:mt-16">
        {/* <button 
          onClick={() => navigate('/products/accessories')}
          className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-black to-text-dark text-white font-semibold text-base sm:text-lg uppercase tracking-widest hover:bg-luxury-gold hover:text-white transition-all duration-500 transform hover:scale-105 border-2 border-black hover:border-luxury-gold shadow-lg hover:shadow-2xl"
        >
          View All Accessories
        </button> */}
      </div>
    </section>
  );
};

export default AccessoriesSection;
