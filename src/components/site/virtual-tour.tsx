"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { PropertyTourScene } from "@/lib/properties";

declare global {
  interface Window {
    pannellum?: {
      viewer: (
        containerId: string,
        config: {
          type: "equirectangular";
          panorama: string;
          autoLoad: boolean;
          showControls: boolean;
          showZoomCtrl: boolean;
          showFullscreenCtrl: boolean;
          hotSpots: {
            yaw: number;
            pitch: number;
            type: "scene";
            text: string;
            sceneId: string;
          }[];
        }
      ) => {
        destroy: () => void;
        loadScene: (sceneId: string) => void;
      };
    };
  }
}

type VirtualTourProps = {
  scenes: PropertyTourScene[];
  matterportUrl?: string;
  onClose?: () => void;
  embedded?: boolean;
};

export function VirtualTour({ scenes, matterportUrl, onClose, embedded = false }: VirtualTourProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<ReturnType<NonNullable<Window["pannellum"]>["viewer"]> | null>(null);
  const [currentScene, setCurrentScene] = useState(scenes[0]?.id ?? "");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  // Load Pannellum CSS + JS via CDN (only needed if no Matterport URL)
  useEffect(() => {
    if (matterportUrl) return; // skip Pannellum loading if Matterport is provided
    if (document.getElementById("pannellum-css")) {
      if (window.pannellum) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setScriptLoaded(true);
        return;
      }
      const existing = document.getElementById("pannellum-js");
      if (existing) {
        existing.addEventListener("load", () => setScriptLoaded(true));
        existing.addEventListener("error", () => setScriptError(true));
        return;
      }
    }

    const css = document.createElement("link");
    css.id = "pannellum-css";
    css.rel = "stylesheet";
    css.href = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.id = "pannellum-js";
    script.src = "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setScriptError(true);
    document.body.appendChild(script);

    return () => {
      // Don't remove — keep cached for re-mounts
    };
  }, [matterportUrl]);

  // Initialize / re-init viewer when scenes or script change
  useEffect(() => {
    if (matterportUrl) return; // skip if using Matterport
    if (!scriptLoaded || !window.pannellum || !containerRef.current || scenes.length === 0) {
      return;
    }

    const scenesConfig: Record<string, object> = {};
    scenes.forEach((scene) => {
      scenesConfig[scene.id] = {
        title: scene.title,
        panorama: scene.image,
        type: "equirectangular",
        autoLoad: true,
        showControls: true,
        showZoomCtrl: true,
        showFullscreenCtrl: true,
        hotSpots: (scene.hotSpots ?? []).map((hs) => ({
          yaw: hs.yaw,
          pitch: hs.pitch,
          type: "scene",
          text: hs.label,
          sceneId: hs.target,
        })),
      };
    });

    try {
      viewerRef.current = window.pannellum.viewer(containerRef.current.id, {
        default: {
          firstScene: scenes[0].id,
          sceneFadeDuration: 1000,
          autoRotate: -2,
        },
        scenes: scenesConfig,
      } as never);
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setScriptError(true);
    }

    return () => {
      if (viewerRef.current) {
        try {
          viewerRef.current.destroy();
        } catch {
          // ignore
        }
        viewerRef.current = null;
      }
    };
  }, [scriptLoaded, scenes]);

  const goToScene = useCallback((sceneId: string) => {
    if (viewerRef.current) {
      try {
        viewerRef.current.loadScene(sceneId);
      } catch {
        // ignore
      }
    }
    setCurrentScene(sceneId);
  }, []);

  const currentIndex = scenes.findIndex((s) => s.id === currentScene);

  const goPrev = () => {
    const prev = scenes[(currentIndex - 1 + scenes.length) % scenes.length];
    goToScene(prev.id);
  };
  const goNext = () => {
    const next = scenes[(currentIndex + 1) % scenes.length];
    goToScene(next.id);
  };

  // Matterport embed — takes priority over Pannellum fallback
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
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
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

  if (scriptError) {
    // Fallback to image gallery
    return (
      <div className="relative w-full">
        <div className="relative aspect-video w-full overflow-hidden bg-[#0d1a40]">
          <img
            src={scenes[currentIndex]?.image}
            alt={scenes[currentIndex]?.title}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081534]/80 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7fd89a]">
              Virtual Tour (fallback mode)
            </div>
            <div className="font-serif text-2xl">{scenes[currentIndex]?.title}</div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {scenes.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentScene(s.id)}
              className={`px-3 py-1.5 text-xs ${
                s.id === currentScene
                  ? "bg-[#2BA84A] text-white"
                  : "bg-[#f4f6fb] text-[#102357]"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-md bg-[#0d1a40]">
      {!scriptLoaded && (
        <div className="flex aspect-video w-full items-center justify-center text-white/60">
          <div className="text-center">
            <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-[#7fd89a] border-t-transparent" />
            <div className="text-xs uppercase tracking-wider">Loading 360° tour…</div>
          </div>
        </div>
      )}
      <div
        id="pannellum-container"
        ref={containerRef}
        className="h-[480px] w-full sm:h-[560px]"
        style={{ display: scriptLoaded ? "block" : "none" }}
        aria-label="360 degree virtual tour"
      />

      {/* Scene navigation overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-[#081534]/90 to-transparent p-4">
        <div className="pointer-events-auto flex items-center justify-between gap-3">
          <button
            onClick={goPrev}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            aria-label="Previous scene"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex-1 text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7fd89a]">
              Virtual Tour · Scene {currentIndex + 1} / {scenes.length}
            </div>
            <div className="font-serif text-lg text-white">
              {scenes[currentIndex]?.title}
            </div>
          </div>
          <button
            onClick={goNext}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            aria-label="Next scene"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="pointer-events-auto mt-3 flex flex-wrap justify-center gap-1.5">
          {scenes.map((s) => (
            <button
              key={s.id}
              onClick={() => goToScene(s.id)}
              className={`px-3 py-1 text-[10px] uppercase tracking-wider transition-colors ${
                s.id === currentScene
                  ? "bg-[#2BA84A] text-white"
                  : "bg-white/10 text-white/70 hover:bg-white/20"
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>

      {onClose && !embedded && (
        <button
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
          aria-label="Close virtual tour"
        >
          <X className="h-5 w-5" />
        </button>
      )}

      <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white backdrop-blur">
        <Maximize2 className="h-3 w-3" />
        Drag to look · Click hotspots to navigate
      </div>
    </div>
  );
}
