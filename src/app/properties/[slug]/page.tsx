import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, MapPin } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { PropertyVirtualTourSection } from "@/components/site/property-virtual-tour-section";
import { PROPERTIES, getProperty } from "@/lib/properties";

export const dynamicParams = false;

export function generateStaticParams() {
  return PROPERTIES.map((property) => ({ slug: property.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) return {};

  return {
    title: `${property.name} — ${property.location}`,
    description: property.shortDesc,
    alternates: {
      canonical: `https://engriteinnovations.com/properties/${property.slug}`,
    },
    openGraph: {
      title: `${property.name} | Engrite Innovations`,
      description: property.shortDesc,
      url: `https://engriteinnovations.com/properties/${property.slug}`,
      images: [{ url: property.image, alt: `${property.name} in ${property.location}` }],
    },
  };
}

function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = getProperty(slug);
  if (!property) notFound();

  const whatsAppMessage = encodeURIComponent(
    `Hi Engrite, I would like the current offer document for ${property.name}.`,
  );

  return (
    <>
      <Navbar />
      <main className="bg-[#f7f7f2]">
        <section className="relative isolate flex min-h-[780px] items-end overflow-hidden bg-[#071128] pb-16 pt-32 text-white sm:pb-20 lg:min-h-[880px]">
          <Image
            src={property.image}
            alt={`${property.name} — ${property.tagline}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071128] via-[#071128]/45 to-[#071128]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071128]/95 via-[#071128]/40 to-transparent" />
          <div className="architectural-grid absolute inset-0 opacity-35" />
          <div className="film-grain absolute inset-0 opacity-30" />

          <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 sm:px-6 lg:px-10">
            <Link
              href="/#projects"
              className="mb-12 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/70 transition-colors hover:text-[#9be15d]"
            >
              <ArrowLeft className="h-4 w-4" />
              All developments
            </Link>
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_360px]">
              <div>
                <div className="eyebrow text-[#9be15d]">{property.statusLabel}</div>
                <h1 className="mt-5 max-w-[950px] font-serif text-[clamp(58px,9vw,132px)] font-normal leading-[0.82] tracking-[-0.055em]">
                  {property.name}
                </h1>
                <p className="mt-7 max-w-[640px] text-base font-light leading-[1.8] text-white/75">
                  {property.tagline}
                </p>
              </div>
              <div className="glass-panel p-6">
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <MapPin className="h-4 w-4 text-[#9be15d]" />
                  {property.location}
                </div>
                <div className="mt-6 border-t border-white/15 pt-5">
                  <div className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                    Current entry point
                  </div>
                  <div className="mt-2 font-serif text-4xl text-[#9be15d]">
                    {formatNaira(property.startingPrice)}
                  </div>
                </div>
                <a
                  href={`https://wa.me/2348130665862?text=${whatsAppMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex min-h-13 items-center justify-between bg-[#9be15d] px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#071128] transition-colors hover:bg-white"
                >
                  Request offer document
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <Link
                  href="#virtual-tour"
                  className="mt-3 flex min-h-13 items-center justify-between border border-white/20 px-5 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#9be15d] hover:text-[#9be15d]"
                >
                  360° virtual tour
                  <span className="text-[8px] text-[#9be15d]">
                    {property.matterportUrl ? "Open now" : "Coming soon"}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="architectural-grid-dark py-20 sm:py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1500px] gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_440px] lg:px-10">
            <div>
              <div className="eyebrow text-[#1f7f39]">The residence</div>
              <h2 className="mt-5 max-w-[760px] font-serif text-[clamp(40px,5vw,72px)] leading-[0.98] tracking-[-0.035em] text-[#102357]">
                Designed for the life you are building.
              </h2>
              <p className="mt-7 max-w-[760px] text-[15px] font-light leading-[1.95] text-[#596174]">
                {property.description}
              </p>

              <div className="mt-10 grid gap-px bg-[#102357]/10 sm:grid-cols-2">
                {property.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex min-h-16 items-center gap-3 bg-[#f7f7f2] px-5 text-sm text-[#102357]"
                  >
                    <Check className="h-4 w-4 text-[#1f7f39]" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <aside className="bg-[#102357] p-6 text-white sm:p-8">
              <div className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9be15d]">
                Development brief
              </div>
              <dl className="mt-7 divide-y divide-white/10">
                <div className="py-4">
                  <dt className="text-[9px] uppercase tracking-[0.18em] text-white/40">Location</dt>
                  <dd className="mt-1.5 text-sm">{property.location}</dd>
                </div>
                <div className="py-4">
                  <dt className="text-[9px] uppercase tracking-[0.18em] text-white/40">Delivery</dt>
                  <dd className="mt-1.5 text-sm">{property.completionDate}</dd>
                </div>
                <div className="py-4">
                  <dt className="text-[9px] uppercase tracking-[0.18em] text-white/40">Unit types</dt>
                  <dd className="mt-1.5 text-sm">{property.units.map((unit) => unit.size).join(" · ")}</dd>
                </div>
                <div className="py-4">
                  <dt className="text-[9px] uppercase tracking-[0.18em] text-white/40">Investment model</dt>
                  <dd className="mt-1.5 text-sm">Live or Earn options available</dd>
                </div>
              </dl>
              <p className="mt-6 text-[10px] leading-relaxed text-white/45">
                Availability, yields, delivery dates and transaction terms are
                subject to the current offer documents and executed agreements.
              </p>
            </aside>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
            <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <div className="eyebrow text-[#1f7f39]">Inside the development</div>
                <h2 className="mt-5 font-serif text-[clamp(38px,5vw,68px)] tracking-[-0.035em] text-[#102357]">
                  The visual story
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-[#596174]">
                Final company photography will be placed here without changing
                the editorial layout.
              </p>
            </div>
            <div className="grid auto-rows-[260px] gap-4 md:grid-cols-2 lg:auto-rows-[340px]">
              {property.gallery.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className={`relative overflow-hidden bg-[#102357] ${index === 0 ? "md:row-span-2" : ""}`}
                >
                  <Image
                    src={image}
                    alt={`${property.name} gallery view ${index + 1}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-1000 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <PropertyVirtualTourSection slug={property.slug} />

        <section className="bg-[#071128] py-20 text-white sm:py-24 lg:py-28">
          <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-10">
            <div className="grid gap-12 lg:grid-cols-[360px_1fr]">
              <div>
                <div className="eyebrow text-[#9be15d]">Units & pricing</div>
                <h2 className="mt-5 font-serif text-5xl tracking-[-0.035em]">
                  Find your fit.
                </h2>
                <p className="mt-5 text-sm font-light leading-[1.8] text-white/60">
                  Request the latest availability sheet before reserving a unit.
                </p>
              </div>
              <div className="divide-y divide-white/10 border-y border-white/10">
                {property.units.map((unit) => (
                  <div
                    key={unit.name}
                    className="grid gap-4 py-6 sm:grid-cols-[1fr_130px_190px] sm:items-center"
                  >
                    <div>
                      <div className="font-serif text-xl">{unit.name}</div>
                      <div className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/40">
                        {unit.features.join(" · ")}
                      </div>
                    </div>
                    <div className="text-sm text-white/60">{unit.size}</div>
                    <div className="font-serif text-2xl text-[#9be15d]">
                      {formatNaira(unit.price)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[#9be15d] py-20 text-[#071128] sm:py-24">
          <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-10 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-10">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[0.22em]">Private consultation</div>
              <h2 className="mt-4 max-w-3xl font-serif text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.04em]">
                See whether {property.name} fits your next move.
              </h2>
            </div>
            <a
              href={`https://wa.me/2348130665862?text=${whatsAppMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 flex-shrink-0 items-center gap-4 bg-[#071128] px-7 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#102357]"
            >
              Speak with Engrite
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
