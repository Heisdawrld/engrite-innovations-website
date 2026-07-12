import { NextRequest, NextResponse } from "next/server";

type ContactBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  interest?: string;
  message?: string;
  botField?: string; // honeypot
};

const VALID_INTERESTS = [
  "buying",
  "investment",
  "sinai-spaces",
  "sinai-residence",
  "crest-residence",
  "realtor",
  "diaspora",
  "general",
];

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactBody;

    // Honeypot — silently succeed if filled
    if (body.botField) {
      return NextResponse.json({ ok: true });
    }

    // Validation
    const errors: string[] = [];
    if (!body.firstName?.trim()) errors.push("First name is required");
    if (!body.lastName?.trim()) errors.push("Last name is required");
    if (!body.email?.trim()) errors.push("Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      errors.push("Valid email is required");
    if (body.interest && !VALID_INTERESTS.includes(body.interest))
      errors.push("Invalid interest selection");
    if (body.message && body.message.length > 5000)
      errors.push("Message too long");

    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: errors.join(". ") },
        { status: 400 },
      );
    }

    // Rate limit by IP (basic in-memory)
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const key = `contact:${ip}`;
    if (rateLimitStore.has(key)) {
      const last = rateLimitStore.get(key)!;
      if (Date.now() - last < 60_000) {
        return NextResponse.json(
          { ok: false, error: "Too many requests. Please wait a minute." },
          { status: 429 },
        );
      }
    }
    rateLimitStore.set(key, Date.now());

    // In production: store in DB, send email, push to CRM
    // For now: log and succeed
    console.log("[contact] New submission:", {
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      phone: body.phone,
      interest: body.interest,
      messageLength: body.message?.length ?? 0,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}

// Simple in-memory rate limiting (per-instance)
const rateLimitStore = new Map<string, number>();
