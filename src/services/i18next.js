import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enLanguage from "@src/i18n/en.json";
import esLanguage from "@src/i18n/es.json";

import { getLocalStorage } from "@src/utils/localStorage";

const getLanguageSaved = getLocalStorage("lang") || "en";

i18next.use(initReactI18next).init({
  resources: {
    en: enLanguage,
    es: esLanguage,
  },
  lng: getLanguageSaved,
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
