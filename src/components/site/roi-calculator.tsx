"use client";

import { useMemo, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCurrency } from "@/components/providers/currency-provider";
import { Calendar, Target, TrendingUp, Wallet } from "lucide-react";

const DEFAULT_GROSS_YIELD = 14;
const DEFAULT_MANAGEMENT_FEE = 15;

const PROPERTY_PRESETS = [
  { label: "Sinai Spaces Studio (Premium)", price: 20_000_000 },
  { label: "Sinai Spaces 1BR (Premium)", price: 30_000_000 },
  { label: "Crest Residence Studio", price: 40_000_000 },
  { label: "Crest Residence 1BR", price: 60_000_000 },
  { label: "Crest Residence 2BR", price: 80_000_000 },
  { label: "Sinai Residence 1BR + Office", price: 100_000_000 },
  { label: "Sinai Residence 2BR + Office", price: 120_000_000 },
];

export function ROICalculator() {
  const { format, currency } = useCurrency();
  const [purchasePrice, setPurchasePrice] = useState(20_000_000);
  const [grossYieldPct, setGrossYieldPct] = useState(DEFAULT_GROSS_YIELD);
  const [managementFeePct, setManagementFeePct] = useState(DEFAULT_MANAGEMENT_FEE);
  const [leaseYears, setLeaseYears] = useState(17);
  const [mode, setMode] = useState<"earn" | "live">("earn");

  const calculations = useMemo(() => {
    const grossAnnualIncome = purchasePrice * (grossYieldPct / 100);
    const managementCosts = grossAnnualIncome * (managementFeePct / 100);
    const netAnnualIncome =
      mode === "earn" ? grossAnnualIncome - managementCosts : 0;
    const totalNetIncome = netAnnualIncome * leaseYears;
    const netYieldPct =
      mode === "earn" ? grossYieldPct * (1 - managementFeePct / 100) : 0;
    const costRecoveryYears =
      netAnnualIncome > 0 ? purchasePrice / netAnnualIncome : Infinity;

    return {
      grossAnnualIncome,
      managementCosts,
      netAnnualIncome,
      totalNetIncome,
      netYieldPct,
      costRecoveryYears,
    };
  }, [grossYieldPct, leaseYears, managementFeePct, mode, purchasePrice]);

  const formatSafe = (value: number) =>
    Number.isFinite(value) ? format(value) : "—";

  return (
    <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-5 sm:p-8">
      <div className="mb-6">
        <h3 className="font-serif text-2xl text-white sm:text-3xl">
          Investment Scenario
        </h3>
        <p className="mt-1.5 text-sm text-white/50">
          Test a rental scenario using Engrite&apos;s 14% target gross-yield
          assumption. Adjust every major input before making a decision.
        </p>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          Ownership Mode
        </label>
        <Tabs value={mode} onValueChange={(value) => setMode(value as "earn" | "live")}>
          <TabsList className="grid w-full grid-cols-2 bg-[rgba(255,255,255,0.05)]">
            <TabsTrigger
              value="earn"
              className="text-xs data-[state=active]:bg-[#1F7A3A] data-[state=active]:text-white"
            >
              Earn (Rental Income)
            </TabsTrigger>
            <TabsTrigger
              value="live"
              className="text-xs data-[state=active]:bg-[#1F7A3A] data-[state=active]:text-white"
            >
              Live (Owner Occupied)
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="mb-6">
        <label className="mb-2 block text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
          Quick Select Property
        </label>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {PROPERTY_PRESETS.map((property) => (
            <button
              key={property.label}
              type="button"
              onClick={() => setPurchasePrice(property.price)}
              className={`px-3 py-2.5 text-left text-[11px] uppercase tracking-wider transition-all ${
                purchasePrice === property.price
                  ? "bg-[#1F7A3A] text-white"
                  : "bg-[rgba(255,255,255,0.05)] text-white/60 hover:bg-[rgba(255,255,255,0.1)]"
              }`}
            >
              {property.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="purchase-price"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50"
            >
              Purchase Price
            </label>
            <span className="font-serif text-lg text-[#7fd89a]">
              {formatSafe(purchasePrice)}
            </span>
          </div>
          <input
            id="purchase-price"
            type="range"
            min={20_000_000}
            max={150_000_000}
            step={1_000_000}
            value={purchasePrice}
            onChange={(event) => setPurchasePrice(Number(event.target.value))}
            className="w-full accent-[#1F7A3A]"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="gross-yield"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50"
            >
              Target Gross Yield
            </label>
            <span className="font-serif text-lg text-[#7fd89a]">
              {grossYieldPct.toFixed(1)}%
            </span>
          </div>
          <input
            id="gross-yield"
            type="range"
            min={5}
            max={20}
            step={0.5}
            value={grossYieldPct}
            onChange={(event) => setGrossYieldPct(Number(event.target.value))}
            className="w-full accent-[#1F7A3A]"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="management-fee"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50"
            >
              Management Cost Assumption
            </label>
            <span className="font-serif text-lg text-[#7fd89a]">
              {managementFeePct}%
            </span>
          </div>
          <input
            id="management-fee"
            type="range"
            min={0}
            max={30}
            step={1}
            value={managementFeePct}
            onChange={(event) => setManagementFeePct(Number(event.target.value))}
            className="w-full accent-[#1F7A3A]"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="lease-years"
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50"
            >
              Scenario Term
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
            onChange={(event) => setLeaseYears(Number(event.target.value))}
            className="w-full accent-[#1F7A3A]"
          />
        </div>
      </div>

      <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="bg-[#1F7A3A] p-4 sm:col-span-3">
          <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">
            Target gross annual income
          </div>
          <div className="mt-1.5 font-serif text-3xl text-white sm:text-4xl">
            {mode === "earn"
              ? formatSafe(calculations.grossAnnualIncome)
              : "Owner-occupied"}
          </div>
          <div className="mt-1 text-xs text-white/70">
            {mode === "earn"
              ? `${grossYieldPct.toFixed(1)}% gross · ${calculations.netYieldPct.toFixed(1)}% after the management-cost assumption`
              : "No rental income is modeled in Live mode."}
          </div>
        </div>

        <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
            <TrendingUp className="h-3 w-3" />
            Modeled Net Annual Income
          </div>
          <div className="mt-1.5 font-serif text-xl text-[#7fd89a]">
            {mode === "earn"
              ? formatSafe(calculations.netAnnualIncome)
              : "Owner-occupied"}
          </div>
        </div>

        <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
            <Calendar className="h-3 w-3" />
            {leaseYears}-Year Modeled Income
          </div>
          <div className="mt-1.5 font-serif text-xl text-[#7fd89a]">
            {mode === "earn"
              ? formatSafe(calculations.totalNetIncome)
              : "—"}
          </div>
        </div>

        <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
            <Target className="h-3 w-3" />
            Simple Cost Recovery
          </div>
          <div className="mt-1.5 font-serif text-xl text-[#7fd89a]">
            {Number.isFinite(calculations.costRecoveryYears)
              ? `${calculations.costRecoveryYears.toFixed(1)} years`
              : "—"}
          </div>
        </div>

        <div className="border border-[rgba(255,255,255,0.08)] bg-[rgba(255,255,255,0.04)] p-4 sm:col-span-3">
          <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider text-white/50">
            <Wallet className="h-3 w-3" />
            Modeled Annual Management Cost
          </div>
          <div className="mt-1.5 font-serif text-xl text-[#7fd89a]">
            {mode === "earn"
              ? formatSafe(calculations.managementCosts)
              : "—"}
          </div>
        </div>
      </div>

      <p className="mt-4 text-[10px] leading-relaxed text-white/50">
        Scenario only—not a forecast or guarantee. The model holds rent and
        costs constant and excludes vacancy, maintenance, taxes, financing,
        inflation, resale value and end-of-lease value. Confirm the applicable
        offer, lease and management terms, and obtain independent financial and
        legal advice. Figures shown in {currency}.
      </p>
    </div>
  );
}
