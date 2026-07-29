"use client";

import { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/lib/faqs";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  { value: "all", label: "All" },
  { value: "investment", label: "Investment" },
  { value: "legal", label: "Legal" },
  { value: "property", label: "Property" },
  { value: "diaspora", label: "Diaspora" },
  { value: "general", label: "General" },
];

export function FAQ() {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredFaqs = activeCategory === "all" ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="depth-surface scroll-mt-[100px] overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-10">
        <ScrollReveal className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#1F7A3A]">
            <span className="block h-[2px] w-9 bg-[#1F7A3A]" aria-hidden="true" />
            Questions & Answers
          </div>
          <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
            Frequently Asked <em className="kinetic-glow italic text-[#1F7A3A]">Questions</em>
          </h2>
          <p className="mt-4 text-[15px] font-light text-[#6b7280]">
            Everything you need to know about investing with Engrite. Can&apos;t find your answer?
            <Link href="#contact" className="ml-1 text-[#1F7A3A] underline">Ask us directly</Link>.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setActiveCategory(c.value)}
                aria-pressed={activeCategory === c.value}
                className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                  activeCategory === c.value
                    ? "border-[#1F7A3A] bg-[#1F7A3A] text-white"
                    : "border-[rgba(16,35,87,0.2)] text-[#102357] hover:border-[#1F7A3A] hover:text-[#1F7A3A]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <Accordion type="single" collapsible className="space-y-3">
            {filteredFaqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="overflow-hidden rounded-md border border-[rgba(16,35,87,0.1)] bg-white px-5 data-[state=open]:border-[#1F7A3A] sm:px-6"
              >
                <AccordionTrigger className="text-left text-[15px] font-semibold text-[#102357] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-[14px] font-light leading-[1.85] text-[#6b7280]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>

        <ScrollReveal delay={200} className="mt-12 text-center">
          <p className="text-sm text-[#6b7280]">Still have questions?</p>
          <Link
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 bg-[#102357] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#0c1c46]"
          >
            Talk to a Consultant
            <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
