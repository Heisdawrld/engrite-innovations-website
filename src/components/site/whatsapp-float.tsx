"use client";

import { useEffect, useState } from "react";

export function WhatsAppFloat() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href="https://wa.me/2348130665862?text=Hi%20Engrite%20Innovations%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20properties."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Engrite on WhatsApp"
      className={`group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-110 hover:shadow-[0_12px_36px_rgba(37,211,102,0.55)] sm:bottom-6 sm:right-6 sm:h-[60px] sm:w-[60px] ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <svg viewBox="0 0 32 32" fill="currentColor" className="h-6 w-6 sm:h-[30px] sm:w-[30px]">
        <path d="M16.003 3C9.376 3 4 8.376 4 15.003c0 2.387.708 4.61 1.928 6.477L4 28l6.683-1.898a11.952 11.952 0 005.32 1.276h.005c6.626 0 12.003-5.376 12.003-12.003 0-3.213-1.252-6.232-3.523-8.503A11.93 11.93 0 0016.003 3zm0 21.81a9.79 9.79 0 01-4.99-1.366l-.358-.213-3.972 1.128 1.063-3.867-.234-.397a9.836 9.836 0 01-1.52-5.252c0-5.43 4.422-9.852 9.853-9.852a9.79 9.79 0 016.972 2.888 9.79 9.79 0 012.882 6.978c.001 5.43-4.42 9.853-9.696 9.953zm5.402-7.418c-.295-.148-1.748-.864-2.018-.963-.27-.099-.467-.148-.663.149-.197.296-.762.961-.934 1.158-.172.197-.345.222-.64.074-.295-.148-1.247-.46-2.376-1.467-.878-.784-1.471-1.752-1.643-2.048-.172-.296-.018-.456.13-.604.133-.133.296-.345.443-.518.148-.173.198-.296.296-.494.099-.197.05-.37-.025-.518-.074-.148-.663-1.604-.91-2.197-.24-.578-.483-.5-.663-.51-.171-.008-.368-.01-.564-.01a1.084 1.084 0 00-.787.37c-.27.296-1.03 1.01-1.03 2.466 0 1.456 1.054 2.86 1.202 3.058.148.197 2.078 3.17 5.04 4.448.704.304 1.253.485 1.681.622.706.224 1.349.193 1.857.117.566-.085 1.748-.715 1.994-1.405.247-.69.247-1.282.173-1.406-.074-.123-.27-.197-.566-.345z" />
      </svg>
      <span
        className="absolute right-full mr-3 hidden whitespace-nowrap rounded bg-[#102357] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white opacity-0 transition-opacity group-hover:block group-hover:opacity-100 md:block"
        aria-hidden="true"
      >
        Chat on WhatsApp
      </span>
      <span
        className="animate-wa-pulse pointer-events-none absolute inset-0 rounded-full border-2 border-[#25D366]"
        aria-hidden="true"
      />
    </a>
  );
}
