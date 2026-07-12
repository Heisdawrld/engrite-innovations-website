"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { PROGRESS_POSTS } from "@/lib/progress";

const categoryColors: Record<string, string> = {
  foundation: "bg-[#2BA84A]/10 text-[#2BA84A] border-[#2BA84A]/30",
  superstructure: "bg-[#102357]/10 text-[#102357] border-[#102357]/30",
  finishing: "bg-[#d4a000]/10 text-[#b88600] border-[#d4a000]/30",
  handover: "bg-[#3fc066]/10 text-[#239540] border-[#3fc066]/30",
};

export function ProgressGallery() {
  return (
    <section className="py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2BA84A]">
            <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
            Posts of Progress
          </div>
          <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
            Documented <em className="italic text-[#2BA84A]">Milestones</em>
          </h2>
          <p className="mt-4 text-[15px] font-light text-[#6b7280]">
            757 posts and counting. Real photos, real dates, real construction progress — updated monthly.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROGRESS_POSTS.map((post, i) => (
            <ScrollReveal
              key={post.id}
              delay={i * 50}
              className="group flex flex-col bg-white shadow-[0_8px_24px_rgba(8,21,52,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(8,21,52,0.12)]"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#081534]/80 via-transparent to-transparent" />
                <Badge
                  variant="outline"
                  className={`absolute left-3 top-3 bg-white/95 ${categoryColors[post.category]}`}
                >
                  {post.category}
                </Badge>
                <div className="absolute bottom-3 left-3 text-[10px] font-semibold uppercase tracking-wider text-white/80">
                  {new Date(post.date).toLocaleDateString("en-NG", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-base font-medium text-[#102357]">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-[12px] font-light leading-[1.7] text-[#6b7280]">
                  {post.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
