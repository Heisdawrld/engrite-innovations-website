"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";

export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="relative flex h-screen min-h-[680px] flex-col justify-end overflow-hidden pt-[74px]">
      <div className="absolute inset-0">
        <Image
          src="/img/hero-real.jpg"
          alt="Sinai Residence by Engrite Innovations — premium apartments on Morocco Road, Yaba, Lagos"
          fill
          priority
          sizes="100vw"
          className="animate-hero-zoom object-cover object-[center_60%]"
        />
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(8,21,52,0.92) 0%, rgba(8,21,52,0.75) 45%, rgba(8,21,52,0.2) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px]"
        style={{
          background: "linear-gradient(to top, rgba(8,21,52,0.95), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10 lg:pb-20">
        <div className="max-w-[720px]">
          <div
            className="animate-fade-up mb-7 inline-flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/65"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="block h-[1.5px] w-8 bg-[#3fc066]" aria-hidden="true" />
            {t("hero.tag")}
          </div>

          <h1
            className="animate-fade-up font-serif text-[clamp(48px,6.8vw,96px)] font-normal leading-[0.98] text-white"
            style={{ animationDelay: "0.3s" }}
          >
            {t("hero.title1")}
            <br />
            <em className="italic text-[#7fd89a]">{t("hero.title2")}</em>
            <br />
            {t("hero.title3")}
          </h1>

          <p
            className="animate-fade-up mt-7 max-w-[420px] text-[15px] font-light leading-[1.85] text-white/60"
            style={{ animationDelay: "0.5s" }}
          >
            {t("hero.desc")}
          </p>

          <div
            className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5"
            style={{ animationDelay: "0.68s" }}
          >
            <Link
              href="#projects"
              className="inline-block w-full bg-[#2BA84A] px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white border-2 border-[#2BA84A] transition-all hover:bg-transparent hover:border-white sm:w-auto"
            >
              {t("hero.cta1")}
            </Link>
            <Link
              href="#invest"
              className="inline-block w-full bg-transparent px-8 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white border-2 border-white/40 transition-all hover:border-white hover:bg-white/8 sm:w-auto"
            >
              {t("hero.cta2")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
