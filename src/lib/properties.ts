import { GENERATED_PROPERTIES } from "./content-generated";

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
  matterportUrl?: string;
  videoUrl?: string;
  completionDate: string;
  startingPrice: number;
  annualReturn: number;
  useCases?: string[];
  valuePillars?: string[];
};

type RawProperty = Omit<Property, "description"> & {
  _content?: string;
  body?: string;
  description?: string;
};

function normalize(raw: RawProperty): Property {
  return {
    slug: raw.slug,
    name: raw.name,
    tagline: raw.tagline,
    status: raw.status,
    statusLabel: raw.statusLabel,
    image: raw.image,
    gallery: raw.gallery ?? [],
    location: raw.location,
    mapEmbed: raw.mapEmbed,
    shortDesc: raw.shortDesc,
    // Decap CMS writes the markdown body to `body` (special field name).
    // The generate-content script also exposes it as `_content`.
    description: raw.description ?? raw.body ?? raw._content ?? "",
    tags: raw.tags ?? [],
    units: raw.units ?? [],
    amenities: raw.amenities ?? [],
    features: raw.features ?? [],
    paymentSchedule: raw.paymentSchedule ?? [],
    tourScenes: raw.tourScenes ?? [],
    matterportUrl: raw.matterportUrl || undefined,
    videoUrl: raw.videoUrl || undefined,
    completionDate: raw.completionDate,
    startingPrice: raw.startingPrice,
    // Round to 2 decimals to avoid floating-point precision noise.
    annualReturn: Math.round((raw.annualReturn ?? 0) * 100) / 100,
    useCases: raw.useCases,
    valuePillars: raw.valuePillars,
  };
}

export const PROPERTIES: Property[] = (GENERATED_PROPERTIES as RawProperty[]).map(normalize);

export function getProperty(slug: string): Property | undefined {
  return PROPERTIES.find((p) => p.slug === slug);
}

export function getAllPropertySlugs(): string[] {
  return PROPERTIES.map((p) => p.slug);
}
