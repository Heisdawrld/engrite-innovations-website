"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MapPin, ScanLine } from "lucide-react";
import { getProperty } from "@/lib/properties";
import { VirtualTourModal } from "./virtual-tour-modal";

type PropertyVirtualTourSectionProps = {
  slug: string;
};

export function PropertyVirtualTourSection({
  slug,
}: PropertyVirtualTourSectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const property = getProperty(slug);

  if (!property) return null;

  const hasMatterport = Boolean(property.matterportUrl);
  const previewImage = property.tourScenes[0]?.image ?? property.image;

  return (
    <>
      <section
        id="virtual-tour"
        className="scroll-mt-24 overflow-hidden bg-[#071128] py-20 text-white sm:py-24 lg:py-32"
      >
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)] lg:gap-16 lg:px-10">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative min-h-[430px] overflow-hidden text-left sm:min-h-[560px]"
            aria-label={
              hasMatterport
                ? `Launch the ${property.name} 360 degree virtual tour`
                : `Preview the upcoming ${property.name} 360 degree virtual tour`
            }
          >
            <Image
              src={previewImage}
              alt={`${property.name} virtual-tour preview`}
              fill
              sizes="(min-width: 1024px) 60vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071128] via-[#071128]/20 to-[#071128]/20" />
            <div className="architectural-grid absolute inset-0 opacity-20" />

            <div className="absolute left-4 top-4 flex items-center gap-2 border border-white/20 bg-[#071128]/65 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur sm:left-6 sm:top-6">
              <span className="h-2 w-2 rounded-full bg-[#9be15d]" />
              Matterport 360°
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative flex h-28 w-28 items-center justify-center rounded-full border border-white/35 bg-[#071128]/35 backdrop-blur-sm transition-transform duration-700 group-hover:scale-110 sm:h-36 sm:w-36">
                <span className="absolute inset-2 rounded-full border border-[#9be15d]/45" />
                <span className="absolute inset-5 animate-ping rounded-full border border-white/15" />
                <ScanLine className="h-9 w-9 text-[#9be15d] sm:h-11 sm:w-11" />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-5 sm:flex-row sm:items-end sm:justify-between sm:p-8">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9be15d]">
                  {hasMatterport ? "Immersive walkthrough" : "Capture in preparation"}
                </div>
                <div className="mt-2 font-serif text-2xl sm:text-3xl">
                  {hasMatterport ? "Enter the residence" : "360° tour coming soon"}
                </div>
              </div>
              <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/75">
                Open preview <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </button>

          <div>
            <div className="eyebrow text-[#9be15d]">View from anywhere</div>
            <h2 className="mt-5 max-w-[620px] font-serif text-[clamp(44px,6vw,82px)] leading-[0.92] tracking-[-0.04em]">
              Walk the address
              <br />
              <em className="italic text-[#9be15d]">before you arrive.</em>
            </h2>
            <p className="mt-7 max-w-[560px] text-sm font-light leading-[1.9] text-white/60 sm:text-[15px]">
              {hasMatterport
                ? `Explore ${property.name} room by room in an immersive Matterport walkthrough.`
                : `A Matterport walkthrough of ${property.name} is being prepared. For now, the single preview keeps the experience focused while the full 360° capture is completed.`}
            </p>

            <div className="mt-7 flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-white/45">
              <MapPin className="h-4 w-4 text-[#9be15d]" />
              {property.location}
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex min-h-14 items-center justify-between gap-8 bg-[#9be15d] px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#071128] transition-colors hover:bg-white"
              >
                {hasMatterport ? "Launch 360° walkthrough" : "360° tour — coming soon"}
                <ScanLine className="h-4 w-4" />
              </button>
              <a
                href="#contact"
                className="inline-flex min-h-14 items-center justify-center border border-white/20 px-6 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-white/60"
              >
                Book a site visit
              </a>
            </div>
          </div>
        </div>
      </section>

      <VirtualTourModal
        slug={isOpen ? property.slug : null}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
