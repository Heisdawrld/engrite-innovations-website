import { ScrollReveal } from "./scroll-reveal";

const pressMentions = [
  {
    name: "BusinessDay",
    note: "Luxury real estate market coverage",
    href: "https://businessday.ng/real-estate/article/more-boost-for-luxury-real-estate-market-as-7-fifteen-capital-marks-lagos-expansion",
  },
  {
    name: "BellaNaija",
    note: "7-Fifteen Lagos launch feature",
    href: "https://www.instagram.com/reel/DZS25jJo4lp",
  },
  {
    name: "Lagos Gist",
    note: "Industry event coverage",
    href: "https://www.facebook.com/LagosGistNg",
  },
];

export function PressStrip() {
  return (
    <section className="border-b border-[rgba(16,35,87,0.08)] bg-white py-8">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="flex flex-col items-center gap-5 sm:flex-row sm:justify-center sm:gap-8 lg:gap-12">
          <div className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b7280]">
            As seen in
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8 lg:gap-12">
            {pressMentions.map((press) => (
              <a
                key={press.name}
                href={press.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center transition-opacity hover:opacity-100 sm:flex-row sm:gap-3 sm:text-left"
                title={press.note}
              >
                <span className="font-serif text-xl font-medium text-[#102357]/60 transition-colors group-hover:text-[#102357] sm:text-2xl">
                  {press.name}
                </span>
                <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.16em] text-[#6b7280]/70 sm:mt-0">
                  {press.note}
                </span>
              </a>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
