export type PropertyStatus = "under-construction" | "last-units" | "off-plan" | "sample-units-open";

export type PropertyUnit = {
  name: string;
  price: number; // NGN
  size: string;
  rentalYield: string;
  features: string[];
};

export type PropertyPaymentTier = {
  milestone: string;
  percentage: number;
  description: string;
};

export type PropertyTourScene = {
  id: string;
  title: string;
  image: string;
  hotSpots?: { yaw: number; pitch: number; target: string; label: string }[];
};

export type Property = {
  slug: string;
  name: string;
  tagline: string;
  status: PropertyStatus;
  statusLabel: string;
  image: string;
  gallery: string[];
  location: string;
  mapEmbed: string;
  shortDesc: string;
  description: string;
  tags: string[];
  units: PropertyUnit[];
  amenities: string[];
  features: string[];
  paymentSchedule: PropertyPaymentTier[];
  tourScenes: PropertyTourScene[];
  // === VIRTUAL TOUR OPTIONS (set ONE of these — priority order below) ===
  //
  // 1. matterportUrl — paste a Matterport showcase URL for a true 360° tour.
  //    Format: "https://my.matterport.com/show/?m=XXXXXXXX"
  //    Best quality. Get this from a Matterport scan of the property.
  //
  // 2. videoUrl — paste a video link (MP4 / YouTube / Vimeo).
  //    Examples:
  //      "https://example.com/tour.mp4"           (direct MP4)
  //      "https://www.youtube.com/watch?v=XXXXX"  (YouTube)
  //      "https://vimeo.com/XXXXXX"               (Vimeo)
  //    Easy to produce — just film a walkthrough and upload.
  //
  // 3. tourScenes — leave as-is; the gallery images above are used as a
  //    clean carousel fallback (no warping). Works with any photos.
  //
  // To upgrade: just paste a URL into matterportUrl or videoUrl. No code changes.
  matterportUrl?: string;
  videoUrl?: string;
  completionDate: string;
  startingPrice: number;
  annualReturn: number;
  useCases?: string[];
  valuePillars?: string[];
};

