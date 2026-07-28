"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { Star, Quote as QuoteIcon } from "lucide-react";
import { CLIENT_TESTIMONIALS } from "@/lib/testimonials";

/**
 * Client Testimonials section with real photos.
 *
 * Renders ONLY when CLIENT_TESTIMONIALS has entries (i.e. when real client
 * photos + quotes have been added to src/lib/testimonials.ts).
 *
 * Until then, this section is hidden — no empty placeholders shown.
 */
export function ClientTestimonials() {
  if (CLIENT_TESTIMONIALS.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F7A3A]">
            <span className="block h-[2px] w-9 bg-[#1F7A3A]" aria-hidden="true" />
            Client Stories
          </div>
          <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
            What Our <em className="italic text-[#1F7A3A]">Investors Say</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[15px] font-light text-[#6b7280]">
            Real buyers. Real outcomes. From Lagos to the diaspora — hear from the people who trusted Engrite with their property journey.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CLIENT_TESTIMONIALS.map((t, i) => (
            <ScrollReveal
              key={t.id}
              delay={i * 80}
              className="flex flex-col bg-[#f4f6fb] p-7"
            >
              {/* Quote mark + rating */}
              <div className="flex items-center justify-between">
                <QuoteIcon className="h-8 w-8 text-[#1F7A3A]/30" />
                {t.rating !== undefined && (
                  <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        className={`h-3.5 w-3.5 ${
                          idx < (t.rating ?? 5)
                            ? "fill-[#1F7A3A] text-[#1F7A3A]"
                            : "text-[#6b7280]/30"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Quote */}
              <p className="mt-4 flex-1 text-[14px] font-light leading-[1.85] text-[#1a1f2e]">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Property badge (if provided) */}
              {t.property && (
                <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1F7A3A]">
                  {t.property}
                </div>
              )}

              {/* Author */}
              <div className="mt-5 flex items-center gap-3 border-t border-[rgba(16,35,87,0.1)] pt-5">
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-[#102357]">
                  <Image
                    src={t.photo}
                    alt={t.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-serif text-base font-medium text-[#102357]">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-[#6b7280]">
                    {t.role} · {t.location}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
