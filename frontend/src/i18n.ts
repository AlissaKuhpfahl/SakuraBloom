// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import deCommon from "./translations/de/common";
import enCommon from "./translations/en/common";
import deHome from "./translations/de/home";
import enHome from "./translations/en/home";

i18n.use(initReactI18next).init({
  resources: {
    de: {
      common: deCommon,
      home: deHome
    },
    en: {
      common: enCommon,
      home: enHome
    }
  },
  lng: localStorage.getItem("lang") || "de",
  fallbackLng: "de",
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
