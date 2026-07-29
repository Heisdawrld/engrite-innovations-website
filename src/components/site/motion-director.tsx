"use client";

import { useEffect } from "react";

const IDLE_DELAY = 8_000;

export function MotionDirector() {
  useEffect(() => {
    const root = document.documentElement;
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let idleTimer = 0;
    let pointerFrame = 0;

    const clearIdle = () => {
      root.classList.remove("motion-idle");
      window.clearTimeout(idleTimer);
      if (!motionPreference.matches) {
        idleTimer = window.setTimeout(() => {
          root.classList.add("motion-idle");
        }, IDLE_DELAY);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      clearIdle();
      if (pointerFrame || motionPreference.matches) return;

      pointerFrame = window.requestAnimationFrame(() => {
        root.style.setProperty("--motion-x", `${event.clientX}px`);
        root.style.setProperty("--motion-y", `${event.clientY}px`);
        root.style.setProperty(
          "--motion-pan-x",
          `${((event.clientX / window.innerWidth) - 0.5) * 18}px`,
        );
        root.style.setProperty(
          "--motion-pan-y",
          `${((event.clientY / window.innerHeight) - 0.5) * 12}px`,
        );
        pointerFrame = 0;
      });
    };

    const handlePreferenceChange = () => {
      root.classList.remove("motion-idle");
      window.clearTimeout(idleTimer);
      if (!motionPreference.matches) clearIdle();
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", clearIdle, { passive: true });
    window.addEventListener("keydown", clearIdle);
    window.addEventListener("touchstart", clearIdle, { passive: true });
    motionPreference.addEventListener("change", handlePreferenceChange);
    clearIdle();

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", clearIdle);
      window.removeEventListener("keydown", clearIdle);
      window.removeEventListener("touchstart", clearIdle);
      motionPreference.removeEventListener("change", handlePreferenceChange);
      window.clearTimeout(idleTimer);
      window.cancelAnimationFrame(pointerFrame);
      root.classList.remove("motion-idle");
      root.style.removeProperty("--motion-x");
      root.style.removeProperty("--motion-y");
      root.style.removeProperty("--motion-pan-x");
      root.style.removeProperty("--motion-pan-y");
    };
  }, []);

  return (
    <div className="site-motion-stage" aria-hidden="true">
      <span className="motion-pointer-light" />
      <span className="motion-orb motion-orb-one" />
      <span className="motion-orb motion-orb-two" />
      <span className="motion-broadcast-beam" />
      <span className="motion-orbit-ring" />
      <div className="motion-idle-copy">
        <span>BUILD</span>
        <span>OWN</span>
        <span>GROW</span>
      </div>
    </div>
  );
}
