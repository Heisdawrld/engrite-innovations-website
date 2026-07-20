import { GENERATED_BLOG_POSTS } from "./content-generated";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "investment" | "market" | "diaspora" | "guide" | "company";
  date: string;
  readTime: string;
  author: string;
  cover: string;
  content: string; // markdown
};

type RawBlogPost = Omit<BlogPost, "content"> & { _content?: string; body?: string };

function normalize(raw: RawBlogPost & { slug: string }): BlogPost {
  return {
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    category: raw.category,
    date: raw.date,
    readTime: raw.readTime,
    author: raw.author,
    cover: raw.cover,
    // Decap CMS writes the markdown body to `body` (special field name).
    content: raw.body ?? raw._content ?? "",
  };
}

export const BLOG_POSTS: BlogPost[] = (GENERATED_BLOG_POSTS as (RawBlogPost & { slug: string })[]).map(normalize);

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
