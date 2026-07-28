"use client";

import { useLanguage } from "@/components/providers/language-provider";
import { Language, LANGUAGES } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 border-[rgba(16,35,87,0.15)] bg-white px-2.5 text-[11px] font-semibold tracking-wider text-[#102357] hover:border-[#1F7A3A] hover:text-[#1F7A3A]"
          aria-label={`Language: ${current.label}`}
        >
          <Globe className="h-3.5 w-3.5" />
          {current.native}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[140px]">
        {LANGUAGES.map((l) => (
          <DropdownMenuItem
            key={l.code}
            onClick={() => setLang(l.code as Language)}
            className={`cursor-pointer text-xs ${
              l.code === lang ? "font-bold text-[#1F7A3A]" : ""
            }`}
          >
            <span className="mr-2">{l.native}</span>
            <span className="text-[#6b7280]">({l.label})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
