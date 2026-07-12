import Link from "next/link";
import { Logo } from "./logo";
import { Instagram, Linkedin, Facebook } from "lucide-react";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com/engriteinnovations_",
    icon: Instagram,
  },
  {
    label: "LinkedIn",
    href: "https://ng.linkedin.com/company/engrite-innovations",
    icon: Linkedin,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/EduserveNG",
    icon: Facebook,
  },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.66a8.16 8.16 0 004.77 1.52V6.73a4.85 4.85 0 01-1.84-.04z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto bg-[#081534] text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3" aria-label="Engrite Innovations home">
              <Logo variant="footer" />
              <div className="text-[12px] font-bold uppercase tracking-[0.18em] leading-tight text-white">
                ENGRITE INNOVATIONS
                <small className="block text-[9px] font-medium uppercase tracking-[0.2em] text-[#7fd89a]">
                  LTD. — REAL ESTATE
                </small>
              </div>
            </Link>
            <p className="mt-5 max-w-[280px] text-[13px] font-light leading-[1.85] text-white/35">
              Your trusted partner in the journey towards home ownership. Premium real estate development and investment in Lagos, Nigeria.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/35 transition-all hover:border-[#3fc066] hover:text-[#7fd89a]"
                >
                  <social.icon className="h-3.5 w-3.5" />
                </a>
              ))}
              <a
                href="https://www.tiktok.com/@engriteinnovation"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-9 w-9 items-center justify-center border border-white/10 text-white/35 transition-all hover:border-[#3fc066] hover:text-[#7fd89a]"
              >
                <TikTokIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h3 className="mb-5 text-[9px] font-bold uppercase tracking-[0.24em] text-white/30">
              Projects
            </h3>
            <ul className="flex flex-col gap-3">
              {["Sinai Spaces", "Sinai Residence", "Crest Residence", "Gbagada Phase One"].map((p) => (
                <li key={p}>
                  <Link
                    href="#projects"
                    className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Invest */}
          <div>
            <h3 className="mb-5 text-[9px] font-bold uppercase tracking-[0.24em] text-white/30">
              Invest
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="#invest" className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]">Live or Earn</Link></li>
              <li><Link href="#invest" className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]">17-Year Lease</Link></li>
              <li><Link href="#invest" className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]">Investment Returns</Link></li>
              <li><Link href="#invest" className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]">ROI Calculator</Link></li>
              <li><Link href="#contact" className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]">Realtor Programme</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-[9px] font-bold uppercase tracking-[0.24em] text-white/30">
              Company
            </h3>
            <ul className="flex flex-col gap-3">
              <li><Link href="#about" className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]">About Us</Link></li>
              <li><Link href="#faq" className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]">FAQ</Link></li>
              <li><Link href="#insights" className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]">Insights</Link></li>
              <li><Link href="#testimonials" className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]">Testimonials</Link></li>
              <li><Link href="#contact" className="text-[13px] font-light text-white/40 transition-colors hover:text-[#7fd89a]">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-3 border-t border-white/6 bg-[#239540] px-4 py-5 text-center sm:flex-row sm:px-10 sm:text-left">
        <p className="text-[11px] font-light text-white/55">
          © 2026 Engrite Innovations Ltd. All rights reserved. · 27 Montgomery Street, Yaba, Lagos
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px]">
          <span className="font-serif text-[13px] italic text-white/50">Building Dreams, Shaping Cities.</span>
        </div>
      </div>
    </footer>
  );
}
