import { GENERATED_TESTIMONIALS, GENERATED_CLIENT_TESTIMONIALS } from "./content-generated";

export type Testimonial = {
  id: string;
  category: "live" | "earn" | "shortlet" | "diaspora" | "realtor";
  title: string;
  scenario: string;
  description: string;
  outcomes: { label: string; value: string }[];
};

export type ClientTestimonial = {
  id: string;
  name: string;
  location: string;
  role: string;
  photo: string;
  property?: string;
  quote: string;
  rating?: number;
  featured?: boolean;
};

type RawTestimonial = Omit<Testimonial, "description"> & { _content?: string };
type RawClientTestimonial = Omit<ClientTestimonial, "quote"> & { _content?: string };

function normalizeTestimonial(raw: RawTestimonial & { slug: string }): Testimonial {
  return {
    id: raw.id ?? raw.slug,
    category: raw.category,
    title: raw.title,
    scenario: raw.scenario,
    description: raw._content ?? "",
    outcomes: raw.outcomes ?? [],
  };
}

function normalizeClient(raw: RawClientTestimonial & { slug: string }): ClientTestimonial {
  return {
    id: raw.id ?? raw.slug,
    name: raw.name,
    location: raw.location,
    role: raw.role,
    photo: raw.photo,
    property: raw.property,
    quote: raw._content ?? "",
    rating: raw.rating ?? 5,
    featured: raw.featured,
  };
}

export const TESTIMONIALS: Testimonial[] = (GENERATED_TESTIMONIALS as (RawTestimonial & { slug: string })[]).map(normalizeTestimonial);

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = (GENERATED_CLIENT_TESTIMONIALS as (RawClientTestimonial & { slug: string })[]).map(normalizeClient);
