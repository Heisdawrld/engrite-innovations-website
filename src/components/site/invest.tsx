"use client";

import { ScrollReveal } from "./scroll-reveal";
import { ROICalculator } from "./roi-calculator";
import { useCurrency } from "@/components/providers/currency-provider";
import { useLanguage } from "@/components/providers/language-provider";

const leaseRows = [
  { name: "Studio — Basic Option", location: "Sinai Spaces · Akoka, Yaba", price: 17_000_000, note: "₦2–4M/yr rental · 17yr lease" },
  { name: "Studio Apartment", location: "Sinai Residence · Morocco Rd, Yaba", price: 19_990_000, note: "Smart home · Sample units open" },
  { name: "1 Bedroom — Off-Plan", location: "Crest Residence · Gbagada Phase 1", price: 60_000_000, note: "Rooftop gym · Pool · Elevator" },
];

export function Invest() {
  const { t } = useLanguage();
  const { format, formatCompact } = useCurrency();

  return (
    <section id="invest" className="scroll-mt-[100px] bg-[#102357] py-20 text-white sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <ScrollReveal>
            <div className="flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
              <span className="block h-[2px] w-9 bg-[#3fc066]" aria-hidden="true" />
              {t("invest.label")}
            </div>
            <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-white">
              {t("invest.title1")}
              <br />
              <em className="italic text-[#7fd89a]">{t("invest.title2")}</em>
              <br />
              {t("invest.title3")}
            </h2>
            <p className="mt-6 max-w-[500px] text-[15px] font-light leading-[1.9] text-white/60">
              Engrite Innovations offers a proven Live or Earn model — buy a property, move in, or let us generate rental income for you. Either way, you build wealth.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-2 sm:gap-3">
              <div className="bg-[#2BA84A] border border-[#239540] p-6 col-span-2">
                <span className="font-serif text-[40px] font-normal leading-none text-white sm:text-[50px]">7.1%</span>
                <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/80">
                  Annual Investment Returns
                </div>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] p-5 sm:p-6 transition-colors hover:border-[rgba(127,216,154,0.3)]">
                <span className="font-serif text-[26px] font-normal leading-none text-white sm:text-[40px] lg:text-[50px]">{formatCompact(2_000_000)}–{formatCompact(6_000_000)}</span>
                <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Yearly Rental Revenue
                </div>
              </div>
              <div className="bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] p-5 sm:p-6 transition-colors hover:border-[rgba(127,216,154,0.3)]">
                <span className="font-serif text-[40px] font-normal leading-none text-white sm:text-[50px]">5%</span>
                <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Legal Fees Only
                </div>
              </div>
            </div>

            <a
              href="#contact"
              className="mt-8 inline-block border-2 border-[#3fc066] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7fd89a] transition-all hover:bg-[#3fc066] hover:text-white"
            >
              Start Investing Today
            </a>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            {/* Lease Card */}
            <div className="relative mb-8 overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)]">
              <span
                className="pointer-events-none absolute -right-5 -top-12 font-serif text-[280px] font-bold leading-none text-white/[0.025]"
                aria-hidden="true"
              >
                17
              </span>
              <div className="border-b border-[rgba(255,255,255,0.07)] p-7 sm:p-10">
                <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/55">
                  Our Signature Offering
                </div>
                <div className="mt-3.5 font-serif text-[32px] font-normal text-white sm:text-[40px]">
                  17-Year Lease
                </div>
                <div className="mt-1.5 text-sm text-[#7fd89a]">Live or Earn — Your Choice.</div>
              </div>
              <div className="p-7 sm:p-10">
                {leaseRows.map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between border-b border-[rgba(255,255,255,0.06)] py-5 transition-[padding] last:border-b-0 hover:pl-2.5"
                  >
                    <div>
                      <div className="text-sm font-medium text-white">{row.name}</div>
                      <div className="text-[11px] text-white/55">{row.location}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-serif text-[22px] text-[#7fd89a]">
                        {format(row.price)}
                      </div>
                      <div className="text-[11px] text-white/55">{row.note}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI Calculator */}
            <ROICalculator />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
