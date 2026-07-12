export type PropertyStatus = "under-construction" | "last-units" | "off-plan";

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
  image: string; // panorama image (use property image as fallback)
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
  completionDate: string;
  startingPrice: number;
  annualReturn: number;
};

export const PROPERTIES: Property[] = [
  {
    slug: "sinai-spaces",
    name: "Sinai Spaces",
    tagline: "Studio apartments for the modern Lagos professional",
    status: "under-construction",
    statusLabel: "Under Construction",
    image: "/img/sinai-spaces.jpg",
    gallery: [
      "/img/sinai-spaces.jpg",
      "/img/about-aerial.jpg",
      "/img/newsletter-portfolio.jpg",
    ],
    location: "Yaba, Lagos",
    mapEmbed:
      "https://www.google.com/maps?q=Yaba,Lagos,Nigeria&output=embed",
    shortDesc:
      "Studio apartments designed for the modern Lagos professional. Affordable entry-point with strong rental potential.",
    description:
      "Sinai Spaces is Engrite's flagship affordable-luxury development in the heart of Yaba — Lagos's tech and education hub. Each studio is engineered for efficient living: 24-32 sqm of intelligently planned space with full-height windows, premium fittings, and shared amenities that punch above their weight class. Designed for young professionals, diaspora investors seeking rental yield, and first-time buyers looking to step onto the property ladder.",
    tags: ["17yr Lease", "Live or Earn", "₦2–4M/yr Rental", "₦5M Down"],
    units: [
      {
        name: "Studio — Standard",
        price: 17_000_000,
        size: "24 sqm",
        rentalYield: "₦2–3M/yr",
        features: ["Full-height windows", "Premium fittings", "Shared gym"],
      },
      {
        name: "Studio — Corner",
        price: 22_000_000,
        size: "32 sqm",
        rentalYield: "₦3–4M/yr",
        features: ["Dual aspect", "Larger kitchen", "Balcony access"],
      },
    ],
    amenities: ["24/7 Security", "Backup Power", "Parking", "Gym", "Coworking Lounge"],
    features: ["Solar Power", "Smart Home", "CCTV", "5% Legal Fees"],
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
    completionDate: "Q4 2026",
    startingPrice: 17_000_000,
    annualReturn: 7.1,
  },
  {
    slug: "sinai-residence",
    name: "Sinai Residence",
    tagline: "1-bedroom + home office for the working professional",
    status: "last-units",
    statusLabel: "Last Units Available",
    image: "/img/sinai-residence.jpg",
    gallery: [
      "/img/sinai-residence.jpg",
      "/img/about-aerial.jpg",
      "/img/newsletter-portfolio.jpg",
    ],
    location: "Morocco Rd, Yaba, Lagos",
    mapEmbed:
      "https://www.google.com/maps?q=Morocco+Road+Yaba+Lagos&output=embed",
    shortDesc:
      "Premium 1-bedroom + home office layouts in the heart of Yaba. Solar-powered, smart-home ready, with CCTV throughout.",
    description:
      "Sinai Residence is for buyers who want more than a studio — a proper 1-bedroom with a dedicated home office that supports remote work, hybrid professionals, and small families. Built with solar primary power, smart-home automation, and full CCTV coverage, it's a turnkey solution for buyers who want modern conveniences baked in. Only a handful of units remain in this near-complete development.",
    tags: ["Solar Power", "Smart Home", "CCTV", "5% Legal Fees"],
    units: [
      {
        name: "1 Bedroom + Home Office",
        price: 100_000_000,
        size: "65 sqm",
        rentalYield: "₦6–8M/yr",
        features: ["Home office", "Solar power", "Smart home", "CCTV"],
      },
    ],
    amenities: ["24/7 Security", "Solar Power", "Smart Home", "CCTV", "Parking", "Rooftop Terrace"],
    features: ["Solar Power", "Smart Home", "CCTV", "5% Legal Fees", "Premium Fittings"],
    paymentSchedule: [
      { milestone: "Initial Deposit", percentage: 25, description: "Secures your unit" },
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
    completionDate: "Q3 2026 — Handover Imminent",
    startingPrice: 100_000_000,
    annualReturn: 7.1,
  },
  {
    slug: "crest-residence",
    name: "Crest Residence",
    tagline: "Off-plan luxury living in Gbagada Phase One",
    status: "off-plan",
    statusLabel: "Off-Plan · New Launch",
    image: "/img/crest-residence.jpg",
    gallery: [
      "/img/crest-residence.jpg",
      "/img/about-aerial.jpg",
      "/img/newsletter-portfolio.jpg",
    ],
    location: "Gbagada Phase One, Lagos",
    mapEmbed:
      "https://www.google.com/maps?q=Gbagada+Phase+One+Lagos&output=embed",
    shortDesc:
      "Brand new off-plan launch with rooftop gym, pool, elevator, and smart home integration. 50% equity achievable in 9 months.",
    description:
      "Crest Residence is Engrite's most ambitious project to date — a luxury mid-rise in Gbagada Phase One featuring a rooftop gym, infinity pool, high-speed elevator, and full smart-home integration. As an off-plan launch, early buyers benefit from the lowest entry price and the strongest capital appreciation: 50% equity growth is achievable within 9 months based on Engrite's previous project track record. Ideal for diaspora investors and buyers seeking premium finishes in a fast-appreciating corridor.",
    tags: ["Rooftop Gym", "Pool", "Elevator", "Smart Home", "50% Equity in 9mo"],
    units: [
      {
        name: "Studio — Off-Plan",
        price: 40_000_000,
        size: "30 sqm",
        rentalYield: "₦3–4M/yr",
        features: ["Smart home", "Premium fittings", "Pool access"],
      },
      {
        name: "1 Bedroom — Off-Plan",
        price: 65_000_000,
        size: "55 sqm",
        rentalYield: "₦5–7M/yr",
        features: ["Smart home", "Balcony", "Pool access", "Gym access"],
      },
      {
        name: "2 Bedroom Penthouse",
        price: 120_000_000,
        size: "95 sqm",
        rentalYield: "₦9–12M/yr",
        features: ["Private rooftop", "Smart home", "Premium finishes"],
      },
    ],
    amenities: [
      "Rooftop Gym",
      "Infinity Pool",
      "High-Speed Elevator",
      "24/7 Security",
      "Solar Power",
      "Smart Home",
      "CCTV",
      "Covered Parking",
    ],
    features: ["Rooftop Gym", "Pool", "Elevator", "Smart Home", "50% Equity in 9mo"],
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
        title: "Rooftop Pool & Gym",
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
    completionDate: "Q4 2027",
    startingPrice: 40_000_000,
    annualReturn: 7.1,
  },
];

export function getProperty(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}
