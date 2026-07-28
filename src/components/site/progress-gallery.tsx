"use client";

import Image from "next/image";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { PROGRESS_POSTS } from "@/lib/progress";

export function ProgressGallery() {
  const latestPosts = PROGRESS_POSTS.slice(0, 4);

  return (
    <section className="overflow-hidden bg-[#102357] py-24 text-white sm:py-28 lg:py-36">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-12 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="eyebrow text-[#9be15d]">Construction diary</div>
            <h2 className="mt-5 max-w-[860px] font-serif text-[clamp(48px,6vw,88px)] font-normal leading-[0.9] tracking-[-0.04em]">
              Progress you can
              <br />
              <em className="italic text-[#9be15d]">actually follow.</em>
            </h2>
          </div>
          <p className="max-w-[410px] border-l border-white/15 pl-6 text-[14px] font-light leading-[1.9] text-white/65">
            Dated project updates make the construction journey visible. The
            company’s complete image pack will turn this into a living archive.
          </p>
        </ScrollReveal>

        <div className="grid gap-4 lg:grid-cols-12">
          {latestPosts.map((post, index) => (
            <ScrollReveal
              key={post.id}
              delay={index * 70}
              className={`group relative overflow-hidden border border-white/10 ${
                index === 0 ? "min-h-[570px] lg:col-span-7 lg:row-span-2" : "min-h-[275px] lg:col-span-5"
              }`}
            >
              <article className="absolute inset-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes={index === 0 ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 42vw, 100vw"}
                  className="object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071128] via-[#071128]/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[#9be15d]">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-NG", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className={`mt-3 font-serif leading-tight ${index === 0 ? "text-3xl sm:text-4xl" : "text-xl"}`}>
                    {post.title}
                  </h3>
                  {index === 0 && (
                    <p className="mt-3 max-w-xl text-sm font-light leading-[1.75] text-white/65">
                      {post.description}
                    </p>
                  )}
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={180} className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-7 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-xs leading-relaxed text-white/50">
            Every update should be supported by a dated site photo and linked to
            the relevant project record.
          </p>
          <a
            href="https://instagram.com/engriteinnovations_"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#9be15d] transition-colors hover:text-white"
          >
            Follow live updates <ArrowUpRight className="h-4 w-4" />
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}
