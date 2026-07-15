export type Currency = "NGN" | "USD" | "GBP";

export const CURRENCIES: Record<
  Currency,
  { symbol: string; label: string; rate: number }
> = {
  NGN: { symbol: "₦", label: "NGN", rate: 1 },
  // NOTE: These rates are static approximations. For a production real-estate
  // site, fetch live rates from an API (e.g. exchangerate.host) at build time
  // or daily via cron. A 10% rate error on a ₦120M property = ₦12M discrepancy.
  USD: { symbol: "$", label: "USD", rate: 1 / 1500 },
  GBP: { symbol: "£", label: "GBP", rate: 1 / 1900 },
};

export function formatMoney(amountNGN: number, currency: Currency): string {
  if (!isFinite(amountNGN)) return "—";
  const cur = CURRENCIES[currency];
  const amount = amountNGN * cur.rate;
  // Use en-US for reliable cross-platform grouping (en-NG falls back in some Node ICU builds)
  return `${cur.symbol}${amount.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;
}

/**
 * Compact formatter for tight spaces (e.g. stat cards, ranges).
 * ₦2,000,000 → "₦2M", $1,333 → "$1K", ₦17,000,000 → "₦17M"
 */
export function formatCompact(amountNGN: number, currency: Currency): string {
  if (!isFinite(amountNGN)) return "—";
  const cur = CURRENCIES[currency];
  const amount = amountNGN * cur.rate;
  if (amount >= 1_000_000) {
    const m = amount / 1_000_000;
    return `${cur.symbol}${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (amount >= 1_000) {
    return `${cur.symbol}${Math.round(amount / 1_000)}K`;
  }
  return `${cur.symbol}${Math.round(amount)}`;
}
