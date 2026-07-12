"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Language, translations } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  useEffect(() => {
    const stored = localStorage.getItem("engrite-lang") as Language | null;
    if (stored && translations[stored]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLangState(stored);
      document.documentElement.lang = stored;
      return;
    }
    // Check URL param
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get("lang") as Language | null;
    if (urlLang && translations[urlLang]) {
      setLangState(urlLang);
      document.documentElement.lang = urlLang;
    }
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem("engrite-lang", l);
    document.documentElement.lang = l;
  };

  const t = (key: string) => translations[lang][key] ?? translations.en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
