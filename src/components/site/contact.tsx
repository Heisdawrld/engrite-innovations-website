"use client";

import { useState } from "react";
import { ScrollReveal } from "./scroll-reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/components/providers/language-provider";
import { Phone, Mail, MapPin } from "lucide-react";
import { BookingWidget } from "./booking-widget";

export function Contact() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    interest: "",
    message: "",
  });

  const setField = (field: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, botField: (e.target as HTMLFormElement).botField?.value }),
      });
      if (res.ok) {
        toast({
          title: "Message received",
          description:
            "Thank you for reaching out. The Engrite team will be in touch within 24 hours.",
        });
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          interest: "",
          message: "",
        });
      } else {
        const data = await res.json().catch(() => ({}));
        toast({
          variant: "destructive",
          title: "Something went wrong",
          description:
            data.error ??
            "We couldn't send your message. Please email engriteinnovations@gmail.com or call +234 813 066 5862.",
        });
      }
    } catch {
      toast({
        variant: "destructive",
        title: "Network error",
        description: "Please check your connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-[100px] py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
          <ScrollReveal>
            <div className="flex items-center gap-3.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#2BA84A]">
              <span className="block h-[2px] w-9 bg-[#2BA84A]" aria-hidden="true" />
              {t("contact.label")}
            </div>
            <h2 className="mt-4 font-serif text-[clamp(36px,4.4vw,60px)] font-normal leading-[1.12] text-[#102357]">
              {t("contact.title1")}
              <br />
              <em className="italic text-[#2BA84A]">{t("contact.title2")}</em>
              <br />
              {t("contact.title3")}
            </h2>

            <div className="mt-9 flex flex-col gap-7">
              <div>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#2BA84A]">
                  <MapPin className="h-3 w-3" />
                  {t("contact.address")}
                </div>
                <div className="mt-1.5 text-[15px] font-light text-[#1a1f2e]">
                  27, Montgomery Street, Yaba, Lagos, Nigeria
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#2BA84A]">
                  <Mail className="h-3 w-3" />
                  {t("contact.email")}
                </div>
                <a
                  href="mailto:engriteinnovations@gmail.com"
                  className="mt-1.5 block text-[15px] font-light text-[#1a1f2e] hover:text-[#2BA84A]"
                >
                  engriteinnovations@gmail.com
                </a>
              </div>
              <div>
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.24em] text-[#2BA84A]">
                  <Phone className="h-3 w-3" />
                  {t("contact.phone")}
                </div>
                <a
                  href="tel:+2348130665862"
                  className="mt-1.5 block text-[15px] font-light text-[#1a1f2e] hover:text-[#2BA84A]"
                >
                  +234 813 066 5862
                </a>
                <a
                  href="tel:+2349061753571"
                  className="mt-1 block text-[13px] font-light text-[#6b7280] hover:text-[#2BA84A]"
                >
                  +234 906 175 3571 (Alt)
                </a>
              </div>
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#2BA84A]">
                  {t("contact.follow")}
                </div>
                <div className="mt-2 flex flex-wrap gap-5 text-[15px] font-light text-[#1a1f2e]">
                  <a href="https://instagram.com/engriteinnovations_" target="_blank" rel="noopener noreferrer" className="hover:text-[#2BA84A]">Instagram</a>
                  <a href="https://ng.linkedin.com/company/engrite-innovations" target="_blank" rel="noopener noreferrer" className="hover:text-[#2BA84A]">LinkedIn</a>
                  <a href="https://www.facebook.com/EduserveNG" target="_blank" rel="noopener noreferrer" className="hover:text-[#2BA84A]">Facebook</a>
                  <a href="https://www.tiktok.com/@engriteinnovation" target="_blank" rel="noopener noreferrer" className="hover:text-[#2BA84A]">TikTok</a>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-[rgba(16,35,87,0.1)] pt-8">
              <BookingWidget />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3"
              aria-label="Contact form"
            >
              {/* Honeypot — hidden from humans, bots will fill it */}
              <input type="text" name="botField" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="first-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
                    {t("form.first")} *
                  </Label>
                  <Input
                    id="first-name"
                    type="text"
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => setField("firstName", e.target.value)}
                    className="bg-[#f4f6fb] border-[rgba(16,35,87,0.1)] focus:border-[#2BA84A] focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="last-name" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
                    {t("form.last")} *
                  </Label>
                  <Input
                    id="last-name"
                    type="text"
                    required
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => setField("lastName", e.target.value)}
                    className="bg-[#f4f6fb] border-[rgba(16,35,87,0.1)] focus:border-[#2BA84A] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
                  {t("form.email")} *
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                  className="bg-[#f4f6fb] border-[rgba(16,35,87,0.1)] focus:border-[#2BA84A] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
                  {t("form.phone")}
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(e) => setField("phone", e.target.value)}
                  className="bg-[#f4f6fb] border-[rgba(16,35,87,0.1)] focus:border-[#2BA84A] focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="interest" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
                  {t("form.interest")}
                </Label>
                <Select value={form.interest} onValueChange={(v) => setField("interest", v)}>
                  <SelectTrigger id="interest" className="bg-[#f4f6fb] border-[rgba(16,35,87,0.1)] focus:border-[#2BA84A]">
                    <SelectValue placeholder={t("form.interest")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buying">Buying a Property</SelectItem>
                    <SelectItem value="investment">Investment / Live or Earn</SelectItem>
                    <SelectItem value="sinai-spaces">Sinai Spaces</SelectItem>
                    <SelectItem value="sinai-residence">Sinai Residence</SelectItem>
                    <SelectItem value="crest-residence">Crest Residence</SelectItem>
                    <SelectItem value="realtor">Realtor Partnership</SelectItem>
                    <SelectItem value="diaspora">Diaspora Investment</SelectItem>
                    <SelectItem value="general">General Enquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#102357]">
                  {t("form.message")}
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setField("message", e.target.value)}
                  className="resize-none bg-[#f4f6fb] border-[rgba(16,35,87,0.1)] focus:border-[#2BA84A] focus:bg-white"
                />
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-2 self-start bg-[#2BA84A] text-[11px] font-bold uppercase tracking-[0.2em] text-white hover:bg-[#239540] disabled:opacity-50"
              >
                {loading ? "Sending…" : t("form.submit")}
              </Button>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
