"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Play, Maximize2 } from "lucide-react";
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
 *   3. Image scenes    → clean carousel (no warping, works with any photo)
 *
 * To upgrade to true 360° later: paste a Matterport URL into the property's
 * `matterportUrl` field in src/lib/properties.ts. That's it — no code changes.
 */
export function VirtualTour({ scenes, matterportUrl, videoUrl, onClose, embedded = false }: VirtualTourProps) {
  const [currentScene, setCurrentScene] = useState(0);

  const goToScene = useCallback((index: number) => {
    setCurrentScene((prev) => {
      const next = (index + scenes.length) % scenes.length;
      return next;
    });
  }, [scenes.length]);

  const goPrev = () => goToScene(currentScene - 1);
  const goNext = () => goToScene(currentScene + 1);

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

  // --- Priority 3: Image carousel (clean, no warping) ---
  if (scenes.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-md bg-[#0d1a40] text-white/60">
        <p className="text-sm">Tour content coming soon. Book a site visit to see in person.</p>
      </div>
    );
  }

  const current = scenes[currentScene];

  return (
    <div className="relative w-full overflow-hidden rounded-md bg-[#0d1a40]">
      {/* Main image */}
      <div className="relative aspect-video w-full overflow-hidden sm:aspect-[3/2]">
        <Image
          src={current.image}
          alt={current.title}
          fill
          sizes="(min-width: 768px) 80vw, 95vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#081534]/80 via-transparent to-transparent" />

        {/* Top-left badge */}
        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white backdrop-blur">
          <Maximize2 className="h-3 w-3" />
          Virtual Tour · Scene {currentScene + 1} / {scenes.length}
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

        {/* Bottom overlay with scene title + nav */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#081534]/90 to-transparent p-4">
          <div className="pointer-events-auto flex items-center justify-between gap-3">
            <button
              onClick={goPrev}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Previous scene"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex-1 text-center">
              <div className="font-serif text-lg text-white">
                {current.title}
              </div>
              {current.hotSpots && current.hotSpots.length > 0 && (
                <div className="mt-1 text-[10px] uppercase tracking-wider text-[#7fd89a]">
                  {current.hotSpots.length} highlight{current.hotSpots.length > 1 ? "s" : ""}
                </div>
              )}
            </div>
            <button
              onClick={goNext}
              className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
              aria-label="Next scene"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Scene thumbnails */}
      {scenes.length > 1 && (
        <div className="flex gap-2 overflow-x-auto p-3">
          {scenes.map((scene, i) => (
            <button
              key={scene.id}
              onClick={() => goToScene(i)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                i === currentScene
                  ? "border-[#2BA84A]"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`View ${scene.title}`}
              aria-pressed={i === currentScene}
            >
              <Image
                src={scene.image}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
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
