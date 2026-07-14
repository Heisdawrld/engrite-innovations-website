"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ArrowRight, MapPin, Eye } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { useFavorites } from "@/components/providers/favorites-provider";
import { useCurrency } from "@/components/providers/currency-provider";
import { PROPERTIES, Property } from "@/lib/properties";

const statusStyles: Record<Property["status"], string> = {
  "under-construction": "text-[#2BA84A] border-l-[3px] border-[#2BA84A]",
  "last-units": "text-[#b88600] border-l-[3px] border-[#d4a000]",
  "off-plan": "text-[#102357] border-l-[3px] border-[#102357]",
  "sample-units-open": "text-[#2BA84A] border-l-[3px] border-[#2BA84A]",
};

export function Projects({ onSelectProperty }: { onSelectProperty: (slug: string) => void }) {
  const { format } = useCurrency();
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <section id="projects" className="scroll-mt-[100px] bg-[#f4f6fb] py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal className="mb-12 flex flex-col gap-4 px-4 sm:mb-14 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
          <div>
            <div className="flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2BA84A]">
              <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
              Our Portfolio
            </div>
            <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
              Landmark
              <br />
              Developments
            </h2>
          </div>
          <Link
            href="#contact"
            className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2BA84A] transition-all hover:gap-4"
          >
            View All Properties
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 px-4 sm:gap-6 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-10">
          {PROPERTIES.map((property, idx) => {
            const fav = isFavorite(property.slug);
            return (
              <ScrollReveal
                key={property.slug}
                delay={idx * 100}
                className="group flex flex-col bg-white shadow-[0_12px_40px_rgba(8,21,52,0.08)] transition-all duration-[400ms] hover:-translate-y-1.5 hover:shadow-[0_26px_60px_rgba(8,21,52,0.18)]"
              >
                <div className="relative overflow-hidden">
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <Image
                      src={property.image}
                      alt={`${property.name} — ${property.tagline}`}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[800ms] group-hover:scale-105"
                    />
                  </div>
                  <div
                    className={`absolute right-4 top-4 z-10 bg-white/95 px-3.5 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] backdrop-blur ${statusStyles[property.status]}`}
                  >
                    {property.statusLabel}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleFavorite(property.slug);
                    }}
                    className="absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 backdrop-blur transition-all hover:scale-110"
                    aria-label={fav ? "Remove from favorites" : "Save to favorites"}
                    aria-pressed={fav}
                  >
                    <Heart
                      className={`h-4 w-4 transition-colors ${
                        fav ? "fill-[#2BA84A] text-[#2BA84A]" : "text-[#102357]"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex flex-1 flex-col gap-4 border-t border-[rgba(16,35,87,0.1)] p-5 sm:p-6">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#6b7280]">
                      <MapPin className="h-3 w-3" />
                      {property.location}
                    </div>
                    <h3 className="mt-2 font-serif text-[22px] font-normal text-[#102357]">
                      {property.name}
                    </h3>
                    <p className="mt-1 text-[13px] font-light leading-relaxed text-[#6b7280]">
                      {property.shortDesc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {property.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="border border-[rgba(43,168,74,0.3)] bg-[rgba(43,168,74,0.06)] px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-[#2BA84A]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex items-center justify-between border-t border-[rgba(16,35,87,0.1)] pt-4">
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#6b7280]">
                        From
                      </div>
                      <div className="font-serif text-[20px] text-[#102357]">
                        {format(property.startingPrice)}
                      </div>
                    </div>
                    <span className={`bg-[rgba(43,168,74,0.06)] px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] ${statusStyles[property.status].split(' ').filter(c => c.startsWith('text-')).join(' ')}`}>
                      {property.annualReturn}% ROI
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      onClick={() => onSelectProperty(property.slug)}
                      className="flex flex-1 items-center justify-center gap-2 bg-[#102357] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#1a3470] sm:justify-between"
                    >
                      View Details
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1.5" />
                    </button>
                    <button
                      onClick={() => onSelectProperty(property.slug)}
                      className="flex items-center justify-center gap-1.5 border-2 border-[#2BA84A] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#2BA84A] transition-colors hover:bg-[#2BA84A] hover:text-white"
                      aria-label={`Take virtual tour of ${property.name}`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Tour
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
