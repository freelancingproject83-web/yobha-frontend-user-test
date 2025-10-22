import React, { useState, useEffect } from "react";
// import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("English");

  const languages = [
    { code: "en", label: "English" },
    // { code: "hi", label: "Hindi" },
    // { code: "ar", label: "Arabic" },
  ];

  // Set default language to English on mount
  useEffect(() => {
    // i18n.changeLanguage("en");
    setCurrentLang("English");
  }, []);

  const handleLanguageChange = (code, label) => {
    // i18n.changeLanguage(code);
    setCurrentLang(label);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-3 py-2 bg-white text-sm font-medium text-black hover:bg-gray-50 focus:outline-none"
      >
        {currentLang}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 111.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code, lang.label)}
                className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100"
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
