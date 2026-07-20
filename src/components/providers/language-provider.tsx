"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
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

const STORAGE_KEY = "engrite-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("en");

  // Hydrating from localStorage after mount avoids SSR/first-paint mismatches
  // on static export.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (stored && translations[stored]) {
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
  /* eslint-enable react-hooks/set-state-in-effect */

  const setLang = useCallback((l: Language) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore storage errors
    }
    document.documentElement.lang = l;
  }, []);

  const value = useMemo<LanguageContextValue>(() => {
    const t = (key: string) =>
      translations[lang][key] ?? translations.en[key] ?? key;
    return { lang, setLang, t };
  }, [lang, setLang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
