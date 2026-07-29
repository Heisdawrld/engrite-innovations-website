"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Handshake, Menu, X } from "lucide-react";
import { Logo } from "./logo";
import { CurrencyToggle } from "./currency-toggle";
import { LanguageToggle } from "./language-toggle";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { SETTINGS } from "@/lib/settings";

export function Navbar({ solid = false }: { solid?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();
  const isSolid = solid || scrolled;
  const realtorUrl =
    `https://wa.me/${SETTINGS.contact.whatsappNumber}?text=Hi%20Engrite%2C%20I%20would%20like%20to%20become%20a%20realtor%20and%20learn%20about%20your%20property%20partnership%20programme.`;

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min((window.scrollY / scrollable) * 100, 100) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/#projects", label: t("nav.projects") },
    { href: "/#about", label: t("nav.about") },
    { href: "/#invest", label: t("nav.invest") },
    { href: "/#faq", label: t("nav.faq") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSolid
          ? "border-b border-[rgba(16,35,87,0.1)] bg-white/95 shadow-[0_12px_50px_rgba(7,17,40,0.08)] backdrop-blur-xl"
          : "border-b border-white/10 bg-[#071128]/35 backdrop-blur-md"
      }`}
    >
      <div className="h-[34px] border-b border-[#071128]/10 bg-[#9be15d] text-[#071128]">
        <div className="mx-auto flex h-full max-w-[1500px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
          <div className="flex min-w-0 items-center gap-2 text-[8px] font-bold uppercase tracking-[0.16em] sm:text-[9px] sm:tracking-[0.2em]">
            <Handshake className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate sm:hidden">Realtor partnership now open</span>
            <span className="hidden sm:inline">Turn property opportunities into income with Engrite</span>
          </div>
          <a
            href={realtorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex shrink-0 items-center gap-2 text-[8px] font-black uppercase tracking-[0.18em] underline decoration-[#071128]/30 underline-offset-4 transition-colors hover:text-[#1f7f39] sm:text-[9px]"
          >
            Become a Realtor
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-[74px] max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Logo variant={isSolid ? "nav" : "footer"} />
          <div className={`text-[12px] font-bold uppercase tracking-[0.18em] leading-tight ${isSolid ? "text-[#102357]" : "text-white"}`}>
            ENGRITE INNOVATIONS
            <small className={`block text-[9px] font-medium uppercase tracking-[0.2em] ${isSolid ? "text-[#1f7f39]" : "text-[#9be15d]"}`}>
              LTD. — REAL ESTATE
            </small>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-[10px] font-semibold uppercase tracking-[0.18em] transition-colors ${
                  isSolid ? "text-[#596174] hover:text-[#102357]" : "text-white/65 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
          <div className="hidden md:block">
            <CurrencyToggle />
          </div>

          <Link
            href="/#contact"
            className={`hidden min-h-11 items-center px-6 text-[10px] font-bold uppercase tracking-[0.18em] transition-all lg:inline-flex ${
              isSolid
                ? "bg-[#102357] text-white hover:bg-[#1f7f39]"
                : "bg-[#9be15d] text-[#071128] hover:bg-white"
            }`}
          >
            Book inspection
          </Link>

          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`h-11 w-11 lg:hidden ${isSolid ? "text-[#102357]" : "text-white"}`}
                aria-label="Open menu"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full max-w-sm border-l-0 bg-[#102357] p-0 text-white"
            >
              <SheetHeader className="sr-only">
                <SheetTitle>Navigation menu</SheetTitle>
              </SheetHeader>
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 text-white/70 hover:text-white"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="flex flex-col gap-1 px-6 pt-20 pb-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="border-b border-white/10 py-4 text-lg font-medium uppercase tracking-[0.08em] transition-colors hover:text-[#7fd89a]"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="mt-4 bg-[#9be15d] py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-[#071128] transition-all hover:bg-white"
                >
                  Book inspection
                </Link>

                <a
                  href={realtorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="mt-3 flex min-h-14 items-center justify-between bg-white px-5 text-xs font-bold uppercase tracking-[0.18em] text-[#102357] transition-colors hover:bg-[#9be15d]"
                >
                  Become a Realtor
                  <ArrowUpRight className="h-4 w-4" />
                </a>

                <div className="mt-8 flex items-center justify-between">
                  <LanguageToggle />
                  <CurrencyToggle />
                </div>

                <div className="mt-auto flex gap-4 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.14em] text-white/60">
                  <a href={SETTINGS.social.instagram} target="_blank" rel="noopener noreferrer">IG</a>
                  <a href={SETTINGS.social.linkedin} target="_blank" rel="noopener noreferrer">LI</a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <span
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#1f7f39] transition-transform duration-100"
        style={{ transform: `scaleX(${progress / 100})` }}
        aria-hidden="true"
      />
    </nav>
  );
}
