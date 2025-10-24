import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translation from "./locales/translation.json";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translation },
      hi: { translation: translation },
      ar: { translation: translation }
    },
    lng: "en", // default language
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });

export default i18n;
