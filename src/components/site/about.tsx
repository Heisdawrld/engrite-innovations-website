"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { useLanguage } from "@/components/providers/language-provider";

const values = [
  {
    title: "Development",
    desc: "End-to-end construction with engineering precision",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 28V12l8-5 8 5v16" />
        <path d="M20 28V18h8v10" />
        <path d="M4 28h28" />
        <path d="M9 17h2M9 21h2M9 25h2" />
        <path d="M14 17h2M14 21h2" />
        <path d="M23 22h2M23 25h2" />
      </svg>
    ),
  },
  {
    title: "Investment",
    desc: "Properties built to grow in value and yield",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 26l8-9 5 5 11-13" />
        <path d="M21 9h7v7" />
        <path d="M4 30h24" />
      </svg>
    ),
  },
  {
    title: "Ownership",
    desc: "Guided paths to home ownership for every budget",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="16" r="6" />
        <circle cx="11" cy="16" r="1.8" fill="currentColor" />
        <path d="M17 16h12" />
        <path d="M23 16v4" />
        <path d="M27 16v3" />
      </svg>
    ),
  },
  {
    title: "Partnership",
    desc: "Transparent, long-term investor relationships",
    icon: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 18l4-4 6 6 4-4 6 6 4-4" />
        <path d="M14 14l3-3 5 5" />
        <path d="M2 22h28" />
        <path d="M6 22v4M26 22v4" />
      </svg>
    ),
  },
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="scroll-mt-[100px] py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <ScrollReveal>
            <div className="flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2BA84A]">
              <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
              {t("about.label")}
            </div>
            <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
              {t("about.title1")}
              <br />
              One <em className="italic text-[#2BA84A]">{t("about.title2")}</em>
              <br />
              {t("about.title3")}
            </h2>
            <p className="mt-6 text-[15px] font-light leading-[1.9] text-[#6b7280]">
              Engrite Innovations is a premier real estate development and investment company headquartered in Yaba, Lagos. We specialise in crafting spaces that don&apos;t just house people — they generate lasting wealth.
            </p>
            <p className="mt-3.5 text-[15px] font-light leading-[1.9] text-[#6b7280]">
              From groundbreaking to handover, every development is built on structural excellence, creative design, and an unwavering commitment to the futures of our investors and homeowners.
            </p>

            <div className="mt-11 grid grid-cols-2 gap-px bg-[rgba(16,35,87,0.1)]">
              {values.map((v) => (
                <div key={v.title} className="group bg-white p-6 transition-colors hover:bg-[#f0f4ff] sm:p-7">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center text-[#2BA84A] transition-colors group-hover:text-[#102357]">
                    {v.icon}
                  </div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#102357]">
                    {v.title}
                  </div>
                  <div className="mt-2 text-[12px] leading-[1.75] text-[#6b7280]">{v.desc}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} className="relative hidden lg:block">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src="/img/about-aerial.jpg"
                alt="Aerial view of Engrite development site in Lagos"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 55%, rgba(8,21,52,0.55) 100%)",
                }}
                aria-hidden="true"
              />
            </div>
            <div className="absolute -bottom-5 -left-6 z-10 border-l-[3px] border-[#2BA84A] bg-[#102357] px-7 py-6 shadow-[0_14px_40px_rgba(8,21,52,0.25)]">
              <span className="block font-serif text-[48px] font-normal leading-none text-[#7fd89a]">
                757
              </span>
              <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Posts of Progress
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
