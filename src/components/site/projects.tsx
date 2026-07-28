"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { useCurrency } from "@/components/providers/currency-provider";
import { PROPERTIES } from "@/lib/properties";

export function Projects() {
  const { format } = useCurrency();

  return (
    <section
      id="projects"
      className="architectural-grid-dark scroll-mt-[90px] overflow-hidden bg-[#f7f7f2] py-24 sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-14 grid items-end gap-8 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="eyebrow text-[#1f7f39]">Selected portfolio</div>
            <h2 className="mt-5 max-w-[880px] font-serif text-[clamp(48px,6.6vw,96px)] font-normal leading-[0.9] tracking-[-0.04em] text-[#102357]">
              Three addresses.
              <br />
              <em className="italic text-[#1f7f39]">One standard.</em>
            </h2>
          </div>
          <div className="border-l border-[#102357]/15 pl-6">
            <p className="text-[14px] font-light leading-[1.9] text-[#596174]">
              From compact urban studios to amenity-led residences, each Engrite
              development is shaped around how Lagos lives, works and grows.
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357] transition-colors hover:text-[#1f7f39]"
            >
              Discuss your requirements <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {PROPERTIES.map((property, index) => {
            const isFeatured = index === 0;
            const isWide = index === 2;

            return (
              <ScrollReveal
                key={property.slug}
                delay={index * 90}
                className={`group relative overflow-hidden bg-[#071128] ${
                  isFeatured
                    ? "lg:col-span-7"
                    : isWide
                      ? "lg:col-span-12"
                      : "lg:col-span-5"
                }`}
              >
                <article className={`relative ${isWide ? "min-h-[620px] lg:min-h-[560px]" : "min-h-[640px] lg:min-h-[760px]"}`}>
                  <Image
                    src={property.image}
                    alt={`${property.name} — ${property.tagline}`}
                    fill
                    sizes={
                      isWide
                        ? "(min-width: 1024px) 94vw, 100vw"
                        : "(min-width: 1024px) 55vw, 100vw"
                    }
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.045]"
                  />
                  <div className="image-wash absolute inset-0 transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="film-grain pointer-events-none absolute inset-0 opacity-30" />

                  <div className="absolute inset-x-0 top-0 flex items-start p-5 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="font-serif text-2xl text-white/35">0{index + 1}</span>
                      <span className="border border-white/20 bg-[#071128]/35 px-3 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white/85 backdrop-blur">
                        {property.statusLabel}
                      </span>
                    </div>
                  </div>

                  <div className={`absolute inset-x-0 bottom-0 p-5 sm:p-8 ${isWide ? "lg:grid lg:grid-cols-[1fr_420px] lg:items-end lg:gap-12" : ""}`}>
                    <div>
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9be15d]">
                        <MapPin className="h-3.5 w-3.5" />
                        {property.location}
                      </div>
                      <h3 className="mt-3 font-serif text-[clamp(38px,4vw,66px)] font-normal leading-none tracking-[-0.03em] text-white">
                        {property.name}
                      </h3>
                      <p className="mt-4 max-w-[650px] text-[13px] font-light leading-[1.8] text-white/70 sm:text-sm">
                        {property.shortDesc}
                      </p>
                    </div>

                    <div className={isWide ? "mt-7 lg:mt-0" : "mt-7"}>
                      <div className="flex items-end justify-between border-t border-white/20 pt-5">
                        <div>
                          <div className="text-[8px] font-semibold uppercase tracking-[0.2em] text-white/45">
                            Current entry point
                          </div>
                          <div className="mt-1 font-serif text-2xl text-white">
                            {format(property.startingPrice)}
                          </div>
                        </div>
                        <Link
                          href={`/properties/${property.slug}`}
                          className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-[#9be15d] hover:text-[#9be15d]"
                          aria-label={`Explore ${property.name}`}
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      </div>

                      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                        <Link
                          href={`/properties/${property.slug}`}
                          className="group/link inline-flex min-h-13 flex-1 items-center justify-between bg-[#9be15d] px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#071128] transition-colors hover:bg-white"
                        >
                          Explore residence
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                        </Link>
                        <a
                          href="#contact"
                          className="inline-flex min-h-13 items-center justify-center gap-2 border border-white/25 px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white hover:bg-white/10"
                          aria-label={`Request a private viewing for ${property.name}`}
                        >
                          Private viewing
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <p className="mt-5 text-[10px] leading-relaxed text-[#596174]">
          Prices, availability and projected returns can change. Request the
          current offer document before making a decision.
        </p>
      </div>
    </section>
  );
}
