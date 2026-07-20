/**
 * Prebuild script: reads all markdown files in /content and generates
 * a single TypeScript file at src/lib/content-generated.ts
 *
 * This lets client components import the data without needing fs access
 * at runtime (which Next.js static export doesn't allow).
 *
 * Run this before `next build` — it's wired in package.json's build script.
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ROOT = path.join(process.cwd(), "content");
const OUT = path.join(process.cwd(), "src/lib/content-generated.ts");

function loadCollection(dir) {
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) return [];

  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(fullDir, file), "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.md$/, "");
      return { ...data, slug, _content: content };
    })
    .sort((a, b) => {
      const aOrder = a.order ?? Infinity;
      const bOrder = b.order ?? Infinity;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.slug.localeCompare(b.slug);
    });
}

function loadSettings(file) {
  const fullPath = path.join(ROOT, "settings", file);
  if (!fs.existsSync(fullPath)) return null;
  const raw = fs.readFileSync(fullPath, "utf8");
  return matter(raw).data;
}

const data = {
  properties: loadCollection("properties"),
  faqs: loadCollection("faqs"),
  testimonials: loadCollection("testimonials"),
  clientTestimonials: loadCollection("client-testimonials"),
  blog: loadCollection("blog").sort((a, b) => new Date(b.date) - new Date(a.date)),
  settings: loadSettings("site.md"),
};

const ts = `// AUTO-GENERATED — DO NOT EDIT BY HAND.
// This file is regenerated from content/ on every build.
// To update content, edit the markdown files in content/ or use /admin/.

export const GENERATED_PROPERTIES = ${JSON.stringify(data.properties, null, 2)};

export const GENERATED_FAQS = ${JSON.stringify(data.faqs, null, 2)};

export const GENERATED_TESTIMONIALS = ${JSON.stringify(data.testimonials, null, 2)};

export const GENERATED_CLIENT_TESTIMONIALS = ${JSON.stringify(data.clientTestimonials, null, 2)};

export const GENERATED_BLOG_POSTS = ${JSON.stringify(data.blog, null, 2)};

export const GENERATED_SETTINGS = ${JSON.stringify(data.settings, null, 2)};
`;

fs.writeFileSync(OUT, ts, "utf8");
console.log(`✓ Generated ${path.relative(process.cwd(), OUT)}`);
console.log(`  - ${data.properties.length} properties`);
console.log(`  - ${data.faqs.length} FAQs`);
console.log(`  - ${data.testimonials.length} testimonials`);
console.log(`  - ${data.clientTestimonials.length} client testimonials`);
console.log(`  - ${data.blog.length} blog posts`);
console.log(`  - settings: ${data.settings ? "loaded" : "missing"}`);
