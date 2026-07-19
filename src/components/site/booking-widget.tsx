"use client";

import { useState, useEffect, useRef } from "react";
import { CalendarDays, Clock, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

const TIME_SLOTS = [
  "9:00 AM",
  "10:30 AM",
  "12:00 PM",
  "1:30 PM",
  "3:00 PM",
  "4:30 PM",
];

export function BookingWidget() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [mode, setMode] = useState<"in-person" | "virtual">("in-person");
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState<Date[]>([]);
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const formRef = useRef<HTMLFormElement>(null);

  // Generate dates client-side only to avoid hydration mismatch — dates are
  // time-relative and must be computed after mount.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    setDays(
      Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i + 1);
        d.setHours(0, 0, 0, 0);
        return d;
      })
    );
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedSlot) {
      toast({
        variant: "destructive",
        title: "Incomplete booking",
        description: "Please select a date and time slot.",
      });
      return;
    }
    if (!contact.name || !contact.email) {
      toast({
        variant: "destructive",
        title: "Contact info required",
        description: "Please provide your name and email so we can confirm.",
      });
      return;
    }
    setLoading(true);
    // Submit to Netlify Forms via native POST (same pattern as contact form)
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group flex w-full items-center gap-3 text-left">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#2BA84A]/10 text-[#2BA84A]">
            <CalendarDays className="h-5 w-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#102357]">
              Book a Site Visit
            </div>
            <div className="mt-0.5 text-xs text-[#6b7280]">
              Schedule a 90-minute guided tour or virtual walkthrough
            </div>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl text-[#102357]">
            Book a Site Visit
          </DialogTitle>
          <DialogDescription>
            Choose a date and time that works for you. We&apos;ll confirm within 2 hours via email or WhatsApp.
          </DialogDescription>
        </DialogHeader>

        {/* Hidden Netlify form (submitted natively) */}
        <form
          ref={formRef}
          name="booking"
          method="POST"
          data-netlify="true"
          netlify-honeypot="botField"
          action="/thank-you"
          className="hidden"
          aria-hidden="true"
        >
          <input type="hidden" name="form-name" value="booking" />
          <input type="text" name="botField" style={{ display: "none" }} tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <input type="hidden" name="name" value={contact.name} />
          <input type="hidden" name="email" value={contact.email} />
          <input type="hidden" name="phone" value={contact.phone} />
          <input type="hidden" name="mode" value={mode} />
          <input type="hidden" name="date" value={formattedDate} />
          <input type="hidden" name="slot" value={selectedSlot} />
        </form>

        {/* Visible form */}
        <form onSubmit={handleConfirm} className="mt-4 space-y-5">
          {/* Contact info */}
          <div className="space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
              Your Contact Info
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label htmlFor="bk-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
                  Full Name *
                </Label>
                <Input
                  id="bk-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={contact.name}
                  onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  className="h-12 bg-[#f4f6fb] border-[rgba(16,35,87,0.1)] focus:border-[#2BA84A] focus:bg-white"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="bk-email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
                  Email *
                </Label>
                <Input
                  id="bk-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  className="h-12 bg-[#f4f6fb] border-[rgba(16,35,87,0.1)] focus:border-[#2BA84A] focus:bg-white"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bk-phone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
                Phone (for WhatsApp confirmation)
              </Label>
              <Input
                id="bk-phone"
                type="tel"
                autoComplete="tel"
                value={contact.phone}
                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                className="h-12 bg-[#f4f6fb] border-[rgba(16,35,87,0.1)] focus:border-[#2BA84A] focus:bg-white"
              />
            </div>
          </div>

          {/* Mode toggle */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setMode("in-person")}
              aria-pressed={mode === "in-person"}
              className={`flex items-center gap-2 border-2 p-3 text-left text-xs transition-all ${
                mode === "in-person"
                  ? "border-[#2BA84A] bg-[#2BA84A]/5 text-[#102357]"
                  : "border-[rgba(16,35,87,0.1)] text-[#6b7280]"
              }`}
            >
              <MapPin className="h-4 w-4" />
              <div>
                <div className="font-bold uppercase tracking-wider">In Person</div>
                <div className="text-[10px]">Yaba, Lagos</div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setMode("virtual")}
              aria-pressed={mode === "virtual"}
              className={`flex items-center gap-2 border-2 p-3 text-left text-xs transition-all ${
                mode === "virtual"
                  ? "border-[#2BA84A] bg-[#2BA84A]/5 text-[#102357]"
                  : "border-[rgba(16,35,87,0.1)] text-[#6b7280]"
              }`}
            >
              <Clock className="h-4 w-4" />
              <div>
                <div className="font-bold uppercase tracking-wider">Virtual</div>
                <div className="text-[10px]">Video call · anywhere</div>
              </div>
            </button>
          </div>

          {/* Date picker */}
          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
              Select a Date
            </div>
            <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
              {days.map((d, i) => {
                const isSelected =
                  selectedDate && d.toDateString() === selectedDate.toDateString();
                const dayLabel = d.toLocaleDateString("en-US", { weekday: "short" });
                const dateLabel = d.getDate();
                return (
                  <button
                    key={`${i}-${dateLabel}`}
                    type="button"
                    onClick={() => setSelectedDate(d)}
                    className={`flex flex-col items-center border-2 py-2 text-xs transition-all ${
                      isSelected
                        ? "border-[#2BA84A] bg-[#2BA84A] text-white"
                        : "border-[rgba(16,35,87,0.1)] hover:border-[#2BA84A]/40"
                    }`}
                  >
                    <span className="text-[9px] uppercase">{dayLabel}</span>
                    <span className="font-serif text-base">{dateLabel}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Time slots */}
          <div>
            <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
              Select a Time Slot
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`border-2 py-2.5 text-xs transition-all ${
                    selectedSlot === slot
                      ? "border-[#2BA84A] bg-[#2BA84A] text-white"
                      : "border-[rgba(16,35,87,0.1)] hover:border-[#2BA84A]/40"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col gap-3 border-t border-[rgba(16,35,87,0.1)] pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-[#6b7280]">
              90-minute session · Free · Confirmation within 2 hours
            </p>
            <Button
              type="submit"
              disabled={loading || !selectedDate || !selectedSlot || !contact.name || !contact.email}
              className="h-12 w-full bg-[#2BA84A] text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-[#239540] disabled:opacity-50 sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                "Request Booking"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
