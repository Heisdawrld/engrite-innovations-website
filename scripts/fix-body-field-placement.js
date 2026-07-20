/**
 * Fix-up script: For collections using the special `body` field name
 * (properties, blog), Decap CMS expects the content in the FILE BODY
 * (below the ---), NOT in frontmatter. The previous migration moved
 * everything into frontmatter, which broke properties and blog.
 *
 * This script:
 *   - For properties & blog: moves frontmatter 'body' → file body
 *   - For FAQs, testimonials, client-testimonials: keeps content in
 *     frontmatter (correct — non-body field names write to frontmatter)
 */

const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const ROOT = path.join(process.cwd(), "content");

// Collections where the markdown field is named 'body' — these need
// the content in the file body, not frontmatter.
const BODY_FIELD_COLLECTIONS = ["properties", "blog"];

let fixed = 0;
let skipped = 0;

for (const dir of BODY_FIELD_COLLECTIONS) {
  const fullDir = path.join(ROOT, dir);
  if (!fs.existsSync(fullDir)) continue;

  const files = fs.readdirSync(fullDir).filter((f) => f.endsWith(".md"));

  for (const file of files) {
    const fullPath = path.join(fullDir, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw);

    const bodyInFrontmatter = parsed.data.body;

    if (!bodyInFrontmatter || typeof bodyInFrontmatter !== "string") {
      console.log(`⚠ ${dir}/${file}: no body in frontmatter, skipping`);
      skipped++;
      continue;
    }

    // Remove body from frontmatter, move to file body
    delete parsed.data.body;
    const newRaw = matter.stringify(bodyInFrontmatter, parsed.data);
    fs.writeFileSync(fullPath, newRaw, "utf8");

    console.log(`✓ ${dir}/${file}: frontmatter 'body' → file body (${bodyInFrontmatter.length} chars)`);
    fixed++;
  }
}

console.log(`\nDone. Fixed ${fixed} files, skipped ${skipped} files.`);
