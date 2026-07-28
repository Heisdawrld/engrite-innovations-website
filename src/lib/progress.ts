export type ProgressPost = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  category: "foundation" | "superstructure" | "finishing" | "handover";
};

// Replace or confirm dates, descriptions and images against the company's
// approved construction records before publication.
export const PROGRESS_POSTS: ProgressPost[] = [
  {
    id: "p1",
    date: "2026-06-15",
    title: "Sinai Spaces — Site Update",
    description:
      "Construction is moving steadily and here's what has been completed. Interior work progressing with structural framework in place. Active selling — units still available.",
    image: "/img/progress-sinai-spaces-1.webp",
    category: "superstructure",
  },
  {
    id: "p2",
    date: "2026-06-08",
    title: "Construction Crew On-Site",
    description:
      "An on-site view of the active construction phase. Add the approved milestone, site team and safety notes supplied by the company.",
    image: "/img/progress-construction-1.webp",
    category: "superstructure",
  },
  {
    id: "p3",
    date: "2026-05-30",
    title: "Sinai Residence — Site Inspection",
    description:
      "A dated site-inspection record showing the work in progress. Add the verified milestone and inspection notes supplied by the project team.",
    image: "/img/progress-construction-2.webp",
    category: "finishing",
  },
  {
    id: "p4",
    date: "2026-05-12",
    title: "Sinai Residence — Handover Imminent",
    description:
      "Finishing-stage update for Sinai Residence. Confirm the current delivery programme and unit availability in the latest offer document.",
    image: "/img/sinai-residence-real-1.webp",
    category: "handover",
  },
  {
    id: "p5",
    date: "2026-04-22",
    title: "Crest Residence — Off-Plan Launch",
    description:
      "Early-stage project update for Crest Residence in Gbagada Phase 1. Pricing, planned amenities and availability are subject to the current offer document.",
    image: "/img/crest-residence-real-1.webp",
    category: "foundation",
  },
  {
    id: "p6",
    date: "2026-03-18",
    title: "Sinai Spaces — Now Selling",
    description:
      "Project update for Sinai Spaces in Yaba, Lagos. Confirm unit options, long-lease terms, permitted uses and current pricing before reservation.",
    image: "/img/sinai-spaces-real-1.webp",
    category: "handover",
  },
  {
    id: "p7",
    date: "2026-02-28",
    title: "Sinai Spaces — Premium Option Showcase",
    description:
      "A closer look at the Premium option and its planned fittings. Confirm the final specification and lease terms in the applicable agreement.",
    image: "/img/sinai-spaces-real-2.webp",
    category: "finishing",
  },
  {
    id: "p8",
    date: "2026-01-15",
    title: "Modern Living — Beyond Bright Lights",
    description:
      "A concept update for Crest Residence focused on convenience, wellness, accessibility, comfort and smart-living features.",
    image: "/img/crest-residence-real-1.webp",
    category: "finishing",
  },
];
