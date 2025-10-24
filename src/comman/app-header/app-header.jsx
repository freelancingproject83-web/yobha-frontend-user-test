import React, { useState, useEffect, useRef, useCallback } from "react";
import { LogOut, Menu, X, User, Heart, Package, Search, ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { BsBag } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { LocalStorageKeys } from "../../constants/localStorageKeys";
import * as localStorageService from "../../service/localStorageService";
import logoImage from "../../assets/yobhaLogo.png";
import { useSelector } from "react-redux";
import LanguageSwitcher from "../../LanguageSwitcher";
import { getFilteredProducts } from "../../service/productAPI";
import { useTranslation } from "react-i18next";

const HeaderWithSidebar = () => {
  const { t, i18n } = useTranslation();
  const cartCount = useSelector(state => state.cart.count);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const menuItems = [
  { label: t("navbar.menu.home." + i18n.language), nav: "Home" },
  { label: t("navbar.menu.collections." + i18n.language), nav: "Collections" },
  { label: t("navbar.menu.about." + i18n.language), nav: "About" },
  { label: t("navbar.menu.contact." + i18n.language), nav: "Contact" },
];

const collectionItems = [
  { label: t("navbar.collectionsItems.sleepwear." + i18n.language), nav: "Sleepwear" },
  { label: t("navbar.collectionsItems.loungewear." + i18n.language), nav: "Loungewear" },
  { label: t("navbar.collectionsItems.homewear." + i18n.language), nav: "Homewear" },
  { label: t("navbar.collectionsItems.accessories." + i18n.language), nav: "Accessories" },
  { label: t("navbar.collectionsItems.petAccessories." + i18n.language), nav: "PetAccessories" },
];

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorageService.getValue(LocalStorageKeys.AuthToken);
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth); // update if storage changes
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Trigger cart animation only when cart count increases (product added)
  const [prevCartCount, setPrevCartCount] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize previous count on first load
    if (!isInitialized) {
      setPrevCartCount(cartCount);
      setIsInitialized(true);
      return;
    }

    // Only animate if cart count increased (product was added)
    if (cartCount > prevCartCount && cartCount > 0) {
      setCartAnimation(true);
      const timer = setTimeout(() => setCartAnimation(false), 600);
      setPrevCartCount(cartCount);
      return () => clearTimeout(timer);
    } else if (cartCount !== prevCartCount) {
      // Update previous count without animation for other changes
      setPrevCartCount(cartCount);
    }
  }, [cartCount, prevCartCount, isInitialized]);

  // Logout function
  const handleLogout = () => {
    localStorageService.clearAll(); // clear all keys
    setIsAuthenticated(false);
    navigate("/login");
  };

  // Accordion toggle function
  const toggleAccordion = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Search functionality
  const handleSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await getFilteredProducts({
        q: query,
        category: "",
        subCategory: "",
        minPrice: null,
        maxPrice: null,
        pageNumber: 1,
        pageSize: 10,
        sort: "latest",
        country: null,
      });


      if (response?.success && response.data) {
        setSearchResults(response.data.items || []);
        setShowSearchResults(true);
      } else {
        setSearchResults([]);
        setShowSearchResults(true);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
      setShowSearchResults(true);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  // Handle search input change with debounce
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Clear previous timeout
    if (window.searchTimeout) {
      clearTimeout(window.searchTimeout);
    }

    if (query.trim()) {
      // Debounce search by 300ms
      window.searchTimeout = setTimeout(() => {
        handleSearch(query);
      }, 300);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Handle search result click
  const handleSearchResultClick = (product) => {
    navigate(`/productDetail/${product.id}`);
    setSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
    setShowSearchResults(false);
  };

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <header
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)]"
      style={{
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",

      }}
    >
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-4 md:px-8 lg:px-12 py-4">

        {/* Mobile Layout */}
        <div className="flex items-center justify-between w-full md:hidden">
          {/* Left Side - Mobile Menu & Search */}
          <div className="flex items-center gap-4">
            <button
              className="flex items-center justify-center w-8 h-8 focus:outline-none text-black hover:text-gray-700 transition-colors duration-300"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>

            <button
              className="flex items-center justify-center w-8 h-8 text-black hover:text-gray-700 transition-colors duration-300"
              onClick={() => setSearchOpen(!searchOpen)}
              title="Search"
            >
              <Search size={20} />
            </button>
          </div>

          {/* Center - Logo (Mobile) */}
          <Link
            to="/"
            className="flex items-center"
          >
            <img
              src={logoImage}
              alt="YOBHA Logo"
              className="h-8"
            />
          </Link>

          {/* Right Side - Wishlist & Cart (Mobile) */}
          <div className="flex items-center gap-4">
            {/* Wishlist Icon - Mobile */}
            <Link
              to="/wishlist"
              className="flex items-center justify-center w-8 h-8 text-black hover:text-gray-700 transition-colors duration-300 relative"
              title="Wishlist"
            >
              <Heart size={20} strokeWidth={1.8} />
            </Link>

            {/* Cart Icon - Mobile */}
            <Link
              to="/cart"
              className="flex items-center justify-center w-8 h-8 text-black hover:text-gray-700 transition-colors duration-300 relative"
              title="Shopping Cart"
            >
              <BsBag
                size={20}
                className={`transition-all duration-300 ${cartAnimation ? "scale-110" : "scale-100"}`}
              />
              {cartCount > 0 && (
                <span className={`absolute -top-2 -right-2 bg-luxury-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg transition-all duration-300 ${cartAnimation ? "scale-125" : "scale-100"}`}>
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Desktop/Tablet Layout - Luxury Minimal Design */}
        <div className="hidden md:flex items-center justify-between w-full px-6">
          {/* Left Section - Logo & Navigation */}
          <div className="flex items-center space-x-12">
            {/* YOBHA Logo */}
            <Link
              to="/"
              className="flex items-center group"
            >
              <img
                src={logoImage}
                alt="YOBHA Logo"
                className="h-9 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Navigation Menu - Luxury Typography */}
            <nav className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <div key={item.nav} className="relative group">
                  {item.nav === "Collections" ? (
                    <button className="text-black hover:text-luxury-gold transition-all duration-300 font-medium text-sm tracking-wide uppercase relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
                    </button>
                  ) : (
                    <Link
                      to={item === "Home" ? "/" : `/${item.nav.toLowerCase()}`}
                      className="text-black hover:text-luxury-gold transition-all duration-300 font-medium text-sm tracking-wide uppercase relative"
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}

                  {/* Collections Dropdown - Luxury Design */}
                  {item.nav === "Collections" && (
                    <div className="absolute top-10 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-100 bg-white rounded-2xl p-6 min-w-[280px] shadow-2xl border border-gray-100">
                      <div className="space-y-3">
                        {collectionItems.map((cat) => (
                          <Link
                            key={cat.label}
                            to={`/products/${cat.nav.replace(/\s/g, "-")}`}
                            className="block px-4 py-3 rounded-xl hover:bg-luxury-gold/5 transition-all duration-300 text-sm text-black hover:text-luxury-gold font-medium tracking-wide"
                          >
                            {cat.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative" ref={searchRef}>
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={t("navbar.placeholders.search." + i18n.language)}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-luxury-gold/20 focus:border-luxury-gold/30 text-sm bg-gray-50/50 transition-all duration-300 hover:bg-white"
                />
                {searchLoading && (
                  <Loader2 size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
                )}
              </div>

              {/* Search Results - Luxury Design */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 max-h-96 overflow-y-auto mt-2">
                  <div className="p-2">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => handleSearchResultClick(product)}
                        className="flex items-center gap-4 p-4 hover:bg-luxury-gold/5 cursor-pointer rounded-xl transition-all duration-300"
                      >
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                          <img
                            src={product.images?.[0] || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop&crop=center"}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-black text-sm leading-tight truncate">{product.name}</h4>
                          <p className="text-gray-500 text-xs uppercase tracking-wide">{product.category}</p>
                          <p className="text-luxury-gold font-semibold text-sm">Rs. {product.price} INR</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results - Luxury Design */}
              {showSearchResults && searchResults.length === 0 && searchQuery.trim() && !searchLoading && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-100 rounded-2xl shadow-2xl z-50 p-6 mt-2">
                  <p className="text-gray-500 text-sm text-center">placeholder={t("navbar.placeholders.search." + i18n.language)}"{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Section - Utilities */}
          <div className="flex items-center space-x-6">
            {/* Language Switcher */}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>

            {/* Account Icon - Luxury Design */}
            {isAuthenticated ? (
              <div className="relative group">
                <button
                  className="flex items-center justify-center w-10 h-10 text-black hover:text-luxury-gold transition-all duration-300 rounded-full hover:bg-luxury-gold/10"
                  title={t("navbar.account.myAccount." + i18n.language)}
                  onClick={() => navigate('/account')}
                >
                  <User size={20} strokeWidth={1.5} />
                </button>

                {/* User Dropdown - Luxury Design */}
                <div className="absolute top-12 right-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 min-w-[220px]">
                    <div className="space-y-1">
                      <Link
                        to="/account"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-luxury-gold/5 transition-all duration-300 text-sm text-black hover:text-luxury-gold font-medium"
                      >
                        <User size={16} />
                        <span>{t("navbar.account.myAccount." + i18n.language)}</span>
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-luxury-gold/5 transition-all duration-300 text-sm text-black hover:text-luxury-gold font-medium"
                      >
                        <Package size={16} />
                        <span>{t("navbar.account.orders." + i18n.language)}</span>
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-luxury-gold/5 transition-all duration-300 text-sm text-black hover:text-luxury-gold font-medium"
                      >
                        <Heart size={16} />
                        <span>{t("navbar.account.wishlist." + i18n.language)}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center justify-center w-10 h-10 text-black hover:text-luxury-gold transition-all duration-300 rounded-full hover:bg-luxury-gold/10"
                title={t("navbar.account.login." + i18n.language)}
              >
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}

            {/* Cart Icon - Luxury Design */}
            <Link
              to="/cart"
              className="flex items-center justify-center w-10 h-10 text-black hover:text-luxury-gold transition-all duration-300 relative rounded-full hover:bg-luxury-gold/10"
              title={t("header.cart")}
            >
              <BsBag
                size={20}
                className={`transition-all duration-300 ${cartAnimation ? "scale-110" : "scale-100"}`}
              />
              {cartCount > 0 && (
                <span className={`absolute -top-1 -right-1 bg-luxury-gold text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-lg transition-all duration-300 ${cartAnimation ? "scale-125" : "scale-100"}`}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Logout Icon - Luxury Design */}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="flex items-center justify-center w-10 h-10 text-black hover:text-luxury-gold transition-all duration-300 rounded-full hover:bg-luxury-gold/10"
                title="Logout"
              >
                <LogOut size={18} strokeWidth={1.5} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div className="relative w-72 bg-white shadow-2xl animate-slideInLeft">
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-300">
              <img
                src={logoImage}
                alt="YOBHA Logo"
                className="h-10"
              />
              <button
                className="text-black hover:text-gray-700 transition-all duration-300"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col p-6 space-y-2 text-black text-base">
              {/* Main Navigation */}
              {menuItems.map((item) => (
                <div key={item.nav} className="w-full">
                  {item.nav === "Collections" ? (
                    <button
                      onClick={() => toggleAccordion('collections')}
                      className="flex items-center justify-between w-full text-black font-semibold py-2 hover:text-gray-700 transition-colors duration-300"
                    >
                      <span>{item.label}</span>
                      {expandedSections.collections ? (
                        <ChevronDown size={18} />
                      ) : (
                        <ChevronRight size={18} />
                      )}
                    </button>
                  ) : (
                    <Link
                      to={item.nav === "Home" ? "/" : `/${item.nav.toLowerCase()}`}
                      className="block w-full text-black hover:text-gray-700 transition-colors duration-300 font-medium py-2"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                  {item.nav === "Collections" && expandedSections.collections && (
                    <div className="pl-4 mt-2 space-y-2 animate-slideDown">
                      {collectionItems.map((cat) => (
                        <Link
                          key={cat.label}
                          to={`/products/${cat.nav.replace(/\s/g, "-")}`}
                          className="block text-black hover:text-gray-700 transition-colors duration-300 py-1 text-sm"
                          onClick={() => setSidebarOpen(false)}
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Account Section - Accordion */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <button
                  onClick={() => toggleAccordion('account')}
                  className="flex items-center justify-between w-full text-black font-semibold py-2 hover:text-gray-700 transition-colors duration-300"
                >
                  <span>{t("navbar.account.myAccount." + i18n.language)}</span>
                  {expandedSections.account ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>

                {expandedSections.account && (
                  <div className="pl-4 mt-2 space-y-2 animate-slideDown">
                    {!isAuthenticated ? (
                      <Link
                        to="/login"
                        className="block text-black hover:text-gray-700 transition-colors duration-300 py-1 text-sm"
                        onClick={() => setSidebarOpen(false)}
                      >
                       { t("navbar.account.login."+i18n.language)}
                      </Link>
                    ) : (
                      <>
                        <Link
                          to="/account"
                          className="flex items-center gap-3 text-black hover:text-gray-700 transition-colors duration-300 py-1 text-sm"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <User size={16} />
                          <span>{t("navbar.account.myAccount." + i18n.language)}</span>
                        </Link>
                        <Link
                          to="/orders"
                          className="flex items-center gap-3 text-black hover:text-gray-700 transition-colors duration-300 py-1 text-sm"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <Package size={16} />
                          <span>{t("navbar.account.orders."+i18n.language)}</span>
                        </Link>
                        <Link
                          to="/wishlist"
                          className="flex items-center gap-3 text-black hover:text-gray-700 transition-colors duration-300 py-1 text-sm"
                          onClick={() => setSidebarOpen(false)}
                        >
                          <Heart size={16} />
                          <span>{t("navbar.account.wishlist."+i18n.language)}</span>
                        </Link>
                        <button
                          onClick={() => {
                            setSidebarOpen(false);
                            handleLogout();
                          }}
                          className="flex items-center gap-3 text-black hover:text-gray-700 transition-colors duration-300 py-1 text-sm text-left w-full"
                        >
                          <LogOut size={16} />
                          <span>{t("navbar.account.logout."+i18n.language)}</span>
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Language Switcher */}
              <div className="pt-4 border-t border-gray-200 mt-4">
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Search Section - Mobile Only */}
      {searchOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg animate-slideDown">
          <div className="max-w-[1600px] mx-auto px-4 py-4">
            {/* Mobile Search Input */}
            <div className="relative" ref={searchRef}>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 relative">
                  <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder={t("header.searchPlaceholder")}
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent text-base"
                  />
                  {searchLoading && (
                    <Loader2 size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 animate-spin" />
                  )}
                </div>
                <button
                  onClick={() => setSearchOpen(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors duration-300 p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Search Results - Mobile */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                  {searchResults.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSearchResultClick(product)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                    >
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0">
                        <img
                          src={product.images?.[0] || "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=100&h=100&fit=crop&crop=center"}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-black text-sm leading-tight truncate">{product.name}</h4>
                        <p className="text-gray-600 text-xs">{product.category}</p>
                        <p className="text-black font-medium text-sm">Rs. {product.price} INR</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No Results - Mobile */}
              {showSearchResults && searchResults.length === 0 && searchQuery.trim() && !searchLoading && (
                <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                  <p className="text-gray-500 text-sm text-center">No products found for "{searchQuery}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease forwards;
        }
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease forwards;
        }
      `}</style>
    </header>
  );
};

export default HeaderWithSidebar;
