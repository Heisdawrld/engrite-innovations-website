"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Currency, CURRENCIES, formatMoney } from "@/lib/currency";

type CurrencyContextValue = {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  format: (amountNGN: number) => string;
  convert: (amountNGN: number) => number;
};

const CurrencyContext = createContext<CurrencyContextValue | undefined>(
  undefined,
);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("NGN");

  useEffect(() => {
    const stored = localStorage.getItem("engrite-currency") as Currency | null;
    if (stored && CURRENCIES[stored]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrencyState(stored);
    } else {
      const locale = navigator.language;
      if (locale.startsWith("en-GB")) {
        setCurrencyState("GBP");
      } else if (locale.startsWith("en-US")) {
        setCurrencyState("USD");
      }
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("engrite-currency", c);
  };

  const convert = (amountNGN: number) => amountNGN * CURRENCIES[currency].rate;
  const format = (amountNGN: number) => formatMoney(amountNGN, currency);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, format, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
