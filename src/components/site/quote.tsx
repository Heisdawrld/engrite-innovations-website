import { ScrollReveal } from "./scroll-reveal";

export function Quote() {
  return (
    <ScrollReveal
      as="section"
      className="relative overflow-hidden bg-[#102357] py-20 text-center sm:py-24 lg:py-28"
    >
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 50% 0%, rgba(58,124,69,0.15) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[860px] px-4 sm:px-6">
        <span
          className="font-serif text-[140px] leading-[0.5] text-[rgba(127,216,154,0.12)]"
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="-mt-5 font-serif text-[clamp(24px,3.4vw,46px)] font-normal italic leading-[1.4] text-white">
          Real estate surrounds your everyday life.
          <br />
          <strong className="font-medium not-italic text-[#7fd89a]">
            Why not own a piece of it too?
          </strong>
        </p>
        <div className="mt-9 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/30">
          Engrite Innovations — Lagos, Nigeria
        </div>
      </div>
    </ScrollReveal>
  );
}
