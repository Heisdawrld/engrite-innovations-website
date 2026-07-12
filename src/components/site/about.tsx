"use client";

import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { useLanguage } from "@/components/providers/language-provider";
import { Badge } from "@/components/ui/badge";
import { MapPin, GraduationCap, Hammer, Phone, Clock, ShieldCheck, Search } from "lucide-react";

const values = [
  {
    title: "Sales",
    desc: "Property sales across our three active developments and partner listings",
    icon: <Hammer className="h-5 w-5" />,
  },
  {
    title: "Lease & Rent",
    desc: "Long lease, short-term rental, and shortlet/Airbnb management",
    icon: <Clock className="h-5 w-5" />,
  },
  {
    title: "Surveying",
    desc: "Registered land surveying — led by our CEO's surveying background",
    icon: <Search className="h-5 w-5" />,
  },
  {
    title: "Construction",
    desc: "End-to-end building construction with engineering precision",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
];

const servicePromises = [
  "We pick calls always — regardless of time",
  "Free Consultation",
  "Free Site Inspection",
  "Every project is verified",
];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="scroll-mt-[100px] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        {/* Founder + Story */}
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <ScrollReveal>
            <div className="flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2BA84A]">
              <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
              Who We Are
            </div>
            <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
              Building Dreams,
              <br />
              <em className="italic text-[#2BA84A]">Shaping Cities.</em>
            </h2>
            <p className="mt-6 text-[15px] font-light leading-[1.9] text-[#6b7280]">
              Engrite Innovations Ltd. is a Lagos-based real estate development and investment company headquartered in Yaba. We are dedicated to delivering excellent service in land survey and building construction — your trusted partner in the journey towards homeownership and real estate investment.
            </p>
            <p className="mt-3.5 text-[15px] font-light leading-[1.9] text-[#6b7280]">
              Our services span the full property lifecycle: Sales, Rent, Lease, Development, Surveying, Construction, Shortlet/Airbnb management, and Investment Guidance. From groundbreaking to handover, every development is built on structural excellence, creative design, and an unwavering commitment to the futures of our investors and homeowners.
            </p>

            {/* Service Promises */}
            <div className="mt-7 rounded-md border-l-[3px] border-[#2BA84A] bg-[#f4f6fb] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2BA84A]">
                Our Service Promises
              </div>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {servicePromises.map((promise) => (
                  <li key={promise} className="flex items-start gap-2 text-[13px] text-[#1a1f2e]">
                    <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#2BA84A]" />
                    <span>{promise}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          {/* Founder Card */}
          <ScrollReveal delay={150} className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#102357] sm:aspect-[3/4]">
              <Image
                src="/img/founder-victor.jpg"
                alt="Victor Osinaike — CEO & Real Estate Developer, Engrite Innovations Ltd."
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, transparent 50%, rgba(8,21,52,0.85) 100%)",
                }}
                aria-hidden="true"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7fd89a]">
                  Founder & CEO
                </div>
                <h3 className="mt-1.5 font-serif text-2xl">Victor Osinaike</h3>
                <p className="mt-1 text-[13px] font-light text-white/70">
                  Real Estate Developer & Registered Surveyor
                </p>
                <div className="mt-3 flex flex-wrap gap-3 text-[11px] text-white/60">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5 text-[#7fd89a]" />
                    University of Lagos
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-[#7fd89a]" />
                    Lagos, Nigeria
                  </span>
                </div>
              </div>
            </div>

            {/* Stats badge */}
            <div className="absolute -bottom-5 -left-4 z-10 border-l-[3px] border-[#2BA84A] bg-[#102357] px-6 py-5 shadow-[0_14px_40px_rgba(8,21,52,0.25)]">
              <span className="block font-serif text-[40px] font-normal leading-none text-[#7fd89a]">
                3
              </span>
              <div className="mt-1.5 text-[9px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Active Developments
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Team & Operations */}
        <ScrollReveal delay={200} className="mt-24 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2BA84A]">
                <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
                What We Do
                <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
              </div>
              <h3 className="mt-3 font-serif text-[clamp(28px,3vw,40px)] font-normal text-[#102357]">
                Full-Service Real Estate
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-px bg-[rgba(16,35,87,0.1)] sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.title} className="group bg-white p-7 transition-colors hover:bg-[#f0f4ff]">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#2BA84A]/10 text-[#2BA84A] transition-colors group-hover:bg-[#102357] group-hover:text-[#7fd89a]">
                    {v.icon}
                  </div>
                  <div className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#102357]">
                    {v.title}
                  </div>
                  <div className="mt-2 text-[13px] leading-[1.75] text-[#6b7280]">{v.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Team member card */}
          <div className="border border-[rgba(16,35,87,0.1)] bg-white p-6">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2BA84A]">
              Meet the Team
            </div>
            <div className="relative mt-4 aspect-square w-full overflow-hidden bg-[#f4f6fb]">
              <Image
                src="/img/team-precious.jpg"
                alt="Precious Laney — Product Designer & Manager, Engrite Innovations"
                fill
                sizes="(min-width: 1024px) 33vw, 100vw"
                className="object-cover"
              />
            </div>
            <h4 className="mt-4 font-serif text-lg text-[#102357]">Precious Laney</h4>
            <p className="text-[12px] text-[#6b7280]">
              Product Designer & Manager
            </p>
            <p className="mt-3 text-[12px] font-light leading-[1.7] text-[#6b7280]">
              Hosts Engrite&apos;s Project Spotlight series — walking buyers through unit designs, amenity planning, and the thinking behind each development.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
