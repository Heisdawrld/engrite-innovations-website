"use client";

import {
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Camera,
  MapPinned,
} from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { SETTINGS } from "@/lib/settings";

export function ProgressGallery() {
  return (
    <section
      id="progress"
      className="scroll-mt-[100px] overflow-hidden bg-[#102357] py-24 text-white sm:py-28 lg:py-36"
    >
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="eyebrow text-[#9be15d]">Construction diary</div>
            <h2 className="mt-5 max-w-[860px] font-serif text-[clamp(48px,6vw,88px)] font-normal leading-[0.9] tracking-[-0.04em]">
              Progress worth
              <br />
              <em className="italic text-[#9be15d]">documenting properly.</em>
            </h2>
          </div>
          <p className="max-w-[410px] border-l border-white/15 pl-6 text-[14px] font-light leading-[1.9] text-white/65">
            A verified, project-by-project archive is being prepared. Every
            entry will be published only after its date, location and milestone
            have been confirmed.
          </p>
        </ScrollReveal>

        <div className="grid overflow-hidden border border-white/10 lg:grid-cols-[1.3fr_0.7fr]">
          <ScrollReveal className="architectural-grid relative flex min-h-[460px] flex-col justify-between overflow-hidden bg-[#071128] p-6 sm:min-h-[520px] sm:p-10">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-[#9be15d]/20" />
            <div className="absolute -right-6 top-14 h-52 w-52 rounded-full border border-white/10" />
            <div className="relative flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-[#9be15d]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#9be15d]" />
              Verified site media only
            </div>

            <div className="relative max-w-3xl">
              <div className="font-serif text-[clamp(62px,10vw,150px)] leading-[0.76] tracking-[-0.06em] text-white/[0.07]">
                FIELD
                <br />
                NOTES
              </div>
              <div className="-mt-7 max-w-2xl sm:-mt-10">
                <h3 className="font-serif text-[clamp(32px,4vw,54px)] leading-[1]">
                  Verified updates
                  <br />
                  <em className="italic text-[#9be15d]">coming soon.</em>
                </h3>
                <p className="mt-5 max-w-xl text-sm font-light leading-[1.85] text-white/60">
                  Approved site photography and milestone videos will replace
                  this panel as soon as the project records are ready.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <div className="divide-y divide-white/10 border-t border-white/10 lg:border-l lg:border-t-0">
            {[
              {
                icon: CalendarDays,
                label: "Dated captures",
                copy: "The day each photo or video was recorded.",
              },
              {
                icon: MapPinned,
                label: "Project verified",
                copy: "The correct development and location on every update.",
              },
              {
                icon: BadgeCheck,
                label: "Milestone confirmed",
                copy: "A clear construction stage, checked before publication.",
              },
            ].map((item, index) => (
              <ScrollReveal
                key={item.label}
                delay={index * 70}
                className="flex min-h-[170px] items-start gap-5 p-6 sm:p-8"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-[#9be15d]/30 bg-[#9be15d]/5 text-[#9be15d]">
                  <item.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                    Record 0{index + 1}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl">{item.label}</h3>
                  <p className="mt-2 text-xs font-light leading-[1.75] text-white/50">
                    {item.copy}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={180} className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 text-xs leading-relaxed text-white/50">
            <Camera className="h-4 w-4 flex-shrink-0 text-[#9be15d]" />
            No render is presented here as dated construction evidence.
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-7">
            <a
              href={SETTINGS.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9be15d] transition-colors hover:text-white"
            >
              Follow live updates <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={`https://wa.me/${SETTINGS.contact.whatsappNumber}?text=Hi%20Engrite%2C%20please%20send%20me%20the%20latest%20verified%20construction%20update.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:text-[#9be15d]"
            >
              Request current site report <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
