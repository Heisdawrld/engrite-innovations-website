/**
 * Netlify Build Script
 *
 * Problem: next.config.ts has `output: "standalone"` which is needed for
 * Docker/VPS (Caddyfile) deployment, but breaks Netlify which uses its own
 * serverless runtime via @netlify/plugin-nextjs.
 *
 * This script:
 * 1. Temporarily removes `output: "standalone"` from next.config.ts
 * 2. Runs `next build`
 * 3. Restores the original next.config.ts
 *
 * This way the repo keeps working for both VPS and Netlify deployments.
 */

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const PROJECT_ROOT = path.join(__dirname, "..");
const CONFIG_PATH = path.join(PROJECT_ROOT, "next.config.ts");

function main() {
  console.log("🏗️  Starting Netlify build...");

  // Read original config
  let originalConfig = fs.readFileSync(CONFIG_PATH, "utf-8");

  // Comment out output: "standalone" for Netlify
  const netlifyConfig = originalConfig.replace(
    /output:\s*["']standalone["']/,
    '// output: "standalone" — disabled for Netlify (uses @netlify/plugin-nextjs runtime)'
  );

  // Write modified config
  fs.writeFileSync(CONFIG_PATH, netlifyConfig, "utf-8");
  console.log("✅ Temporarily disabled output: standalone for Netlify build");

  try {
    // Run the Next.js build from the project root
    console.log("🔨 Running next build...");
    execSync("npx next build", {
      stdio: "inherit",
      cwd: PROJECT_ROOT,
      env: { ...process.env },
    });
    console.log("✅ Next.js build completed successfully!");
  } catch (error) {
    console.error("❌ Build failed!");
    throw error;
  } finally {
    // Always restore original config, even on failure
    fs.writeFileSync(CONFIG_PATH, originalConfig, "utf-8");
    console.log("🔄 Restored original next.config.ts");
  }
}

main();
