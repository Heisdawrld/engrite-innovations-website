"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SCENES = [
  {
    label: "Rooftop aerial",
    src: "/video/crest-rooftop-aerial.mp4",
  },
  {
    label: "Sunset lounge",
    src: "/video/crest-sunset-lounge.mp4",
  },
  {
    label: "Private pool",
    src: "/video/crest-pool.mp4",
  },
] as const;

export function HeroMotionBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => {
      setReducedMotion(media.matches);
      if (media.matches) setPlaying(false);
    };

    syncPreference();
    media.addEventListener("change", syncPreference);
    return () => media.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedMotion) return;

    if (playing) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  }, [activeScene, playing, ready, reducedMotion]);

  const selectScene = (index: number) => {
    setReady(false);
    setActiveScene(index);
    if (!reducedMotion) setPlaying(true);
  };

  const advanceScene = () => {
    if (!playing) return;
    setReady(false);
    setActiveScene((current) => (current + 1) % SCENES.length);
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="hero-parallax absolute inset-0">
        <Image
          src="/img/crest-residence-cover-v2.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {!reducedMotion && (
          <video
            key={SCENES[activeScene].src}
            ref={videoRef}
            src={SCENES[activeScene].src}
            poster="/img/crest-residence-cover-v2.webp"
            muted
            autoPlay={playing}
            playsInline
            preload={activeScene === 0 ? "auto" : "metadata"}
            onCanPlay={() => setReady(true)}
            onEnded={advanceScene}
            className={`hero-motion-video absolute inset-0 h-full w-full object-cover object-center ${
              ready ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />
        )}

        <div className="hero-motion-word pointer-events-none absolute right-[-1vw] top-[16%] hidden select-none text-right font-serif text-[clamp(84px,13vw,210px)] leading-[0.72] tracking-[-0.075em] text-white/[0.055] lg:block">
          LIVE
          <br />
          HIGHER
        </div>
        <div className="hero-motion-sweep pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="hero-motion-frame pointer-events-none absolute right-[4vw] top-[15%] hidden h-[52%] w-[31%] border border-white/10 lg:block" aria-hidden="true">
          <span className="absolute -left-px -top-px h-9 w-9 border-l-2 border-t-2 border-[#9be15d]/70" />
          <span className="absolute -bottom-px -right-px h-9 w-9 border-b-2 border-r-2 border-[#9be15d]/70" />
        </div>
      </div>

      {!reducedMotion && (
        <div className="absolute bottom-6 right-4 z-20 flex items-center gap-2 sm:bottom-8 sm:right-6 lg:bottom-10 lg:right-10">
          <div className="hidden items-center gap-1.5 rounded-full border border-white/15 bg-[#071128]/45 p-1.5 backdrop-blur-md sm:flex">
            {SCENES.map((scene, index) => (
              <button
                key={scene.src}
                type="button"
                onClick={() => selectScene(index)}
                className={`group flex min-h-8 items-center gap-2 rounded-full px-3 text-[8px] font-bold uppercase tracking-[0.16em] transition-colors ${
                  index === activeScene
                    ? "bg-white text-[#071128]"
                    : "text-white/60 hover:text-white"
                }`}
                aria-label={`Show ${scene.label} video`}
                aria-pressed={index === activeScene}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    index === activeScene ? "bg-[#1f7f39]" : "bg-white/35"
                  }`}
                />
                <span className="hidden xl:inline">{scene.label}</span>
                <span className="xl:hidden">0{index + 1}</span>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPlaying((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-[#071128]/55 text-white backdrop-blur-md transition-colors hover:border-[#9be15d] hover:text-[#9be15d]"
            aria-label={playing ? "Pause background film" : "Play background film"}
          >
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  );
}
