"use client";

import Image from "next/image";
import { X, Play, ScanLine } from "lucide-react";
import type { PropertyTourScene } from "@/lib/properties";

type VirtualTourProps = {
  scenes: PropertyTourScene[];
  matterportUrl?: string;
  videoUrl?: string;
  onClose?: () => void;
  embedded?: boolean;
};

/**
 * Virtual Tour — simplified media viewer.
 *
 * Priority of what gets shown:
 *   1. Matterport URL  → embeds 360° Matterport showcase (best quality)
 *   2. Video URL       → embeds MP4 / YouTube / Vimeo
 *   3. Image scene     → one focused preview until Matterport is ready
 *
 * To upgrade to true 360° later: paste a Matterport URL into the property's
 * `matterportUrl` field in src/lib/properties.ts. That's it — no code changes.
 */
export function VirtualTour({ scenes, matterportUrl, videoUrl, onClose, embedded = false }: VirtualTourProps) {
  // --- Priority 1: Matterport 360° embed ---
  if (matterportUrl) {
    const embedUrl = matterportUrl.includes("?")
      ? `${matterportUrl}&play=1`
      : `${matterportUrl}?play=1`;
    return (
      <div className="relative w-full overflow-hidden rounded-md bg-[#0d1a40]">
        <div className="flex aspect-video w-full items-center justify-center sm:aspect-[3/2]">
          <iframe
            src={embedUrl}
            allow="fullscreen; xr-spatial-tracking"
            className="h-full w-full"
            style={{ border: 0 }}
            title="360° Matterport Virtual Tour"
            loading="lazy"
          />
        </div>
        {!embedded && onClose && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            aria-label="Close virtual tour"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <div className="absolute left-3 top-3 z-10 rounded-full bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white backdrop-blur">
          360° Matterport Tour · Drag to look · Click floorplan to navigate
        </div>
      </div>
    );
  }

  // --- Priority 2: Video embed (MP4, YouTube, Vimeo) ---
  if (videoUrl) {
    const isYouTube = videoUrl.includes("youtube.com/watch") || videoUrl.includes("youtu.be/");
    const isVimeo = videoUrl.includes("vimeo.com");
    const isMP4 = videoUrl.endsWith(".mp4");

    if (isYouTube) {
      // Convert YouTube watch URL to embed URL
      let embedId = "";
      if (videoUrl.includes("youtu.be/")) {
        embedId = videoUrl.split("youtu.be/")[1]?.split("?")[0] ?? "";
      } else {
        embedId = videoUrl.split("v=")[1]?.split("&")[0] ?? "";
      }
      return renderVideoIframe(`https://www.youtube.com/embed/${embedId}`, "YouTube virtual tour", onClose, embedded);
    }

    if (isVimeo) {
      const vimeoId = videoUrl.split("vimeo.com/")[1]?.split("?")[0] ?? "";
      return renderVideoIframe(`https://player.vimeo.com/video/${vimeoId}`, "Vimeo virtual tour", onClose, embedded);
    }

    if (isMP4) {
      return (
        <div className="relative w-full overflow-hidden rounded-md bg-[#0d1a40]">
          <video
            src={videoUrl}
            controls
            playsInline
            className="aspect-video w-full object-cover sm:aspect-[3/2]"
            preload="metadata"
          />
          {!embedded && onClose && (
            <button
              onClick={onClose}
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Close virtual tour"
            >
              <X className="h-5 w-5" />
            </button>
          )}
          <div className="absolute left-3 top-3 z-10 rounded-full bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white backdrop-blur">
            Video Tour
          </div>
        </div>
      );
    }
  }

  // --- Priority 3: One image preview while the Matterport tour is prepared ---
  if (scenes.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-md bg-[#0d1a40] text-white/60">
        <p className="text-sm">Tour content coming soon. Book a site visit to see in person.</p>
      </div>
    );
  }

  const preview = scenes[0];

  return (
    <div className="relative w-full overflow-hidden rounded-md bg-[#0d1a40]">
      {/* Main image */}
      <div className="relative aspect-video w-full overflow-hidden sm:aspect-[3/2]">
        <Image
          src={preview.image}
          alt={preview.title}
          fill
          sizes="(min-width: 768px) 80vw, 95vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081534]/80 via-transparent to-transparent" />

        {/* Top-left badge */}
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-[#071128]/65 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white backdrop-blur">
          <ScanLine className="h-3 w-3 text-[#9be15d]" />
          Matterport 360° · Coming soon
        </div>

        {/* Close button */}
        {!embedded && onClose && (
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            aria-label="Close virtual tour"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        {/* Focused preview state */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#081534]/90 to-transparent p-4">
          <div className="text-center">
            <div className="font-serif text-lg text-white">{preview.title}</div>
            <div className="mt-1 text-[10px] uppercase tracking-wider text-[#7fd89a]">
              Full immersive walkthrough in preparation
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderVideoIframe(src: string, title: string, onClose?: () => void, embedded?: boolean) {
  return (
    <div className="relative w-full overflow-hidden rounded-md bg-[#0d1a40]">
      <div className="flex aspect-video w-full items-center justify-center sm:aspect-[3/2]">
        <iframe
          src={src}
          className="h-full w-full"
          style={{ border: 0 }}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {!embedded && onClose && (
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
          aria-label="Close virtual tour"
        >
          <X className="h-5 w-5" />
        </button>
      )}
      <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white backdrop-blur">
        <Play className="h-3 w-3" />
        Video Tour
      </div>
    </div>
  );
}
