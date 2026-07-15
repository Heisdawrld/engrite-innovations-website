"use client";

import { useLanguage } from "@/components/providers/language-provider";

export function StatsBar() {
  const { t } = useLanguage();

  const stats = [
    { n: "7.1", suffix: "%", highlight: true, label: t("stats.returns") },
    { n: "17", suffix: "", highlight: false, label: t("stats.lease") },
    { n: "3", suffix: "+", highlight: false, label: t("stats.projects") },
    { n: "5", suffix: "%", highlight: false, label: t("stats.fees") },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#102357]">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`px-6 py-7 text-center sm:px-10 sm:py-8 ${
            i % 2 === 0 ? "border-r border-white/10" : ""
          } ${i < 2 ? "border-b border-white/10 lg:border-b-0" : ""} ${
            i < 3 ? "lg:border-r lg:border-white/10" : ""
          }`}
        >
          <div className="font-serif text-[34px] font-normal leading-none text-white sm:text-[38px]">
            {s.highlight && <span className="text-[#7fd89a]">{s.n}</span>}
            {!s.highlight && s.n}
            <span className={s.highlight ? "text-[#7fd89a]" : "text-white"}>{s.suffix}</span>
          </div>
          <div className="mt-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
