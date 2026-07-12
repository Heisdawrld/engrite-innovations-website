import { NextRequest, NextResponse } from "next/server";

type NewsletterBody = {
  name?: string;
  email?: string;
  botField?: string;
};

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as NewsletterBody;

    if (body.botField) {
      return NextResponse.json({ ok: true });
    }

    const errors: string[] = [];
    if (!body.name?.trim()) errors.push("Name is required");
    if (!body.email?.trim()) errors.push("Email is required");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email))
      errors.push("Valid email is required");

    if (errors.length > 0) {
      return NextResponse.json(
        { ok: false, error: errors.join(". ") },
        { status: 400 },
      );
    }

    // Rate limit
    const ip = request.headers.get("x-forwarded-for") ?? "unknown";
    const key = `newsletter:${ip}`;
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

    console.log("[newsletter] New signup:", {
      name: body.name,
      email: body.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[newsletter] Error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 },
    );
  }
}

const rateLimitStore = new Map<string, number>();
