import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You — Message Received",
  description:
    "Your message has been received by Engrite Innovations. We'll be in touch within 24 hours.",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#081534] px-4 text-center">
      <div className="max-w-md">
        {/* Checkmark */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-[#1F7A3A]/20">
          <svg
            className="h-10 w-10 text-[#1F7A3A]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="font-serif text-4xl font-normal text-white">
          Thank You!
        </h1>

        <p className="mt-4 text-[15px] font-light leading-relaxed text-white/60">
          Your message has been received. The Engrite team will be in touch
          within 24 hours.
        </p>

        <Link
          href="/"
          className="mt-10 inline-block bg-[#1F7A3A] px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#239540]"
        >
          Back to Home
        </Link>

        <p className="mt-6 text-[13px] text-white/30">
          Engrite Innovations Ltd. — Lagos, Nigeria
        </p>
      </div>
    </main>
  );
}
