"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "span";
};

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let triggered = false;
    const reveal = () => {
      if (triggered) return;
      triggered = true;
      setVisible(true);
    };

    // Failsafe: force visibility after 4s if the IntersectionObserver never fires
    const failsafe = setTimeout(reveal, 4000);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          observer.disconnect();
          clearTimeout(failsafe);
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <Tag
      // @ts-expect-error — ref typing for polymorphic component
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
