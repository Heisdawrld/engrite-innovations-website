"use client";

import { useState } from "react";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const NEXT_14_DAYS = Array.from({ length: 14 }, (_, i) => {
  const d = new Date();
  d.setDate(d.getDate() + i + 1);
  return d;
});

export function BookingWidget() {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [mode, setMode] = useState<"in-person" | "virtual">("in-person");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!selectedDate || !selectedSlot) {
      toast({
        variant: "destructive",
        title: "Incomplete booking",
        description: "Please select a date and time slot.",
      });
      return;
    }
    setLoading(true);

    try {
      // Simulated booking — in production this would integrate with Calendly/Google Calendar API
      await new Promise((r) => setTimeout(r, 800));

      toast({
        title: "Booking confirmed!",
        description: `We've reserved ${selectedSlot} on ${selectedDate.toLocaleDateString("en-NG", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })} for your ${mode === "in-person" ? "site visit" : "virtual tour"}. A confirmation will be sent to your email.`,
      });
      setOpen(false);
      setSelectedDate(null);
      setSelectedSlot("");
    } catch {
      toast({
        variant: "destructive",
        title: "Booking failed",
        description: "Please try again or WhatsApp us at +234 813 066 5862.",
      });
    } finally {
      setLoading(false);
    }
  };

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
            Choose a date and time that works for you. We&apos;ll confirm within 2 hours.
          </DialogDescription>
        </DialogHeader>

        {/* Mode toggle */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => setMode("in-person")}
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
            onClick={() => setMode("virtual")}
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
        <div className="mt-5">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
            Select a Date
          </div>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
            {NEXT_14_DAYS.map((d) => {
              const isSelected =
                selectedDate &&
                d.toDateString() === selectedDate.toDateString();
              const dayLabel = d.toLocaleDateString("en-NG", { weekday: "short" });
              const dateLabel = d.getDate();
              return (
                <button
                  key={d.toISOString()}
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
        <div className="mt-5">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
            Select a Time Slot
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {TIME_SLOTS.map((slot) => (
              <button
                key={slot}
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

        <div className="mt-6 flex items-center justify-between border-t border-[rgba(16,35,87,0.1)] pt-4">
          <p className="text-[11px] text-[#6b7280]">
            90-minute session · Free · Confirmation within 2 hours
          </p>
          <Button
            onClick={handleConfirm}
            disabled={loading || !selectedDate || !selectedSlot}
            className="bg-[#2BA84A] text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-[#239540] disabled:opacity-50"
          >
            {loading ? "Confirming…" : "Confirm Booking"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
