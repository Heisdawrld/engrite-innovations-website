const TICKER_ITEMS = [
  "Sinai Spaces",
  "Sinai Residence",
  "Crest Residence",
  "Gbagada Phase One",
  "Yaba Lagos",
  "Live or Earn",
  "17-Year Lease",
  "7.1% Returns",
  "Off-Plan Investment",
  "Real Estate Development",
];

export function Ticker() {
  return (
    <div className="flex h-[42px] items-center overflow-hidden bg-[#2BA84A]">
      <div className="animate-ticker flex whitespace-nowrap">
        {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
          <span
            key={i}
            className="flex items-center text-[10px] font-semibold uppercase tracking-[0.26em] text-white/75"
          >
            <span className="px-6">{item}</span>
            <span className="text-white/35">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
