# Admin Panel Setup Guide

Your website now has a full content management system (CMS). Your client can log in at **`yourdomain.com/admin/`** and edit everything via simple forms — no code knowledge needed.

## What the Client Can Edit

| Collection | What's Inside |
|---|---|
| **Properties** | Names, prices, photos, descriptions, units, payment schedules, status, video URLs |
| **FAQs** | Questions, answers, categories, display order |
| **Use-Case Scenarios** | Investment scenarios with outcome highlights |
| **Client Testimonials** | Real client quotes with photos (add unlimited) |
| **Blog Posts** | Full blog with markdown editor, cover images, categories |
| **Site Settings** | Contact info, hero text, social links, business hours, stats |

## Setup — Three Dashboard Steps (One-Time, ~5 Minutes)

After deploying to Netlify, do these once:

### Step 1: Enable Netlify Identity

1. Go to your Netlify dashboard → click your site
2. Top menu → **Integrations** → **Identity**
3. Click **Enable Identity**
4. Under **Registration** → set to **Invite only** (so only people you invite can log in)
5. Under **External providers** → optionally enable Google login for easier access

### Step 2: Enable Git Gateway

1. Still in Identity settings → scroll to **Services** → **Git Gateway**
2. Click **Enable Git Gateway**
3. This lets the CMS commit edits to your GitHub repo on behalf of users (so they don't need their own GitHub accounts)

### Step 3: Invite the Client

1. In Identity → **Invite users**
2. Enter the client's email address (e.g. `victor@engriteinnovations.com`)
3. They'll receive an email with a "Set your password" link
4. They click the link, set a password, and they're in

That's it. The client now visits `yourdomain.com/admin/`, logs in with their email + password, and can edit everything.

---

## How the Client Uses It

### Logging In
1. Visit `yourdomain.com/admin/`
2. Enter email + password
3. Land on the dashboard — sees all collections in the sidebar

### Editing a Property (e.g. updating Sinai Spaces price)
1. Click **Properties** in the sidebar
2. Click **Sinai Spaces**
3. Find the **Units & Pricing** section → change the price
4. Click **Save** (top right)
5. The change is committed to GitHub → Netlify rebuilds → live in ~30 seconds

### Adding a New Property
1. Click **Properties** → **New Property** (top right)
2. Fill in: name, tagline, status, photos, location, prices, etc.
3. Click **Save** → it's live on the site

### Uploading Photos
- Anywhere you see an **image field**, click **Choose** → upload from their computer/phone
- Photos are saved to `/public/uploads/` in the repo and served at `/uploads/filename.jpg`

### Adding a Client Testimonial
1. Click **Client Testimonials** → **New Client Testimonial**
2. Fill in: name, location, role, photo, quote
3. Toggle **Feature on Homepage** if they want it shown prominently
4. Save

### Editing Contact Info / Hero Text / Phone Numbers
1. Click **Site Settings** (bottom of sidebar)
2. Edit the relevant section (Contact, Hero, Stats, etc.)
3. Save — changes apply across the entire site

---

## How It Works Under the Hood

```
Client edits in /admin/
       ↓
Decap CMS commits to GitHub repo (via Git Gateway)
       ↓
Netlify auto-rebuilds (next build + content generation)
       ↓
New static site deployed (~30 sec)
       ↓
Site updated live
```

Every edit is saved as a Markdown file in `/content/`. At build time, `scripts/generate-content.js` reads all those files and generates a single TypeScript file (`src/lib/content-generated.ts`) that the site imports. This means:

- **No database** to manage or pay for
- **No vendor lock-in** — content is just markdown files in your git repo
- **Full version history** — every edit is a git commit, so you can revert any change
- **Works offline-ish** — if Netlify disappears tomorrow, you still have all your content

---

## Troubleshooting

### "I can't log in — it says 'no users found'"
You haven't been invited yet. The developer needs to invite your email via Netlify Identity dashboard.

### "I saved my edit but the site didn't update"
Wait 30–60 seconds for Netlify to rebuild. Check the Netlify dashboard → **Deploys** tab to see the rebuild in progress.

### "I accidentally deleted a property — can I get it back?"
Yes! Go to your GitHub repo → `content/properties/` → find the file you deleted → check the commit history → revert. Or ask the developer to restore it. Nothing is ever truly lost — every change is a git commit.

### "I want to add a blog post with images"
1. **Blog Posts** → **New Blog Post**
2. Upload a **Cover Image**
3. Write the article body in the markdown editor (you can use the toolbar for headings, bold, links, etc.)
4. To embed an image inside the article: click the image icon in the toolbar → upload
5. Save

### "Can I edit from my phone?"
Yes — the admin is fully mobile-responsive. Bookmark `yourdomain.com/admin/` on your phone's home screen for app-like access.

---

## Cost

- **$0** — completely free on Netlify's starter plan
- Includes: 100GB bandwidth/month, 300 build minutes/month, unlimited identity users
- If you exceed the free tier (unlikely for a real estate site), upgrade to Netlify Pro for $19/month

---

## Developer Notes (for you)

- **Content lives in** `/content/{properties,faqs,testimonials,client-testimonials,blog,settings}/`
- **Admin config:** `/public/admin/config.yml` — modify this to add/remove fields
- **Build script:** `scripts/generate-content.js` — reads markdown, generates `src/lib/content-generated.ts`
- **Generated file** is gitignored — regenerated on every build
- **CMS branch:** configured for `main` branch — change in `config.yml` if you use a different default branch

To add a new CMS collection:
1. Add a new entry to `collections` in `/public/admin/config.yml`
2. Create the folder in `/content/`
3. Add a loader in `/src/lib/`
4. Add it to `scripts/generate-content.js`
5. Rebuild
