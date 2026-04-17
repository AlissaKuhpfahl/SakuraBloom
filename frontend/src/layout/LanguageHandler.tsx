// Das ist ein unsichtbares Helper-Component, das:URL → Sprache synchronisiert
//layout/LanguageHandler.tsx
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import i18n from "i18next";

export default function LanguageHandler() {
  const { lang } = useParams();

  useEffect(() => {
    if (lang) {
      i18n.changeLanguage(lang);
      localStorage.setItem("lang", lang);
    }
  }, [lang]);

  return null;
}
