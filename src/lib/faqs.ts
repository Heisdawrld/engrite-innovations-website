import { GENERATED_FAQS } from "./content-generated";

export type FAQ = {
  id: string;
  question: string;
  answer: string;
  category: "investment" | "legal" | "property" | "diaspora" | "general";
  order?: number;
};

type RawFAQ = Omit<FAQ, "answer"> & { _content?: string; answer?: string };

function normalize(raw: RawFAQ & { slug: string }): FAQ {
  return {
    id: raw.id ?? raw.slug,
    question: raw.question,
    // Decap CMS writes markdown to a frontmatter field named `answer`.
    // Legacy files (pre-CMS) have the answer as the markdown body.
    answer: raw.answer ?? raw._content ?? "",
    category: raw.category,
    order: raw.order,
  };
}

export const FAQS: FAQ[] = (GENERATED_FAQS as (RawFAQ & { slug: string })[]).map(normalize);
