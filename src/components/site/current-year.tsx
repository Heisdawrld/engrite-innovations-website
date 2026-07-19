"use client";

/**
 * Renders the current year. Client-side so the year stays current on a
 * statically-exported site (where Server Components are pre-rendered at
 * build time and `new Date().getFullYear()` would otherwise freeze at the
 * build year).
 */
export function CurrentYear() {
  return <>{new Date().getFullYear()}</>;
}
