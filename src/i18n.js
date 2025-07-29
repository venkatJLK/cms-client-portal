import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./translations/en/common.json";
import thTranslation from "./translations/th/common.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    th: { translation: thTranslation },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
