import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  rules: {
    // TypeScript rules — keep migration-friendly, but flag obvious dead code.
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/prefer-as-const": "off",
    "@typescript-eslint/no-unused-disable-directive": "off",

    // React rules — exhaustive-deps is the single most valuable hook-safety rule.
    "react-hooks/exhaustive-deps": "warn",
    "react-hooks/purity": "off",
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "react/prop-types": "off",
    "react-compiler/react-compiler": "off",

    // Next.js rules — flag <img> usage so we keep using next/image.
    "@next/next/no-img-element": "warn",
    "@next/next/no-html-link-for-pages": "off",

    // General JavaScript rules — catch real bugs.
    // Note: `no-undef` is intentionally off because it doesn't understand
    // TypeScript types (e.g. `React.ReactNode`) and would false-positive on
    // every file using the global React namespace. TypeScript's own type
    // checker already catches undefined variables.
    "prefer-const": "warn",
    "no-unused-vars": "off",
    "no-console": "off",
    "no-debugger": "error",
    "no-empty": "off",
    "no-irregular-whitespace": "error",
    "no-case-declarations": "off",
    "no-fallthrough": "error",
    "no-mixed-spaces-and-tabs": "error",
    "no-redeclare": "error",
    "no-undef": "off",
    "no-unreachable": "error",
    "no-useless-escape": "warn",
  },
}, {
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts", "examples/**", "skills", "scripts/**", "download/**", "mini-services/**", ".zscripts/**", "tailwind.config.ts"]
}];

export default eslintConfig;
