"use client";

import { ScrollReveal } from "./scroll-reveal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Star, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials";

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-[100px] bg-[#f4f6fb] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2BA84A]">
            <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
            What Clients Say
          </div>
          <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
            Trusted by <em className="italic text-[#2BA84A]">Hundreds</em>
          </h2>
          <p className="mt-4 text-[15px] font-light text-[#6b7280]">
            Real stories from Engrite investors and homeowners across Nigeria and the diaspora.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t) => (
                <CarouselItem key={t.id} className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3">
                  <div className="flex h-full flex-col bg-white p-7 shadow-[0_8px_24px_rgba(8,21,52,0.06)]">
                    <Quote className="h-7 w-7 text-[#3fc066]" />
                    <div className="mt-4 flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${
                            i < t.rating ? "fill-[#d4a000] text-[#d4a000]" : "text-[#6b7280]/30"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-4 flex-1 text-[13px] font-light leading-[1.85] text-[#1a1f2e]">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="mt-6 flex items-center gap-3 border-t border-[rgba(16,35,87,0.1)] pt-5">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#102357] text-[11px] font-bold text-[#7fd89a]">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-[#102357]">{t.name}</div>
                        <div className="text-[11px] text-[#6b7280]">
                          {t.role} · {t.location}
                        </div>
                      </div>
                    </div>
                    {t.property && (
                      <div className="mt-3 inline-block self-start border border-[rgba(43,168,74,0.3)] bg-[rgba(43,168,74,0.06)] px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#2BA84A]">
                        {t.property}
                      </div>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </ScrollReveal>
      </div>
    </section>
  );
}
