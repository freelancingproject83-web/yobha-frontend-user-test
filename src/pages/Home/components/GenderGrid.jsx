import React from "react";
import { useNavigate } from "react-router-dom";
import MEN_IMAGE from "../../../assets/Men.png";
import WOMEN_IMAGE from "../../../assets/Women.png";
import KID_IMAGE from "../../../assets/kids-hero.jpg";
import PET_IMAGE from "../../../assets/pet-hero.jpg";
import COUPLE_IMAGE from "../../../assets/couple-hero1.jpg";
import FAMILY_IMAGE from "../../../assets/family-hero.jpg";

const GenderGrid = () => {
  const navigate = useNavigate();

  const genderCategories = [
    {
      id: "Women",
      title: "Women",
      description: "The art of elegance and grace",
      image: WOMEN_IMAGE,
      gradient: "from-pink-500/20 via-purple-500/10 to-transparent",
      size: "large",
    },
    {
      id: "men",
      title: "Men",
      description: "Classic sophistication redefined",
      image: MEN_IMAGE,
      gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
      size: "large",
    },
    {
      id: "kids",
      title: "Kids",
      description: "Playful comfort for little ones",
      image: KID_IMAGE,
      gradient: "from-yellow-500/20 via-orange-500/10 to-transparent",
      size: "medium",
    },
    {
      id: "pets",
      title: "Pets",
      description: "Luxury comfort for your furry friends",
      image: PET_IMAGE,
      gradient: "from-green-500/20 via-teal-500/10 to-transparent",
      size: "medium",
    },
    {
      id: "couple",
      title: "Couple",
      description: "Matching elegance for two",
      image: COUPLE_IMAGE,
      gradient: "from-red-500/20 via-pink-500/10 to-transparent",
      size: "small",
    },
    {
      id: "family",
      title: "Family",
      description: "Comfort for the whole family",
      image: FAMILY_IMAGE,
      gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
      size: "small",
    },
  ];

  const handleNavigate = (category) => {
    navigate(`/products/${category}`);
  };

  return (
    <section
      className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 bg-premium-beige overflow-hidden"
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
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest text-black uppercase mb-4">
          Indulge in Luxury
        </h2>
        <div className="w-20 h-1 bg-luxury-gold mx-auto mb-6"></div>
        <p className="text-text-medium text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
          Discover timeless elegance, curated collections, and the art of refined living.  
          Every choice whispers sophistication, every detail sparkles.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="space-y-4 sm:space-y-0">
        {/* Mobile Layout - 2 Columns Grid */}
        <div className="block sm:hidden">
          <div className="grid grid-cols-2 gap-4">
            {genderCategories.map((category) => {
              const slogans = {
                large: "Step into elegance →",
                medium: "Curated for you →",
                small: "Luxury at a glance →",
              };
              return (
              <article
                key={category.id}
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 bg-white"
                onClick={() => handleNavigate(category.id)}
              >
                {/* Gold Accent Bar */}
            

                {/* Image Container */}
                <div className="relative h-[250px] overflow-hidden bg-premium-cream">
                  <img
                    src={category.image}
                    alt={`${category.title} Collection`}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+";
                    }}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent ${category.gradient}`}
                  ></div>

                  {/* Text Overlay - Mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <div className="flex flex-col items-start">
                      <div className="text-lg font-bold text-white uppercase tracking-wider mb-1 text-left">
                        {category.title}
                      </div>
                      <div className="text-white/90 text-xs tracking-wide mb-2 text-left">
                        {category.description}
                      </div>
                      <div className="text-luxury-gold text-[10px] uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                        {slogans[category.size]}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
              );
            })}
          </div>
        </div>

        {/* Tablet Layout - 2x3 Grid */}
        <div className="hidden sm:block lg:hidden">
          <div className="grid grid-cols-2 gap-6">
            {/* Large Cards - Full Width */}
            <article
              className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 bg-white col-span-2"
              onClick={() => handleNavigate("Women")}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <div className="relative h-[350px] overflow-hidden bg-premium-cream">
                <img
                  src={WOMEN_IMAGE}
                  alt="Women Collection"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-pink-500/20 via-purple-500/10 to-transparent"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-col items-start">
                    <div className="text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300 text-left">
                      Women
                    </div>
                    <div className="text-white/90 text-sm tracking-wide mb-2 text-left">
                      The art of elegance and grace
                    </div>
                    <div className="text-luxury-gold text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                      Step into elegance →
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article
              className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 bg-white col-span-2"
              onClick={() => handleNavigate("men")}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <div className="relative h-[350px] overflow-hidden bg-premium-cream">
                <img
                  src={MEN_IMAGE}
                  alt="Men Collection"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-blue-500/20 via-indigo-500/10 to-transparent"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex flex-col items-start">
                    <div className="text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300 text-left">
                      Men
                    </div>
                    <div className="text-white/90 text-sm tracking-wide mb-2 text-left">
                      Classic sophistication redefined
                    </div>
                    <div className="text-luxury-gold text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                      Step into elegance →
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Medium Cards - 1 column each */}
            <article
              className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 bg-white"
              onClick={() => handleNavigate("kids")}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <div className="relative h-[280px] overflow-hidden bg-premium-cream">
                <img
                  src={KID_IMAGE}
                  alt="Kids Collection"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-yellow-500/20 via-orange-500/10 to-transparent"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-col items-start">
                    <div className="text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300 text-left">
                      Kids
                    </div>
                    <div className="text-white/90 text-sm tracking-wide mb-2 text-left">
                      Playful comfort for little ones
                    </div>
                    <div className="text-luxury-gold text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                      Curated for you →
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article
              className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 bg-white"
              onClick={() => handleNavigate("pets")}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <div className="relative h-[280px] overflow-hidden bg-premium-cream">
                <img
                  src={PET_IMAGE}
                  alt="Pets Collection"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-green-500/20 via-teal-500/10 to-transparent"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-col items-start">
                    <div className="text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300 text-left">
                      Pets
                    </div>
                    <div className="text-white/90 text-sm tracking-wide mb-2 text-left">
                      Luxury comfort for your furry friends
                    </div>
                    <div className="text-luxury-gold text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                      Curated for you →
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Small Cards - 1 column each with consistent sizing */}
            <article
              className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 bg-white"
              onClick={() => handleNavigate("couple")}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <div className="relative h-[280px] overflow-hidden bg-premium-cream">
                <img
                  src={COUPLE_IMAGE}
                  alt="Couple Collection"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-red-500/20 via-pink-500/10 to-transparent"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-col items-start">
                    <div className="text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300 text-left">
                      Couple
                    </div>
                    <div className="text-white/90 text-sm tracking-wide mb-2 text-left">
                      Matching elegance for two
                    </div>
                    <div className="text-luxury-gold text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                      Luxury at a glance →
                    </div>
                  </div>
                </div>
              </div>
            </article>

            <article
              className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 bg-white"
              onClick={() => handleNavigate("family")}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
              <div className="relative h-[280px] overflow-hidden bg-premium-cream">
                <img
                  src={FAMILY_IMAGE}
                  alt="Family Collection"
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-indigo-500/20 via-purple-500/10 to-transparent"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex flex-col items-start">
                    <div className="text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300 text-left">
                      Family
                    </div>
                    <div className="text-white/90 text-sm tracking-wide mb-2 text-left">
                      Comfort for the whole family
                    </div>
                    <div className="text-luxury-gold text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                      Luxury at a glance →
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Desktop Layout - Mixed Grid (2 + 4 columns) */}
        <div className="hidden lg:block">
          <div className="space-y-8">
            {/* Row 1: Women & Men - 2 Columns */}
            <div className="grid grid-cols-2 gap-8">
              {/* Women - Half Width Card */}
              <article
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 flex flex-col"
                onClick={() => handleNavigate("Women")}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
                <div className="relative h-[500px] overflow-hidden bg-premium-cream">
                  <img
                    src={WOMEN_IMAGE}
                    alt="Women Collection"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-pink-500/20 via-purple-500/10 to-transparent"></div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex flex-col items-start">
                      <div className="text-4xl font-bold text-white uppercase tracking-wider mb-3 group-hover:scale-105 transition-transform duration-300 text-left">
                        Women
                      </div>
                      <div className="text-white/90 text-lg tracking-wide mb-3 text-left">
                        The art of elegance and grace
                      </div>
                      <div className="text-luxury-gold text-sm uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                        Step into elegance →
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Men - Half Width Card */}
              <article
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 flex flex-col"
                onClick={() => handleNavigate("men")}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
                <div className="relative h-[500px] overflow-hidden bg-premium-cream">
                  <img
                    src={MEN_IMAGE}
                    alt="Men Collection"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-blue-500/20 via-indigo-500/10 to-transparent"></div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex flex-col items-start">
                      <div className="text-4xl font-bold text-white uppercase tracking-wider mb-3 group-hover:scale-105 transition-transform duration-300 text-left">
                        Men
                      </div>
                      <div className="text-white/90 text-lg tracking-wide mb-3 text-left">
                        Classic sophistication redefined
                      </div>
                      <div className="text-luxury-gold text-sm uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                        Step into elegance →
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>

            {/* Row 2: Kids, Couple, Family, Pets - 4 Columns */}
            <div className="grid grid-cols-4 gap-6">
              {/* Kids */}
              <article
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 flex flex-col"
                onClick={() => handleNavigate("kids")}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
                <div className="relative h-[350px] overflow-hidden bg-premium-cream">
                  <img
                    src={KID_IMAGE}
                    alt="Kids Collection"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-yellow-500/20 via-orange-500/10 to-transparent"></div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex flex-col items-start">
                      <div className="text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300 text-left">
                        Kids
                      </div>
                      <div className="text-white/90 text-sm tracking-wide mb-2 text-left">
                        Playful comfort for little ones
                      </div>
                      <div className="text-luxury-gold text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                        Curated for you →
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Couple */}
              <article
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 flex flex-col"
                onClick={() => handleNavigate("couple")}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
                <div className="relative h-[350px] overflow-hidden bg-premium-cream">
                  <img
                    src={COUPLE_IMAGE}
                    alt="Couple Collection"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-red-500/20 via-pink-500/10 to-transparent"></div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex flex-col items-start">
                      <div className="text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300 text-left">
                        Couple
                      </div>
                      <div className="text-white/90 text-sm tracking-wide mb-2 text-left">
                        Matching elegance for two
                      </div>
                      <div className="text-luxury-gold text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                        Luxury at a glance →
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Family */}
              <article
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 flex flex-col"
                onClick={() => handleNavigate("family")}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
                <div className="relative h-[350px] overflow-hidden bg-premium-cream">
                  <img
                    src={FAMILY_IMAGE}
                    alt="Family Collection"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-indigo-500/20 via-purple-500/10 to-transparent"></div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex flex-col items-start">
                      <div className="text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300 text-left">
                        Family
                      </div>
                      <div className="text-white/90 text-sm tracking-wide mb-2 text-left">
                        Comfort for the whole family
                      </div>
                      <div className="text-luxury-gold text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                        Luxury at a glance →
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Pets */}
              <article
                className="group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 flex flex-col"
                onClick={() => handleNavigate("pets")}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
                <div className="relative h-[350px] overflow-hidden bg-premium-cream">
                  <img
                    src={PET_IMAGE}
                    alt="Pets Collection"
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent from-green-500/20 via-teal-500/10 to-transparent"></div>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex flex-col items-start">
                      <div className="text-xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300 text-left">
                        Pets
                      </div>
                      <div className="text-white/90 text-sm tracking-wide mb-2 text-left">
                        Luxury comfort for your furry friends
                      </div>
                      <div className="text-luxury-gold text-xs uppercase tracking-widest group-hover:text-white transition-colors duration-300 text-left">
                        Curated for you →
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

      {/* Call-to-Action */}
      <div className="text-center mt-12 md:mt-16">
        {/* <button className="px-8 py-4 bg-gradient-to-r from-black to-text-dark text-white font-semibold text-lg uppercase tracking-widest hover:bg-luxury-gold hover:text-white transition-all duration-500 transform hover:scale-105 border-2 border-black hover:border-luxury-gold shadow-lg hover:shadow-2xl">
          Explore All Collections
        </button> */}
      </div>
    </section>
  );
};

export default GenderGrid;
