"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrency } from "@/components/providers/currency-provider";
import { TrendingUp, Calendar, Wallet, Target } from "lucide-react";

const ANNUAL_RETURN_RATE = 0.071;
const MGMT_FEE = 0.15;
const ANNUAL_APPRECIATION_RATE = 0.026;

const PROPERTY_PRESETS = [
  { label: "Sinai Spaces Studio (Basic)", price: 17_000_000 },
  { label: "Sinai Spaces Studio (Premium)", price: 20_000_000 },
  { label: "Sinai Residence Studio", price: 19_990_000 },
  { label: "Sinai Residence 1BR", price: 29_990_000 },
  { label: "Crest Residence Studio", price: 40_000_000 },
  { label: "Crest Residence 1BR", price: 60_000_000 },
  { label: "Crest Residence 2BR", price: 80_000_000 },
  { label: "Sinai Residence 1BR+Office", price: 100_000_000 },
  { label: "Sinai Residence 2BR+Office", price: 120_000_000 },
];

export function ROICalculator() {
  const { format, convert, currency } = useCurrency();
  const [purchasePrice, setPurchasePrice] = useState(40_000_000);
  const [downPaymentPct, setDownPaymentPct] = useState(30);
  const [leaseYears, setLeaseYears] = useState(17);
  const [mode, setMode] = useState<"earn" | "live">("earn");

  const calculations = useMemo(() => {
    const downPayment = purchasePrice * (downPaymentPct / 100);
    const financedAmount = purchasePrice - downPayment;
    const grossAnnualReturn = purchasePrice * ANNUAL_RETURN_RATE;
    const netAnnualReturn = mode === "earn" ? grossAnnualReturn * (1 - MGMT_FEE) : 0;
    const totalReturnsOverLease = netAnnualReturn * leaseYears;
    const propertyAppreciation = purchasePrice * ANNUAL_APPRECIATION_RATE * leaseYears;
    const totalValueAtEnd = purchasePrice + propertyAppreciation + totalReturnsOverLease;
    const roi = ((totalValueAtEnd - purchasePrice) / purchasePrice) * 100;
    const breakEvenYear = netAnnualReturn > 0 ? Math.ceil(downPayment / netAnnualReturn) : Infinity;

    return {
      downPayment,
      financedAmount,
      grossAnnualReturn,
      netAnnualReturn,
      totalReturnsOverLease,
      propertyAppreciation,
      totalValueAtEnd,
      roi,
      breakEvenYear,
    };
  }, [purchasePrice, downPaymentPct, leaseYears, mode]);

  const formatSafe = (n: number) => {
    if (!isFinite(n)) return "—";
    return format(n);
  };

  return (
    <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] p-5 sm:p-8">
      <div className="mb-6">
        <h3 className="font-serif text-2xl text-white sm:text-3xl">ROI Calculator</h3>
        <p className="mt-1.5 text-sm text-white/50">
          Adjust the sliders to model your investment returns. All figures are projections based on Engrite&apos;s 7.1% historical yield.
        </p>
      </div>

      {/* Mode toggle */}
      <div className="mb-6">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          Investment Mode
        </label>
        <Tabs value={mode} onValueChange={(v) => setMode(v as "earn" | "live")}>
          <TabsList className="grid w-full grid-cols-2 bg-[rgba(255,255,255,0.05)]">
            <TabsTrigger value="earn" className="text-xs data-[state=active]:bg-[#2BA84A] data-[state=active]:text-white">
              Earn (Rental Income)
            </TabsTrigger>
            <TabsTrigger value="live" className="text-xs data-[state=active]:bg-[#2BA84A] data-[state=active]:text-white">
              Live (Owner Occupied)
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Preset buttons */}
      <div className="mb-6">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          Quick Select Property
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PROPERTY_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => setPurchasePrice(p.price)}
              className={`px-3 py-2.5 text-left text-[11px] uppercase tracking-wider transition-all ${
                purchasePrice === p.price
                  ? "bg-[#2BA84A] text-white"
                  : "bg-[rgba(255,255,255,0.05)] text-white/60 hover:bg-[rgba(255,255,255,0.1)]"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="purchase-price" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              Purchase Price
            </label>
            <span className="font-serif text-lg text-[#7fd89a]">
              {formatSafe(purchasePrice)}
            </span>
          </div>
          <input
            id="purchase-price"
            type="range"
            min={17_000_000}
            max={150_000_000}
            step={1_000_000}
            value={purchasePrice}
            onChange={(e) => setPurchasePrice(Number(e.target.value))}
            className="w-full accent-[#2BA84A]"
            aria-label="Purchase price"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="down-payment" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              Down Payment
            </label>
            <span className="font-serif text-lg text-[#7fd89a]">
              {downPaymentPct}% · {formatSafe(calculations.downPayment)}
            </span>
          </div>
          <input
            id="down-payment"
            type="range"
            min={10}
            max={100}
            step={5}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full accent-[#2BA84A]"
            aria-label="Down payment percentage"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="lease-years" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              Lease Term
            </label>
            <span className="font-serif text-lg text-[#7fd89a]">
              {leaseYears} years
            </span>
          </div>
          <input
            id="lease-years"
            type="range"
            min={5}
            max={17}
            step={1}
            value={leaseYears}
            onChange={(e) => setLeaseYears(Number(e.target.value))}
            className="w-full accent-[#2BA84A]"
            aria-label="Lease years"
          />
        </div>
      </div>

      {/* Results */}
      <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="bg-[#2BA84A] p-4 sm:col-span-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
            Total ROI at end of lease
          </div>
          <div className="mt-1.5 font-serif text-3xl text-white sm:text-4xl">
            +{calculations.roi.toFixed(1)}%
          </div>
          <div className="mt-1 text-xs text-white/70">
            Total value: {formatSafe(calculations.totalValueAtEnd)}
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.04)] p-4 border border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
            <Target className="h-3 w-3" />
            Break-Even
          </div>
          <div className="mt-1.5 font-serif text-xl text-[#7fd89a]">
            {calculations.breakEvenYear === Infinity ? "—" : `Year ${calculations.breakEvenYear}`}
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.04)] p-4 border border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
            <TrendingUp className="h-3 w-3" />
            Annual Return
          </div>
          <div className="mt-1.5 font-serif text-xl text-[#7fd89a]">
            {mode === "earn" ? formatSafe(calculations.netAnnualReturn) : "Owner-occupied"}
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.04)] p-4 border border-[rgba(255,255,255,0.08)]">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
            <Calendar className="h-3 w-3" />
            {leaseYears}-Year Total
          </div>
          <div className="mt-1.5 font-serif text-xl text-[#7fd89a]">
            {mode === "earn" ? formatSafe(calculations.totalReturnsOverLease) : "—"}
          </div>
        </div>

        <div className="bg-[rgba(255,255,255,0.04)] p-4 border border-[rgba(255,255,255,0.08)] sm:col-span-3">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
            <Wallet className="h-3 w-3" />
            Est. Appreciation
          </div>
          <div className="mt-1.5 font-serif text-xl text-[#7fd89a]">
            +{formatSafe(calculations.propertyAppreciation)}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[10px] text-white/50">
        Projections based on historical Engrite performance (7.1% gross yield, 15% management fee, ~2.6% annual capital appreciation). Past performance does not guarantee future results. Figures shown in {currency}.
      </p>
    </div>
  );
}
