"use client";

import { useEffect, useState } from "react";
import { X, Maximize2, ExternalLink, MapPin, Eye } from "lucide-react";
import { getProperty } from "@/lib/properties";

type VirtualTourModalProps = {
  slug: string | null;
  onClose: () => void;
};

/**
 * Premium full-screen virtual tour modal.
 *
 * Opens with a cinematic black backdrop and renders the property's
 * Matterport 360° showcase front-and-center. Falls back gracefully
 * to video or image scenes if no Matterport URL is set.
 *
 * UX:
 *  - Fade-in + subtle zoom on the iframe
 *  - ESC closes
 *  - Click backdrop closes
 *  - "Open in Matterport" link for users who want the native app
 *  - Property name + location shown in a gradient header bar
 */
export function VirtualTourModal({ slug, onClose }: VirtualTourModalProps) {
  const property = slug ? getProperty(slug) : null;

  // Mount the modal only when a slug is set so entrance animations run.
  // Using a ref-based mounted flag avoids the setState-in-effect lint rule.
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (!slug) return;
    // Defer the transition trigger until after first paint
    const raf = requestAnimationFrame(() => setAnimating(true));
    return () => {
      cancelAnimationFrame(raf);
      setAnimating(false);
    };
  }, [slug]);

  // ESC to close
  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Lock body scroll while open
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [slug, onClose]);

  if (!property) return null;

  const hasMatterport = !!property.matterportUrl;
  const hasVideo = !!property.videoUrl;

  // Build Matterport embed URL with optimal params for embedded showcase
  let embedUrl = "";
  if (hasMatterport) {
    const base = property.matterportUrl!;
    const params = new URLSearchParams();
    params.set("play", "1");
    params.set("qs", "1"); // quickstart: lower-quality first frame for faster load
    params.set("hr", "1"); // hide Matterport radar/branding chrome
    params.set("brand", "0"); // hide "Powered by Matterport" footer
    embedUrl = base.includes("?")
      ? `${base}&${params.toString()}`
      : `${base}?${params.toString()}`;
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col bg-black transition-opacity duration-500 ${
        animating ? "opacity-100" : "opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="virtual-tour-title"
    >
      {/* Backdrop click target */}
      <button
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        aria-label="Close virtual tour"
        tabIndex={-1}
      />

      {/* Header bar */}
      <header className="relative z-10 flex items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-8 sm:py-5">
        <div className="flex min-w-0 flex-1 items-center gap-2.5 text-white sm:gap-3">
          <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#1F7A3A]/15 ring-1 ring-[#1F7A3A]/40 sm:h-10 sm:w-10">
            <Eye className="h-4 w-4 text-[#7fd89a]" />
          </div>
          <div className="min-w-0">
            <div
              id="virtual-tour-title"
              className="truncate font-serif text-base leading-tight sm:text-xl"
            >
              {property.name}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-white/60 sm:text-[11px] sm:tracking-[0.18em] sm:text-white/55">
              <MapPin className="h-3 w-3 flex-shrink-0 text-[#7fd89a]" />
              <span className="truncate">{property.location}</span>
              <span className="text-white/30">·</span>
              <span className="flex-shrink-0 text-[#7fd89a]">
                {hasMatterport ? "360° Tour" : hasVideo ? "Video Tour" : "Site Visit"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-shrink-0 items-center gap-2">
          {hasMatterport && (
            <a
              href={property.matterportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/80 backdrop-blur transition-colors hover:bg-white/10 hover:text-white sm:flex"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open in Matterport
            </a>
          )}
          <button
            onClick={onClose}
            className="group flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-all hover:bg-white/20 hover:rotate-90"
            aria-label="Close virtual tour"
          >
            <X className="h-5 w-5 transition-transform" />
          </button>
        </div>
      </header>

      {/* Tour viewport — on mobile portrait, fill available height for immersion.
          On sm+ screens, lock to 16:9 for cinematic feel. */}
      <div className="relative z-10 flex flex-1 items-stretch justify-center px-3 pb-3 sm:items-center sm:px-8 sm:pb-8">
        <div
          className={`relative w-full max-w-[1400px] overflow-hidden bg-[#0d1a40] shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-all duration-700 sm:rounded-lg ${
            animating ? "translate-y-0 scale-100 opacity-100" : "translate-y-4 scale-[0.98] opacity-0"
          } sm:aspect-video`}
        >
          {hasMatterport ? (
            <iframe
              key={property.slug}
              src={embedUrl}
              className="absolute inset-0 h-full w-full"
              style={{ border: 0 }}
              title={`${property.name} — 360° Matterport Virtual Tour`}
              loading="eager"
              allow="fullscreen; xr-spatial-tracking; gyroscope; accelerometer"
              allowFullScreen
            />
          ) : hasVideo ? (
            <video
              src={property.videoUrl}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-3 px-6 text-center text-white/70">
              <Maximize2 className="h-10 w-10 text-white/30" />
              <p className="font-serif text-lg text-white/90">Walkthrough coming soon</p>
              <p className="max-w-md text-sm text-white/55">
                A live video walkthrough of {property.name} is being filmed.
                In the meantime, book a site visit to see this property in person.
              </p>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  requestAnimationFrame(() => {
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                  });
                }}
                className="mt-2 inline-block bg-[#1F7A3A] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-[#239540]"
              >
                Book a Site Visit
              </a>
            </div>
          )}

          {/* Floating hint badge (only when Matterport is active) */}
          {hasMatterport && (
            <div className="pointer-events-none absolute bottom-3 left-3 z-10 flex items-center gap-2 rounded-full bg-black/60 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.16em] text-white/85 backdrop-blur sm:bottom-4 sm:left-4 sm:px-3 sm:text-[10px] sm:tracking-[0.18em]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#7fd89a]" />
              Drag to look · Tap floorplan to navigate
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
