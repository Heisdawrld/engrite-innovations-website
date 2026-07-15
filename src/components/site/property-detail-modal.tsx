"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Calendar, TrendingUp, Phone, Mail, Eye } from "lucide-react";
import { getProperty } from "@/lib/properties";
import { useCurrency } from "@/components/providers/currency-provider";
import { useFavorites } from "@/components/providers/favorites-provider";
import { VirtualTour } from "./virtual-tour";

type PropertyDetailModalProps = {
  slug: string | null;
  onClose: () => void;
};

export function PropertyDetailModal({ slug, onClose }: PropertyDetailModalProps) {
  const property = slug ? getProperty(slug) : null;
  const { format } = useCurrency();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [activeImage, setActiveImage] = useState(0);

  // Reset gallery when switching properties
  useEffect(() => {
    setActiveImage(0);
  }, [slug]);

  if (!property) return null;

  const fav = isFavorite(property.slug);

  return (
    <Dialog open={!!slug} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-h-[92vh] w-[95vw] max-w-5xl overflow-y-auto p-0 sm:rounded-md">
        <DialogHeader className="sr-only">
          <DialogTitle>{property.name}</DialogTitle>
          <DialogDescription>{property.shortDesc}</DialogDescription>
        </DialogHeader>

        {/* Hero image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden sm:aspect-[2/1]">
          <Image
            src={property.gallery[activeImage]}
            alt={`${property.name} — view ${activeImage + 1}`}
            fill
            sizes="(min-width: 768px) 80vw, 95vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081534]/95 via-[#081534]/40 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <Badge className="mb-3 bg-white/95 text-[#102357] backdrop-blur">
              {property.statusLabel}
            </Badge>
            <h2 className="font-serif text-3xl font-normal text-white sm:text-4xl">
              {property.name}
            </h2>
            <p className="mt-1.5 text-sm font-light text-white/80">{property.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-white/70">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-[#7fd89a]" />
                {property.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#7fd89a]" />
                {property.completionDate}
              </span>
              <span className="flex items-center gap-1.5">
                <TrendingUp className="h-3.5 w-3.5 text-[#7fd89a]" />
                {property.annualReturn}% annual return
              </span>
            </div>
          </div>
          <button
            onClick={() => toggleFavorite(property.slug)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 backdrop-blur transition-all hover:scale-110"
            aria-label={fav ? "Remove from favorites" : "Save to favorites"}
            aria-pressed={fav}
          >
            <Heart
              className={`h-5 w-5 transition-colors ${
                fav ? "fill-[#2BA84A] text-[#2BA84A]" : "text-[#102357]"
              }`}
            />
          </button>
        </div>

        {/* Gallery thumbnails */}
        <div className="flex gap-2 overflow-x-auto border-b border-[rgba(16,35,87,0.1)] p-4">
          {property.gallery.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded border-2 transition-all ${
                i === activeImage ? "border-[#2BA84A]" : "border-transparent opacity-60 hover:opacity-100"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="p-4 sm:p-6">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-5 flex h-auto w-full flex-wrap gap-1 bg-[#f4f6fb] p-1">
              <TabsTrigger value="overview" className="flex-1 text-xs">Overview</TabsTrigger>
              <TabsTrigger value="tour" className="flex-1 text-xs">
                <Eye className="mr-1.5 h-3.5 w-3.5" />
                Virtual Tour
              </TabsTrigger>
              <TabsTrigger value="units" className="flex-1 text-xs">Units & Pricing</TabsTrigger>
              <TabsTrigger value="payment" className="flex-1 text-xs">Payment Plan</TabsTrigger>
              <TabsTrigger value="location" className="flex-1 text-xs">Location</TabsTrigger>
            </TabsList>

            {/* Overview */}
            <TabsContent value="overview" className="space-y-6">
              <p className="text-[15px] font-light leading-[1.9] text-[#1a1f2e]">
                {property.description}
              </p>

              <div>
                <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#102357]">
                  Key Features
                </h4>
                <div className="flex flex-wrap gap-2">
                  {property.features.map((f) => (
                    <span
                      key={f}
                      className="border border-[rgba(43,168,74,0.3)] bg-[rgba(43,168,74,0.06)] px-3 py-1.5 text-[11px] uppercase tracking-wider text-[#2BA84A]"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-[#102357]">
                  Amenities
                </h4>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {property.amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-[#1a1f2e]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#2BA84A]" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Virtual Tour */}
            <TabsContent value="tour">
              <div className="space-y-3">
                <div>
                  <h3 className="font-serif text-xl text-[#102357]">360° Virtual Tour</h3>
                  <p className="mt-1 text-sm text-[#6b7280]">
                    Walk through {property.name} from your device. Drag to look around, click hotspots to navigate between rooms.
                  </p>
                </div>
                <VirtualTour scenes={property.tourScenes} matterportUrl={property.matterportUrl} embedded />
              </div>
            </TabsContent>

            {/* Units & Pricing */}
            <TabsContent value="units">
              <div className="space-y-3">
                <h3 className="font-serif text-xl text-[#102357]">Available Units</h3>
                <div className="overflow-x-auto rounded-md border border-[rgba(16,35,87,0.1)]">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="bg-[#102357] text-white">
                      <tr>
                        <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider">Unit Type</th>
                        <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider">Size</th>
                        <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider">Price</th>
                        <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider">Rental Yield</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(16,35,87,0.08)]">
                      {property.units.map((unit) => (
                        <tr key={unit.name} className="hover:bg-[#f4f6fb]">
                          <td className="px-4 py-3">
                            <div className="font-medium text-[#102357]">{unit.name}</div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {unit.features.map((f) => (
                                <span key={f} className="text-[9px] uppercase tracking-wider text-[#6b7280]">
                                  · {f}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-[#6b7280]">{unit.size}</td>
                          <td className="px-4 py-3 font-serif text-base text-[#102357]">
                            {format(unit.price)}
                          </td>
                          <td className="px-4 py-3 text-[#2BA84A]">{unit.rentalYield}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Payment Plan */}
            <TabsContent value="payment">
              <div className="space-y-4">
                <h3 className="font-serif text-xl text-[#102357]">Milestone Payment Schedule</h3>
                <p className="text-sm text-[#6b7280]">
                  Pay as construction progresses. No upfront full payment required.
                </p>
                <div className="space-y-2">
                  {property.paymentSchedule.map((tier, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 rounded-md border border-[rgba(16,35,87,0.1)] bg-[#f4f6fb] p-4"
                    >
                      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#102357] font-serif text-lg text-[#7fd89a]">
                        {tier.percentage}%
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-[#102357]">{tier.milestone}</div>
                        <div className="text-sm text-[#6b7280]">{tier.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Location */}
            <TabsContent value="location">
              <div className="space-y-3">
                <h3 className="font-serif text-xl text-[#102357]">Location</h3>
                <p className="text-sm text-[#6b7280]">{property.location}</p>
                <div className="overflow-hidden rounded-md border border-[rgba(16,35,87,0.1)]">
                  <iframe
                    title={`Map of ${property.name}`}
                    src={property.mapEmbed}
                    className="h-[360px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* CTAs */}
          <div className="mt-6 flex flex-col gap-3 border-t border-[rgba(16,35,87,0.1)] pt-6 sm:flex-row">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onClose();
                requestAnimationFrame(() => {
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                });
              }}
              className="flex-1 bg-[#2BA84A] px-6 py-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-all hover:bg-[#239540]"
            >
              Enquire About {property.name}
            </a>
            <a
              href={`https://wa.me/2348130665862?text=${encodeURIComponent(`Hi Engrite, I'm interested in ${property.name}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border-2 border-[#102357] px-6 py-4 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#102357] transition-all hover:bg-[#102357] hover:text-white"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
