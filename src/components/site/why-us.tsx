import { ScrollReveal } from "./scroll-reveal";

const reasons = [
  {
    n: "01",
    title: "Structural Excellence",
    text: "A development approach centered on structural discipline, practical planning and considered material choices.",
  },
  {
    n: "02",
    title: "Transparent Investment",
    text: "Clear offer documents, current availability, milestone schedules and transaction costs presented before you commit.",
  },
  {
    n: "03",
    title: "Lagos-Rooted Expertise",
    text: "Based in Yaba, with on-the-ground context for the neighbourhoods, buyer needs and development realities that shape Lagos.",
  },
  {
    n: "04",
    title: "Live or Earn Model",
    text: "Choose personal use or managed rental options where the selected development and executed agreement provide for them.",
  },
  {
    n: "05",
    title: "Long-Term Thinking",
    text: "Long-lease options designed for buyers who value clarity, planned use and a defined contractual framework.",
  },
  {
    n: "06",
    title: "Visible Progress",
    text: "Dated site updates and project milestones give buyers a clearer view of the work happening beyond the renders.",
  },
];

export function WhyUs() {
  return (
    <section className="bg-[#f4f6fb] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F7A3A]">
            <span className="block h-[2px] w-9 bg-[#1F7A3A]" aria-hidden="true" />
            Why Choose Us
          </div>
          <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
            The Engrite <em className="italic text-[#1F7A3A]">Difference</em>
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
                className="pointer-events-none absolute bottom-0 left-0 top-0 w-[3px] origin-bottom scale-y-0 bg-[#1F7A3A] transition-transform duration-300 group-hover:scale-y-100"
                aria-hidden="true"
              />
              <span className="font-serif text-[70px] font-normal leading-none text-[#102357]/[0.07] sm:text-[80px]">
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
