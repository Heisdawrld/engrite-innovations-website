"use client";

import { useCurrency } from "@/components/providers/currency-provider";
import { Currency } from "@/lib/currency";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-[rgba(16,35,87,0.15)] bg-white px-2.5 text-[11px] font-semibold tracking-wider text-[#102357] hover:border-[#2BA84A] hover:text-[#2BA84A]"
          aria-label={`Currency: ${currency}`}
        >
          {currency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[120px]">
        {(["NGN", "USD", "GBP"] as Currency[]).map((c) => (
          <DropdownMenuItem
            key={c}
            onClick={() => setCurrency(c)}
            className={`cursor-pointer text-xs ${
              c === currency ? "font-bold text-[#2BA84A]" : ""
            }`}
          >
            {c}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
