"use client";

import { ScrollReveal } from "./scroll-reveal";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Home, Wallet, Plane, Building2, Users, TrendingUp } from "lucide-react";
import { TESTIMONIALS } from "@/lib/testimonials";

const categoryConfig = {
  live: { label: "Live", icon: Home, color: "text-[#2BA84A] border-[#2BA84A]/30 bg-[#2BA84A]/5" },
  earn: { label: "Earn", icon: Wallet, color: "text-[#102357] border-[#102357]/30 bg-[#102357]/5" },
  shortlet: { label: "Shortlet", icon: TrendingUp, color: "text-[#b88600] border-[#d4a000]/30 bg-[#d4a000]/5" },
  diaspora: { label: "Diaspora", icon: Plane, color: "text-[#2BA84A] border-[#2BA84A]/30 bg-[#2BA84A]/5" },
  realtor: { label: "Realtor", icon: Users, color: "text-[#102357] border-[#102357]/30 bg-[#102357]/5" },
} as const;

export function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-[100px] bg-[#f4f6fb] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2BA84A]">
            <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
            Real Investment Scenarios
          </div>
          <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
            Ways to <em className="italic text-[#2BA84A]">Own & Earn</em>
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[15px] font-light text-[#6b7280]">
            Real use-case scenarios drawn directly from Engrite&apos;s Live or Earn model. Every number, every price, every yield range comes from Engrite&apos;s published property data — not invented testimonials.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <Carousel
            opts={{ align: "start", loop: true }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {TESTIMONIALS.map((t) => {
                const config = categoryConfig[t.category];
                const Icon = config.icon;
                return (
                  <CarouselItem key={t.id} className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3">
                    <div className="flex h-full flex-col bg-white p-7 shadow-[0_8px_24px_rgba(8,21,52,0.06)]">
                      <div className="flex items-center justify-between">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full border ${config.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <Badge variant="outline" className={`${config.color} border`}>
                          {config.label}
                        </Badge>
                      </div>

                      <h3 className="mt-5 font-serif text-lg font-medium leading-tight text-[#102357]">
                        {t.title}
                      </h3>
                      <div className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-[#2BA84A]">
                        {t.scenario}
                      </div>

                      <p className="mt-4 flex-1 text-[13px] font-light leading-[1.85] text-[#1a1f2e]">
                        {t.description}
                      </p>

                      <div className="mt-6 grid grid-cols-2 gap-2 border-t border-[rgba(16,35,87,0.1)] pt-5">
                        {t.outcomes.map((o) => (
                          <div key={o.label}>
                            <div className="text-[9px] font-bold uppercase tracking-wider text-[#6b7280]">
                              {o.label}
                            </div>
                            <div className="mt-0.5 font-serif text-sm text-[#102357]">
                              {o.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="flex" />
            <CarouselNext className="flex" />
          </Carousel>
        </ScrollReveal>

        <ScrollReveal delay={150} className="mt-10 text-center">
          <p className="text-[12px] text-[#6b7280]">
            <Building2 className="mr-1.5 inline h-3.5 w-3.5" />
            All pricing and yield figures sourced from Engrite Innovations&apos; official Instagram (@engriteinnovations_), Facebook, and LinkedIn. Last verified July 2026.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
