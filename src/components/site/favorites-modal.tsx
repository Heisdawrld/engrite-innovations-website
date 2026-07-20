"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, X } from "lucide-react";
import Image from "next/image";
import { PROPERTIES } from "@/lib/properties";
import { useFavorites } from "@/components/providers/favorites-provider";
import { useCurrency } from "@/components/providers/currency-provider";

export function FavoritesModal({
  open,
  onClose,
  onSelectProperty,
}: {
  open: boolean;
  onClose: () => void;
  onSelectProperty: (slug: string) => void;
}) {
  const { favorites, toggleFavorite } = useFavorites();
  const { format } = useCurrency();

  const savedProperties = PROPERTIES.filter((p) => favorites.includes(p.slug));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto p-0 sm:rounded-md">
        <DialogHeader className="border-b border-[rgba(16,35,87,0.1)] p-5">
          <DialogTitle className="flex items-center gap-2 font-serif text-2xl text-[#102357]">
            <Heart className="h-5 w-5 fill-[#2BA84A] text-[#2BA84A]" />
            Saved Properties
            <span className="text-sm text-[#6b7280]">({savedProperties.length})</span>
          </DialogTitle>
        </DialogHeader>

        {savedProperties.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 p-12 text-center">
            <Heart className="h-12 w-12 text-[#6b7280]/30" />
            <div>
              <h3 className="font-serif text-lg text-[#102357]">No saved properties yet</h3>
              <p className="mt-1.5 text-sm text-[#6b7280]">
                Tap the heart icon on any property to save it here for easy comparison.
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-[#2BA84A] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.2em] text-white"
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="space-y-3 p-5">
            {savedProperties.map((property) => (
              <div
                key={property.slug}
                className="flex items-center gap-4 border border-[rgba(16,35,87,0.1)] bg-[#f4f6fb] p-3"
              >
                <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden">
                  <Image
                    src={property.image}
                    alt={property.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="font-serif text-base text-[#102357]">{property.name}</div>
                  <div className="text-[11px] text-[#6b7280]">{property.location}</div>
                  <div className="mt-1 font-serif text-sm text-[#2BA84A]">
                    From {format(property.startingPrice)}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => {
                      onSelectProperty(property.slug);
                      onClose();
                    }}
                    className="bg-[#102357] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-white"
                  >
                    View
                  </button>
                  <button
                    onClick={() => toggleFavorite(property.slug)}
                    className="flex items-center justify-center border border-[rgba(16,35,87,0.15)] px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-[#6b7280]"
                    aria-label="Remove from favorites"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
