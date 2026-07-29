"use client";

import { useEffect, useRef, type PointerEvent } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/providers/language-provider";
import { ArrowDown, ArrowUpRight, Building2, MapPin } from "lucide-react";
import { HeroMotionBackdrop } from "./hero-motion-backdrop";

export function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateMotion = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const distance = Math.min(window.scrollY, section.offsetHeight);
      section.style.setProperty("--hero-shift", `${distance * 0.11}px`);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateMotion);
    };

    updateMotion();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect || !sectionRef.current) return;
    sectionRef.current.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    sectionRef.current.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      className="hero-spotlight relative isolate flex min-h-[800px] overflow-hidden bg-[#071128] pt-[108px] text-white lg:min-h-[900px] lg:h-[max(900px,100svh)]"
    >
      <HeroMotionBackdrop />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(7,17,40,0.99) 0%, rgba(7,17,40,0.9) 42%, rgba(7,17,40,0.36) 78%, rgba(7,17,40,0.2) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="architectural-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
      <div className="film-grain pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[260px] bg-gradient-to-t from-[#071128] via-[#071128]/70 to-transparent" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1500px] flex-1 items-end px-4 pb-20 sm:px-6 sm:pb-24 lg:items-center lg:px-10 lg:pb-10">
        <div className="grid w-full items-end gap-14 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <div className="max-w-[850px]">
          <div
              className="animate-fade-up eyebrow mb-7 text-[#9be15d]"
            style={{ animationDelay: "0.1s" }}
          >
              Lagos-built. Future-facing. Since 2020.
          </div>

          <h1
              className="animate-fade-up max-w-[830px] font-serif text-[clamp(54px,7.2vw,108px)] font-normal leading-[0.88] tracking-[-0.045em] text-white"
            style={{ animationDelay: "0.3s" }}
          >
            {t("hero.title1")}
            <br />
              <span className="text-outline italic">{t("hero.title2")}</span>{" "}
              <em className="kinetic-glow kinetic-glow-light italic text-[#9be15d]">{t("hero.title3")}</em>
          </h1>

          <p
              className="animate-fade-up mt-8 max-w-[560px] border-l border-white/25 pl-5 text-[15px] font-light leading-[1.85] text-white/75 sm:text-base"
            style={{ animationDelay: "0.5s" }}
          >
              Thoughtfully designed residences in Lagos, backed by a team that
              takes you from first inspection to final handover.
          </p>

          <div
              className="animate-fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            style={{ animationDelay: "0.68s" }}
          >
            <Link
              href="#projects"
                className="group inline-flex min-h-14 w-full items-center justify-center gap-4 bg-[#9be15d] px-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#071128] transition-all hover:bg-white sm:w-auto"
            >
              {t("hero.cta1")}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link
                href="#contact"
                className="inline-flex min-h-14 w-full items-center justify-center border border-white/30 px-8 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-all hover:border-white hover:bg-white/10 sm:w-auto"
            >
                Book a private inspection
            </Link>
          </div>

            <a
              href="https://wa.me/2348130665862?text=Hi%20Engrite%2C%20I%20would%20like%20to%20become%20a%20realtor%20and%20learn%20about%20your%20property%20partnership%20programme."
              target="_blank"
              rel="noopener noreferrer"
              className="animate-fade-up mt-5 inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-[#9be15d]"
              style={{ animationDelay: "0.82s" }}
            >
              Earn with Engrite — Become a Realtor
              <ArrowUpRight className="h-4 w-4" />
            </a>

            <div className="animate-line-grow mt-14 h-px w-full max-w-[620px] bg-gradient-to-r from-[#9be15d] via-white/40 to-transparent" />
          </div>

          <div
            className="animate-fade-up hidden lg:block"
            style={{ animationDelay: "0.78s" }}
          >
            <div className="glass-panel relative overflow-hidden p-6">
              <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#9be15d]/40 text-[#9be15d]">
                <span className="absolute inset-1 animate-orbit rounded-full border-t border-[#9be15d]" />
                <Building2 className="h-5 w-5" />
              </div>
              <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#9be15d]">
                Now spotlighting
              </div>
              <div className="mt-14 font-serif text-3xl">Crest Residence</div>
              <div className="mt-2 flex items-center gap-2 text-xs text-white/65">
                <MapPin className="h-3.5 w-3.5 text-[#9be15d]" />
                Gbagada Phase 1, Lagos
              </div>
              <div className="mt-6 grid grid-cols-2 gap-px bg-white/10">
                <div className="bg-[#0a1733]/75 p-4">
                  <div className="text-[9px] uppercase tracking-[0.18em] text-white/45">Status</div>
                  <div className="mt-1 text-xs font-semibold text-white">Off-plan launch</div>
                </div>
                <div className="bg-[#0a1733]/75 p-4">
                  <div className="text-[9px] uppercase tracking-[0.18em] text-white/45">Typologies</div>
                  <div className="mt-1 text-xs font-semibold text-white">Studio — 2 bedroom</div>
                </div>
              </div>
              <Link
                href="/properties/crest-residence"
                className="mt-5 flex items-center justify-between border-t border-white/15 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:text-[#9be15d]"
              >
                Explore the residence
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#projects"
        className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 text-[8px] font-bold uppercase tracking-[0.3em] text-white/55 lg:flex"
      >
        Discover
        <ArrowDown className="h-4 w-4 animate-bounce text-[#9be15d]" />
      </a>

      <div className="absolute bottom-8 right-10 z-20 hidden origin-bottom-right rotate-90 text-[8px] font-bold uppercase tracking-[0.32em] text-white/40 xl:block">
        06.5244° N · 03.3792° E
      </div>
    </section>
  );
}
