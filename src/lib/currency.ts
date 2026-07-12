export type Currency = "NGN" | "USD" | "GBP";

export const CURRENCIES: Record<
  Currency,
  { symbol: string; label: string; rate: number }
> = {
  NGN: { symbol: "₦", label: "NGN", rate: 1 },
  USD: { symbol: "$", label: "USD", rate: 1 / 1500 },
  GBP: { symbol: "£", label: "GBP", rate: 1 / 1900 },
};

export function formatMoney(amountNGN: number, currency: Currency): string {
  const cur = CURRENCIES[currency];
  const amount = amountNGN * cur.rate;
  if (currency === "NGN") {
    return `${cur.symbol}${amount.toLocaleString("en-NG", {
      maximumFractionDigits: 0,
    })}`;
  }
  return `${cur.symbol}${amount.toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;
}
