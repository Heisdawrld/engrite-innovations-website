"use client";

import { useState } from "react";
import Image from "next/image";
import { ScrollReveal } from "./scroll-reveal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/providers/language-provider";

export function Newsletter() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setLoading(true);
    // Submit the form natively so Netlify Forms intercepts the POST.
    // The hidden static form in public/__forms.html guarantees Netlify
    // detects this form at build time even though this is a client component.
    const form = e.currentTarget as HTMLFormElement;
    form.submit();
  };

  return (
    <section id="newsletter" className="scroll-mt-[100px] grid min-h-[500px] grid-cols-1 lg:grid-cols-2">
      <div className="relative min-h-[220px] overflow-hidden">
        <Image
          src="/img/newsletter-portfolio.jpg"
          alt="Engrite property portfolio"
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
        <div className="absolute bottom-9 left-9 text-[9px] font-bold uppercase tracking-[0.28em] text-white/50">
          YOUR FUTURE HOME STARTS HERE
        </div>
      </div>

      <ScrollReveal className="flex flex-col justify-center bg-[#0d1a40] px-6 py-12 sm:px-10 lg:px-14 lg:py-16">
        <div className="flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-white/45">
          <span className="block h-[2px] w-9 bg-[#3fc066]" aria-hidden="true" />
          Stay Informed
        </div>
        <h2 className="mt-4 font-serif text-[clamp(28px,2.8vw,44px)] font-normal leading-[1.15] text-white">
          {t("newsletter.title1")}
          <br />
          <em className="italic text-[#7fd89a]">{t("newsletter.title2")}</em>
        </h2>
        <p className="mt-4 max-w-[360px] text-[14px] font-light leading-[1.85] text-white/45">
          Exclusive early access to new projects, investment opportunities, and property updates — straight to your inbox.
        </p>

        <form method="POST" data-netlify="true" netlify-honeypot="botField" name="newsletter" action="/thank-you" onSubmit={handleSubmit} className="mt-8 flex max-w-md flex-col gap-3" aria-label="Newsletter signup">
          {/* Honeypot — hidden from humans, bots will fill it */}
          <input type="text" name="botField" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <div className="space-y-1.5">
            <Label htmlFor="nl-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              {t("newsletter.placeholder.name")}
            </Label>
            <Input
              id="nl-name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:border-[#3fc066]"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="nl-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
              {t("newsletter.placeholder.email")}
            </Label>
            <Input
              id="nl-email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="h-12 border-white/10 bg-white/5 text-white placeholder:text-white/25 focus:border-[#3fc066]"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="mt-2 h-12 w-full bg-[#2BA84A] text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-[#239540] disabled:opacity-50 sm:w-auto sm:self-start"
          >
            {loading ? "Subscribing…" : t("newsletter.button")}
          </Button>
        </form>
        <p className="mt-3 text-[11px] text-white/20">No spam. Unsubscribe any time.</p>
      </ScrollReveal>
    </section>
  );
}
