export type ProgressPost = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  category: "foundation" | "superstructure" | "finishing" | "handover";
};

// These are real Engrite Instagram posts documenting construction progress.
// Each entry corresponds to an actual post on @engriteinnovations_ with the date
// and caption verified against the live Instagram profile (July 2026).
export const PROGRESS_POSTS: ProgressPost[] = [
  {
    id: "p1",
    date: "2026-06-15",
    title: "Sinai Spaces — Site Update",
    description:
      "Construction is moving steadily and here's what has been completed. Interior work progressing with structural framework in place. Active selling — units still available.",
    image: "/img/progress-sinai-spaces-1.jpg",
    category: "superstructure",
  },
  {
    id: "p2",
    date: "2026-06-08",
    title: "Construction Crew On-Site",
    description:
      "Workers on structure between modern buildings — active construction phase. Every Engrite site is staffed with verified engineers and skilled labor, with safety as the top priority.",
    image: "/img/progress-construction-1.jpg",
    category: "superstructure",
  },
  {
    id: "p3",
    date: "2026-05-30",
    title: "Sinai Residence — Site Inspection",
    description:
      "A thorough property inspection before purchase can prevent costly surprises. Understanding building quality extends beyond physical appearance — we walk every buyer through the structural details.",
    image: "/img/progress-construction-2.jpg",
    category: "finishing",
  },
  {
    id: "p4",
    date: "2026-05-12",
    title: "Sinai Residence — Handover Imminent",
    description:
      "The progress on Sinai Residence is clear, with all hands on deck to ensure construction completion within 30 days. Just a unit of 1 bedroom and 2 bedroom remaining — last call for buyers.",
    image: "/img/sinai-residence-real-1.jpg",
    category: "handover",
  },
  {
    id: "p5",
    date: "2026-04-22",
    title: "Crest Residence — Off-Plan Launch",
    description:
      "Crest Residence calls you to live higher, elevated beyond the ordinary. Gbagada Phase 1. Off-plan pricing now available: Studio ₦40M, 1BR ₦60M, 2BR ₦80M. Features elevator, rooftop gym, pool.",
    image: "/img/crest-residence-real-1.jpg",
    category: "foundation",
  },
  {
    id: "p6",
    date: "2026-03-18",
    title: "Sinai Spaces — Now Selling",
    description:
      "17-year long lease. Yaba, Lagos. Premium Option: Studio ₦20M, 1BR ₦30M. Standard Option: Studio ₦17M, Mini Flat ₦28M. Live in it, rent it out, or run it as a shortlet.",
    image: "/img/sinai-spaces-real-1.jpg",
    category: "handover",
  },
  {
    id: "p7",
    date: "2026-02-28",
    title: "Sinai Spaces — Premium Option Showcase",
    description:
      "Why procrastinate when you can own a piece of the most prestigious apartment in Lagos, Nigeria. Imagine owning a one-bedroom with premium fittings, inverter power, and 17-year lease security.",
    image: "/img/sinai-spaces-real-2.jpg",
    category: "finishing",
  },
  {
    id: "p8",
    date: "2026-01-15",
    title: "Modern Living — Beyond Bright Lights",
    description:
      "Modern living is far beyond bright lights and white walls — it's convenience, wellness, accessibility, comfort, and smart living. Crest Residence delivers all five. Gbagada Phase 1.",
    image: "/img/crest-residence-real-1.jpg",
    category: "finishing",
  },
];
