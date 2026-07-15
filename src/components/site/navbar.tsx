"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart } from "lucide-react";
import { Logo } from "./logo";
import { CurrencyToggle } from "./currency-toggle";
import { LanguageToggle } from "./language-toggle";
import { useFavorites } from "@/components/providers/favorites-provider";
import { useLanguage } from "@/components/providers/language-provider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";

export function Navbar({ onOpenFavorites }: { onOpenFavorites: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useFavorites();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: t("nav.about") },
    { href: "#projects", label: t("nav.projects") },
    { href: "#invest", label: t("nav.invest") },
    { href: "#faq", label: t("nav.faq") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/97 backdrop-blur-md shadow-[0_2px_30px_rgba(28,45,110,0.08)] border-b border-[rgba(16,35,87,0.1)]"
          : "bg-white/97 backdrop-blur-md border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="Engrite Innovations home">
          <Logo variant="nav" />
          <div className="text-[12px] font-bold uppercase tracking-[0.18em] leading-tight text-[#102357]">
            ENGRITE INNOVATIONS
            <small className="block text-[9px] font-medium uppercase tracking-[0.2em] text-[#2BA84A]">
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
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6b7280] transition-colors hover:text-[#102357]"
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

          {/* Favorites */}
          <button
            onClick={onOpenFavorites}
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(16,35,87,0.1)] text-[#102357] transition-colors hover:border-[#2BA84A] hover:text-[#2BA84A]"
            aria-label={`Saved properties (${count})`}
          >
            <Heart className="h-4 w-4" />
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#2BA84A] px-1 text-[9px] font-bold text-white">
                {count}
              </span>
            )}
          </button>

          <Link
            href="#newsletter"
            className="hidden bg-[#102357] px-7 py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white border-2 border-[#102357] transition-all hover:bg-transparent hover:text-[#102357] lg:inline-block"
          >
            {t("nav.cta")}
          </Link>

          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-[#102357]"
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
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setTimeout(() => setMobileOpen(false), 50)}
                    className="border-b border-white/10 py-4 text-lg font-medium uppercase tracking-[0.08em] transition-colors hover:text-[#7fd89a]"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#newsletter"
                  onClick={() => setTimeout(() => setMobileOpen(false), 50)}
                  className="mt-4 bg-[#2BA84A] py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white border-2 border-[#2BA84A] transition-all hover:bg-transparent"
                >
                  {t("nav.cta")}
                </a>

                <div className="mt-8 flex items-center justify-between">
                  <LanguageToggle />
                  <CurrencyToggle />
                </div>

                <div className="mt-auto flex gap-4 border-t border-white/10 pt-6 text-[11px] uppercase tracking-[0.14em] text-white/60">
                  <a href="https://instagram.com/engriteinnovations_" target="_blank" rel="noopener noreferrer">IG</a>
                  <a href="https://ng.linkedin.com/company/engrite-innovations" target="_blank" rel="noopener noreferrer">LI</a>
                  <a href="https://www.facebook.com/EduserveNG" target="_blank" rel="noopener noreferrer">FB</a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
