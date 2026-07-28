export function StatsBar() {
  const stats = [
    { n: "3", suffix: "", label: "Signature developments", note: "Yaba · Akoka · Gbagada" },
    { n: "7.1", suffix: "%", label: "Illustrative gross yield", note: "Subject to unit and occupancy" },
    { n: "17", suffix: "yr", label: "Long-lease option", note: "Terms vary by development" },
    { n: "₦17", suffix: "M", label: "Current entry point", note: "Pricing subject to availability" },
  ];

  return (
    <section aria-label="Engrite at a glance" className="relative z-20 bg-[#071128] px-4 pb-8 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-[1500px] grid-cols-2 border border-white/10 bg-white/[0.045] lg:grid-cols-4">
      {stats.map((s, i) => (
        <div
          key={s.label}
            className={`group relative min-h-[154px] overflow-hidden px-5 py-7 sm:px-8 ${
            i % 2 === 0 ? "border-r border-white/10" : ""
          } ${i < 2 ? "border-b border-white/10 lg:border-b-0" : ""} ${
            i < 3 ? "lg:border-r lg:border-white/10" : ""
          }`}
        >
            <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-[#9be15d] transition-transform duration-500 group-hover:scale-x-100" />
            <div className="font-serif text-[34px] font-normal leading-none text-[#9be15d] sm:text-[46px]">
              {s.n}<span className="ml-0.5 text-[0.58em]">{s.suffix}</span>
          </div>
            <div className="mt-4 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/85">
            {s.label}
          </div>
            <div className="mt-1.5 text-[10px] leading-relaxed text-white/45">{s.note}</div>
        </div>
      ))}
      </div>
      <p className="mx-auto mt-3 max-w-[1500px] text-right text-[9px] text-white/35">
        *Investment figures are illustrative and not guaranteed. Review the applicable offer documents.
      </p>
    </section>
  );
}
