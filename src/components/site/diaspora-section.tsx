import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { Plane, Video, FileCheck, Wallet } from "lucide-react";
import { SETTINGS } from "@/lib/settings";

const steps = [
  {
    icon: Video,
    title: "Virtual Tour & Inquiry",
    desc: "Walk through properties in 360° from your phone. Book a video call with our sales team to discuss your goals.",
  },
  {
    icon: FileCheck,
    title: "Document Verification",
    desc: "Receive the available project documents and appoint an independent Nigerian property lawyer for verification.",
  },
  {
    icon: Wallet,
    title: "Electronic Closing",
    desc: "Review the final agreement, confirm payment instructions independently, and complete the approved closing process.",
  },
  {
    icon: Plane,
    title: "Handover or Rental",
    desc: "Complete the handover path or discuss managed-rental options available under the signed agreement.",
  },
];

export function DiasporaSection() {
  const titleWords = SETTINGS.diaspora.title.trim().split(/\s+/);
  const highlightedWord = titleWords.pop() ?? "";
  const titleLead = titleWords.join(" ");

  return (
    <section id="diaspora" className="scroll-mt-[100px] relative overflow-hidden bg-[#081534] py-20 text-white sm:py-24 lg:py-32">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/img/crest-residence-aerial-v2.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#081534]/70" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-12 max-w-2xl">
          <div className="flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#7fd89a]">
            <span className="block h-[2px] w-9 bg-[#7fd89a]" aria-hidden="true" />
            Invest From Abroad
          </div>
          <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-white">
            {titleLead}{" "}
            <em className="kinetic-glow kinetic-glow-light italic text-[#7fd89a]">
              {highlightedWord}
            </em>
          </h2>
          <p className="mt-6 text-[15px] font-light leading-[1.9] text-white/60">
            {SETTINGS.diaspora.description}
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <ScrollReveal
              key={step.title}
              delay={i * 80}
              className="relative border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all hover:border-[#7fd89a]/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1F7A3A]/20 text-[#7fd89a]">
                <step.icon className="h-5 w-5" />
              </div>
              <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                Step {i + 1}
              </div>
              <h3 className="mt-1.5 font-serif text-lg text-white">{step.title}</h3>
              <p className="mt-2 text-[12px] font-light leading-[1.7] text-white/55">
                {step.desc}
              </p>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200} className="mt-12 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="/properties/crest-residence#virtual-tour"
            className="inline-flex w-full items-center justify-center gap-2 bg-[#1F7A3A] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#239540] sm:w-auto"
          >
            Take a Virtual Tour
          </a>
          <a
            href={`https://wa.me/${SETTINGS.contact.whatsappNumber}?text=Hi%20Engrite%2C%20I%27m%20a%20diaspora%20investor%20interested%20in%20your%20properties.`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 border-2 border-white/30 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:border-white sm:w-auto"
          >
            Chat on WhatsApp
          </a>
          <div className="text-[11px] uppercase tracking-wider text-white/60">
            Remote consultations available across time zones
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
