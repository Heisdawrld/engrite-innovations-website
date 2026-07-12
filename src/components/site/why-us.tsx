import { ScrollReveal } from "./scroll-reveal";

const reasons = [
  {
    n: "01",
    title: "Structural Excellence",
    text: "Every development engineered to the highest structural standards. We build for decades — quality you can see and feel in every finish.",
  },
  {
    n: "02",
    title: "Transparent Investment",
    text: "No hidden fees, no surprises. Our 5% legal fee is all you pay beyond your property cost. Clear contracts, honest timelines, real returns.",
  },
  {
    n: "03",
    title: "Lagos-Rooted Expertise",
    text: "Based in Yaba — one of Lagos's fastest-growing real estate corridors. We know the land, the laws, and the opportunities better than anyone.",
  },
  {
    n: "04",
    title: "Live or Earn Model",
    text: "Unique to Engrite — move in or let us manage it for rental income. Your asset, your choice, our expertise backing you either way.",
  },
  {
    n: "05",
    title: "17-Year Security",
    text: "Long-term lease structures that protect your investment from market volatility. Backed by our guarantee and reselling assurance.",
  },
  {
    n: "06",
    title: "Proven Track Record",
    text: "757 posts of documented progress. Multiple active projects across Lagos. Hundreds of satisfied investors and homeowners who testify.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-[#f4f6fb] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2BA84A]">
            <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
            Why Choose Us
          </div>
          <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
            The Engrite <em className="italic text-[#2BA84A]">Difference</em>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r, i) => (
            <ScrollReveal
              key={r.n}
              delay={i * 60}
              className="group relative overflow-hidden border border-[rgba(16,35,87,0.1)] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(28,45,110,0.08)] sm:p-10"
            >
              <span
                className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-[#2BA84A] transition-transform duration-400 group-hover:scale-y-100"
                aria-hidden="true"
              />
              <span className="font-serif text-[70px] font-normal leading-none text-[rgba(28,45,110,0.07)] sm:text-[80px]">
                {r.n}
              </span>
              <div className="mt-4 text-[13px] font-bold uppercase tracking-[0.08em] text-[#102357]">
                {r.title}
              </div>
              <p className="mt-3.5 text-[13px] font-light leading-[1.85] text-[#6b7280]">
                {r.text}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