export const PROPERTIES: Property[] = [
  {
    slug: "sinai-spaces",
    name: "Sinai Spaces",
    tagline: "Spaces For You! — Affordable entry-point to Lagos property ownership",
    status: "under-construction",
    statusLabel: "Active Selling",
    image: "/img/sinai-spaces-real-1.jpg",
    // TEST: Matterport 360° tour embed (temporary — remove before client review)
    matterportUrl: "https://my.matterport.com/show/?m=dopJL4huPmu",
    gallery: [
      "/img/sinai-spaces-real-1.jpg",
      "/img/sinai-spaces-real-2.jpg",
      "/img/progress-sinai-spaces-1.jpg",
    ],
    location: "Akoka, Yaba, Lagos",
    mapEmbed: "https://www.google.com/maps?q=Akoka+Yaba+Lagos+Nigeria&output=embed",
    shortDesc:
      "Studio and mini-flat apartments in Akoka, Yaba — offering a 17-year leasehold with Basic and Premium options. Live in it, rent it out, or run it as a shortlet/Airbnb.",
    description:
      "Sinai Spaces is Engrite's affordable-luxury development in Akoka, Yaba — one of Lagos's most strategic neighborhoods, home to the University of Lagos and a thriving young-professional community. Designed around three value pillars — Efficiency, Safety, and Comfort — every unit is built for practical living with inverter-backed 24/7 power supply. Sinai Spaces pioneered Engrite's signature 17-year leasehold structure, giving buyers flexible ownership: move in (Live), rent it out for steady income (Earn), or operate it as a shortlet/Airbnb. With two pricing tiers (Basic and Premium), it's the most accessible entry point into Lagos property ownership.",
    tags: ["17yr Lease", "Live or Earn", "Shortlet-ready", "24/7 Power"],
    units: [
      {
        name: "Studio Apartment — Basic",
        price: 17_000_000,
        size: "Compact studio",
        rentalYield: "₦2–3M/yr",
        features: ["Inverter power", "Premium location", "17-year lease"],
      },
      {
        name: "Mini Flat — Basic",
        price: 28_000_000,
        size: "Mini flat",
        rentalYield: "₦3–4M/yr",
        features: ["Inverter power", "Separate kitchen", "17-year lease"],
      },
      {
        name: "Studio Apartment — Premium",
        price: 20_000_000,
        size: "Upgraded studio",
        rentalYield: "₦3–4M/yr",
        features: ["Inverter power", "Premium fittings", "17-year lease"],
      },
      {
        name: "1 Bedroom Apartment — Premium",
        price: 30_000_000,
        size: "1 bedroom",
        rentalYield: "₦4–6M/yr",
        features: ["Inverter power", "Premium fittings", "17-year lease"],
      },
    ],
    amenities: ["24/7 Power (Inverter)", "24/7 Security", "Backup Power", "Parking", "Strategic Location"],
    features: ["17-Year Lease", "Live or Earn Model", "Shortlet/Airbnb Ready", "Inverter Power", "5% Legal Fees"],
    paymentSchedule: [
      { milestone: "Initial Deposit", percentage: 30, description: "Secures your unit" },
      { milestone: "Construction Milestone 1", percentage: 30, description: "At foundation completion" },
      { milestone: "Construction Milestone 2", percentage: 25, description: "At superstructure" },
      { milestone: "Handover", percentage: 15, description: "On key collection" },
    ],
    tourScenes: [
      {
        id: "exterior",
        title: "Exterior View",
        image: "/img/sinai-spaces.jpg",
        hotSpots: [
          { yaw: 30, pitch: -5, target: "lobby", label: "Enter Lobby" },
        ],
      },
      {
        id: "lobby",
        title: "Resident Lobby",
        image: "/img/about-aerial.jpg",
        hotSpots: [
          { yaw: 90, pitch: 0, target: "studio", label: "View Studio" },
          { yaw: -90, pitch: 0, target: "exterior", label: "Back to Exterior" },
        ],
      },
      {
        id: "studio",
        title: "Show Studio",
        image: "/img/newsletter-portfolio.jpg",
        hotSpots: [
          { yaw: 180, pitch: 0, target: "lobby", label: "Back to Lobby" },
        ],
      },
    ],
    completionDate: "Active Selling — Units Available",
    startingPrice: 17_000_000,
    annualReturn: 7.1,
    useCases: [
      "Live in it — your own Lagos address",
      "Rent it out for steady annual income (₦2–6M/yr)",
      "Operate as shortlet/Airbnb for higher yields",
    ],
    valuePillars: ["Efficiency", "Safety", "Comfort"],
  },
  {
    slug: "sinai-residence",
    name: "Sinai Residence",
    tagline: "Yaba's premium smart real estate development",
    status: "sample-units-open",
    statusLabel: "Sample Units Open — Last Units Remaining",
    image: "/img/sinai-residence-real-1.jpg",
    gallery: [
      "/img/sinai-residence-real-1.jpg",
      "/img/about-aerial.jpg",
      "/img/newsletter-portfolio.jpg",
    ],
    location: "Morocco Road, Yaba, Lagos",
    mapEmbed: "https://www.google.com/maps?q=Morocco+Road+Yaba+Lagos+Nigeria&output=embed",
    shortDesc:
      "Premium apartments with optional Home Office layouts on Morocco Road, Yaba. Sample units now open for inspection. Smart-home ready with inverter power.",
    description:
      "Sinai Residence is Engrite's flagship premium development on Morocco Road, Yaba — designed around three value pillars: Comfort, Convenience, and Lasting value. The development offers both standard apartments (Studio and 1-Bedroom) and unique Home Office layouts (1BR + Home Office and 2BR + Home Office) for hybrid professionals and small families. Every unit is smart-home ready with inverter-backed 24/7 power supply. Sample units are now officially open for investors and realtors to inspect — book a private viewing. Only a handful of units remain in this near-complete development.",
    tags: ["Smart Home", "Home Office Option", "24/7 Power", "5% Legal Fees"],
    units: [
      {
        name: "Studio Apartment",
        price: 19_990_000,
        size: "Studio",
        rentalYield: "₦2–3M/yr",
        features: ["Smart home ready", "Inverter power", "Premium location"],
      },
      {
        name: "1-Bedroom Apartment",
        price: 29_990_000,
        size: "1 bedroom",
        rentalYield: "₦3–5M/yr",
        features: ["Smart home ready", "Inverter power", "Modern fittings"],
      },
      {
        name: "1 Bedroom + Home Office (Unfurnished)",
        price: 100_000_000,
        size: "1 bedroom + office",
        rentalYield: "₦6–8M/yr",
        features: ["Home office", "Smart home", "Inverter power", "Premium fittings"],
      },
      {
        name: "2 Bedroom + Home Office (Unfurnished)",
        price: 120_000_000,
        size: "2 bedroom + office",
        rentalYield: "₦8–10M/yr",
        features: ["Home office", "Smart home", "Inverter power", "Premium fittings", "Family-sized"],
      },
    ],
    amenities: ["24/7 Power (Inverter)", "Smart Home Ready", "24/7 Security", "Parking", "Premium Fittings", "Home Office Layouts"],
    features: ["Smart Home", "Inverter Power (24/7)", "Home Office Option", "5% Legal Fees", "Premium Fittings", "Sample Units Open"],
    paymentSchedule: [
      { milestone: "Initial Deposit", percentage: 25, description: "₦5M minimum — secures your unit" },
      { milestone: "Construction Milestone 1", percentage: 30, description: "At superstructure" },
      { milestone: "Construction Milestone 2", percentage: 30, description: "At finishing" },
      { milestone: "Handover", percentage: 15, description: "On key collection" },
    ],
    tourScenes: [
      {
        id: "exterior",
        title: "Exterior View",
        image: "/img/sinai-residence.jpg",
        hotSpots: [
          { yaw: 30, pitch: -5, target: "living", label: "Enter Living Room" },
        ],
      },
      {
        id: "living",
        title: "Living Room",
        image: "/img/about-aerial.jpg",
        hotSpots: [
          { yaw: 90, pitch: 0, target: "office", label: "Home Office" },
          { yaw: 180, pitch: 0, target: "bedroom", label: "Bedroom" },
        ],
      },
      {
        id: "office",
        title: "Home Office",
        image: "/img/newsletter-portfolio.jpg",
        hotSpots: [{ yaw: -90, pitch: 0, target: "living", label: "Back to Living" }],
      },
      {
        id: "bedroom",
        title: "Master Bedroom",
        image: "/img/crest-residence.jpg",
        hotSpots: [{ yaw: 0, pitch: 0, target: "living", label: "Back to Living" }],
      },
    ],
    completionDate: "Sample Units Open — Book Inspection",
    startingPrice: 19_990_000,
    annualReturn: 7.1,
    useCases: [
      "Live in it — premium Yaba address with smart home features",
      "Earn rental income with Home Office premium (₦6–10M/yr)",
      "Ideal for hybrid professionals and diaspora investors",
    ],
    valuePillars: ["Comfort", "Convenience", "Lasting"],
  },
  {
    slug: "crest-residence",
    name: "Crest Residence",
    tagline: "Live higher, elevated beyond the ordinary",
    status: "off-plan",
    statusLabel: "Off-Plan · New Launch",
    image: "/img/crest-residence-real-1.jpg",
    gallery: [
      "/img/crest-residence-real-1.jpg",
      "/img/about-aerial.jpg",
      "/img/newsletter-portfolio.jpg",
    ],
    location: "Gbagada Phase 1, Lagos",
    mapEmbed: "https://www.google.com/maps?q=Gbagada+Phase+1+Lagos+Nigeria&output=embed",
    shortDesc:
      "Off-plan luxury in Gbagada Phase 1 — elevator, rooftop gym, rooftop lounge, swimming pool, fitted kitchens, 24/7 electricity. Studio, 1BR, and 2BR available.",
    description:
      "Crest Residence is Engrite's most ambitious luxury development, located in Gbagada Phase 1 — one of Lagos's most demanded and desired residential locations. This off-plan project offers Studio, 1-Bedroom, and 2-Bedroom apartments with premium amenities including a rooftop gym, rooftop lounge, swimming pool, high-speed elevator, fitted kitchens, and 24/7 electricity with full security coverage. As an off-plan launch, early buyers benefit from the lowest entry price and strongest capital appreciation potential. Crest Residence calls you to live higher — elevated beyond the ordinary.",
    tags: ["Rooftop Gym", "Swimming Pool", "Elevator", "Fitted Kitchens", "24/7 Electricity"],
    units: [
      {
        name: "Studio Apartment — Off-Plan",
        price: 40_000_000,
        size: "Studio",
        rentalYield: "₦3–4M/yr",
        features: ["Fitted kitchen", "Pool access", "Gym access", "Elevator"],
      },
      {
        name: "1 Bedroom Apartment — Off-Plan",
        price: 60_000_000,
        size: "1 bedroom",
        rentalYield: "₦5–7M/yr",
        features: ["Fitted kitchen", "Balcony", "Pool access", "Gym access", "Elevator"],
      },
      {
        name: "2 Bedroom Apartment — Off-Plan",
        price: 80_000_000,
        size: "2 bedroom",
        rentalYield: "₦7–10M/yr",
        features: ["Fitted kitchen", "Large balcony", "Pool access", "Gym access", "Elevator", "Family-sized"],
      },
    ],
    amenities: [
      "Elevator",
      "Rooftop Gym",
      "Rooftop Lounge",
      "Swimming Pool",
      "24/7 Electricity",
      "Fitted Kitchens",
      "24/7 Security",
      "Covered Parking",
    ],
    features: ["Elevator", "Rooftop Gym", "Rooftop Lounge", "Swimming Pool", "24/7 Electricity", "Fitted Kitchens", "24/7 Security", "Off-Plan Pricing"],
    paymentSchedule: [
      { milestone: "Reservation", percentage: 10, description: "Off-plan reservation" },
      { milestone: "Foundation Complete", percentage: 20, description: "Within 90 days" },
      { milestone: "Superstructure", percentage: 30, description: "Within 6 months" },
      { milestone: "Finishing", percentage: 25, description: "Within 9 months" },
      { milestone: "Handover", percentage: 15, description: "Within 12 months" },
    ],
    tourScenes: [
      {
        id: "exterior",
        title: "Exterior Render",
        image: "/img/crest-residence.jpg",
        hotSpots: [
          { yaw: 30, pitch: -5, target: "lobby", label: "Enter Lobby" },
          { yaw: -30, pitch: 30, target: "rooftop", label: "View Rooftop" },
        ],
      },
      {
        id: "lobby",
        title: "Ground Lobby",
        image: "/img/about-aerial.jpg",
        hotSpots: [
          { yaw: 90, pitch: 0, target: "unit", label: "View Unit" },
          { yaw: -90, pitch: 0, target: "exterior", label: "Back to Exterior" },
        ],
      },
      {
        id: "rooftop",
        title: "Rooftop Pool, Gym & Lounge",
        image: "/img/newsletter-portfolio.jpg",
        hotSpots: [{ yaw: 180, pitch: -10, target: "exterior", label: "Back to Exterior" }],
      },
      {
        id: "unit",
        title: "Show Unit",
        image: "/img/sinai-spaces.jpg",
        hotSpots: [{ yaw: 0, pitch: 0, target: "lobby", label: "Back to Lobby" }],
      },
    ],
    completionDate: "Off-Plan — 12-Month Build Cycle",
    startingPrice: 40_000_000,
    annualReturn: 7.1,
    useCases: [
      "Live in it — luxury Gbagada address with full amenities",
      "Earn premium rental income (₦3–10M/yr depending on unit)",
      "Strongest capital appreciation potential (off-plan entry pricing)",
    ],
    valuePillars: ["Elevation", "Luxury", "Amenity-Rich"],
  },
];

export function getProperty(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}
