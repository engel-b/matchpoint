import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import de from "./de.json";
import en from "./en.json";

i18n.use(initReactI18next).init({
  resources: {
    de: { translation: de },
    en: { translation: en },
  },
  lng: "de",
  fallbackLng: "de",
  interpolation: {
    escapeValue: false,
  },
  debug: import.meta.env.DEV,

  saveMissing: import.meta.env.DEV,

  missingKeyHandler: (lng, ns, key) => {
    console.warn(`[i18n] Missing translation: ${key} (${lng})`);
  },
});

export default i18n;
