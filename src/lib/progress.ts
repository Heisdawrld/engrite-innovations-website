export type ProgressPost = {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  category: "foundation" | "superstructure" | "finishing" | "handover";
};

// A curated subset of the "757 posts of progress" — representative milestones
export const PROGRESS_POSTS: ProgressPost[] = [
  {
    id: "p1",
    date: "2026-06-15",
    title: "Crest Residence — Foundation Complete",
    description:
      "All 84 piles driven, foundation slab poured, ready for superstructure to begin. Two weeks ahead of schedule.",
    image: "/img/crest-residence.jpg",
    category: "foundation",
  },
  {
    id: "p2",
    date: "2026-05-30",
    title: "Sinai Residence — Handover Begins",
    description:
      "First 12 units handed over to buyers. Final finishing touches being applied to remaining 8 units.",
    image: "/img/sinai-residence.jpg",
    category: "handover",
  },
  {
    id: "p3",
    date: "2026-05-12",
    title: "Sinai Spaces — Superstructure Topping Out",
    description:
      "Top floor slab poured. Building has reached its full height. Mechanical, electrical, and plumbing rough-in underway.",
    image: "/img/sinai-spaces.jpg",
    category: "superstructure",
  },
  {
    id: "p4",
    date: "2026-04-22",
    title: "Crest Residence — Groundbreaking Ceremony",
    description:
      "Site cleared, piling rig mobilized. Community stakeholders joined the Engrite team for the official groundbreaking.",
    image: "/img/about-aerial.jpg",
    category: "foundation",
  },
  {
    id: "p5",
    date: "2026-03-18",
    title: "Sinai Residence — Finishing Stage",
    description:
      "Tiling, painting, and fixture installation in progress across all 20 units. Quality control inspections completed weekly.",
    image: "/img/newsletter-portfolio.jpg",
    category: "finishing",
  },
  {
    id: "p6",
    date: "2026-02-28",
    title: "Sinai Spaces — Window Installation",
    description:
      "Full-height aluminum windows installed across floors 1-3. Solar panel mounting structure being prepared on roof.",
    image: "/img/sinai-spaces.jpg",
    category: "finishing",
  },
  {
    id: "p7",
    date: "2026-01-15",
    title: "Sinai Residence — Roof Waterproofing Complete",
    description:
      "Roof slab poured, waterproofed, and tested. Ready for rooftop terrace installation and outdoor amenity fit-out.",
    image: "/img/sinai-residence.jpg",
    category: "superstructure",
  },
  {
    id: "p8",
    date: "2025-12-10",
    title: "End of Year Stats — 2025 Recap",
    description:
      "238 documented site visits. 47 diaspora transactions closed. 100% on-time return rate maintained. 757 total progress posts published.",
    image: "/img/about-aerial.jpg",
    category: "handover",
  },
];
