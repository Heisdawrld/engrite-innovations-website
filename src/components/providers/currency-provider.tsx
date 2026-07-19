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
import { Currency, CURRENCIES, formatMoney, formatCompact } from "@/lib/currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (amountNGN: number) => string;
  formatCompact: (amountNGN: number) => string;
  convert: (amountNGN: number) => number;
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(
  undefined,
);

const STORAGE_KEY = "engrite-currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("NGN");

  // Hydrating from localStorage after mount avoids SSR/first-paint mismatches
  // on static export.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Currency | null;
    if (stored && CURRENCIES[stored]) {
      setCurrencyState(stored);
    }
    // Default is NGN — no auto-detection needed for a Lagos-based site
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem(STORAGE_KEY, c);
    } catch {
      // ignore storage errors
    }
  }, []);

  const value = useMemo<CurrencyContextValue>(() => {
    const convert = (amountNGN: number) => amountNGN * CURRENCIES[currency].rate;
    const format = (amountNGN: number) => formatMoney(amountNGN, currency);
    const formatCompactFn = (amountNGN: number) =>
      formatCompact(amountNGN, currency);
    return {
      currency,
      setCurrency,
      format,
      formatCompact: formatCompactFn,
      convert,
    };
  }, [currency, setCurrency]);

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
