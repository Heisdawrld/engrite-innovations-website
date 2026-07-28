const TICKER_ITEMS = [
  "Sinai Spaces",
  "Sinai Residence",
  "Crest Residence",
  "Gbagada Phase One",
  "Yaba Lagos",
  "Live or Earn",
  "17-Year Lease",
  "Illustrative Yield",
  "Off-Plan Investment",
  "Real Estate Development",
];

export function Ticker() {
  return (
    <div className="marquee-mask flex h-[44px] items-center overflow-hidden bg-[#1F7A3A]">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center text-[10px] font-semibold uppercase tracking-[0.26em] text-white"
          >
            <span className="px-6">{item}</span>
            <span className="text-white/60">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
