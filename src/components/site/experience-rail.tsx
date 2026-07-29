"use client";

import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "projects", label: "Portfolio" },
  { id: "progress", label: "Progress" },
  { id: "about", label: "Company" },
  { id: "invest", label: "Investment" },
  { id: "diaspora", label: "Diaspora" },
  { id: "faq", label: "Answers" },
  { id: "contact", label: "Contact" },
] as const;

export function ExperienceRail() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sections = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      (section): section is HTMLElement => Boolean(section),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibleEntries[0]) setActiveId(visibleEntries[0].target.id as typeof activeId);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.08, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));

    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
      setVisible(window.scrollY > window.innerHeight * 0.65);
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className={`fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 transition-all duration-500 xl:block ${
        visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
      }`}
    >
      <div className="relative border border-white/10 bg-[#071128]/88 px-3 py-5 shadow-[0_24px_70px_rgba(7,17,40,0.28)] backdrop-blur-xl">
        <span className="absolute bottom-5 left-[19px] top-5 w-px bg-white/12" aria-hidden="true" />
        <span
          className="absolute left-[19px] top-5 w-px origin-top bg-[#9be15d] transition-transform duration-300"
          style={{
            height: "calc(100% - 40px)",
            transform: `scaleY(${progress})`,
          }}
          aria-hidden="true"
        />

        <ol className="relative space-y-1.5">
          {SECTIONS.map((section, index) => {
            const active = section.id === activeId;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  aria-current={active ? "location" : undefined}
                  className="group flex min-h-8 items-center gap-3"
                  title={section.label}
                >
                  <span
                    className={`relative z-10 flex h-3 w-3 items-center justify-center rounded-full border transition-all ${
                      active
                        ? "border-[#9be15d] bg-[#9be15d] shadow-[0_0_18px_rgba(155,225,93,0.5)]"
                        : "border-white/25 bg-[#071128] group-hover:border-white/70"
                    }`}
                  >
                    <span className={`h-1 w-1 rounded-full ${active ? "bg-[#071128]" : "bg-transparent"}`} />
                  </span>
                  <span
                    className={`max-w-0 overflow-hidden whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.18em] transition-all duration-300 group-hover:max-w-[90px] group-hover:text-white ${
                      active ? "max-w-[90px] text-[#9be15d]" : "text-white/45"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")} {section.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
