/**
 * Migration script: moves markdown body content into frontmatter fields
 * so Decap CMS can read them properly.
 *
 * Why: Decap CMS writes markdown content to a frontmatter field whose
 * name matches the field definition (e.g. 'answer', 'description', 'body').
 * The legacy files have the content as the markdown body (below the ---),
 * which the CMS doesn't load into the editor.
 *
 * This script:
 *   - For properties: moves body → frontmatter 'body' field (Decap's body convention)
 *   - For FAQs: moves body → frontmatter 'answer' field
 *   - For testimonials: moves body → frontmatter 'description' field
 *   - For client-testimonials: moves body → frontmatter 'quote' field
 *   - For blog: moves body → frontmatter 'body' field (already Decap convention)
 *
 * Idempotent: skips files where the target frontmatter field already exists.
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ROOT = path.join(process.cwd(), "content");

const RULES = [
  { dir: "properties", field: "body" },
  { dir: "faqs", field: "answer" },
  { dir: "testimonials", field: "description" },
  { dir: "client-testimonials", field: "quote" },
  { dir: "blog", field: "body" },
];

let migrated = 0;
let skipped = 0;

for (const { dir, field } of RULES) {
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const fullPath = path.join(fullDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);

    const bodyContent = parsed.content.trim();
    const hasField = Object.prototype.hasOwnProperty.call(parsed.data, field);

    if (hasField && parsed.data[field]) {
      // Already migrated
      skipped++;
      continue;
    }

    if (!bodyContent) {
      console.log(`⚠ ${dir}/${file}: no body content to migrate, skipping`);
      skipped++;
      continue;
    }

    // Move body → frontmatter field
    parsed.data[field] = bodyContent;

    // Re-serialize with empty body (Decap convention when field is named differently)
    const newRaw = matter.stringify("", parsed.data);
    fs.writeFileSync(fullPath, newRaw, "utf8");

    console.log(`✓ ${dir}/${file}: body → ${field} (${bodyContent.length} chars)`);
    migrated++;
  }
}

console.log(`\nDone. Migrated ${migrated} files, skipped ${skipped} files.`);
