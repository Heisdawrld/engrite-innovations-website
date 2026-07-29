"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Check,
  Compass,
  Gem,
  Home,
  Landmark,
  Laptop2,
  RotateCcw,
  Sparkles,
  TrendingUp,
  WalletCards,
  Zap,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PROPERTIES } from "@/lib/properties";
import { SETTINGS } from "@/lib/settings";
import { useCurrency } from "@/components/providers/currency-provider";

type Goal = "live" | "earn" | "balanced";
type Budget = "entry" | "mid" | "premium";
type Priority = "accessible" | "amenities" | "workspace";

const GOALS: Array<{
  id: Goal;
  label: string;
  description: string;
  icon: typeof Home;
}> = [
  {
    id: "live",
    label: "A home to live in",
    description: "Comfort, location and everyday quality come first.",
    icon: Home,
  },
  {
    id: "earn",
    label: "An income property",
    description: "I want an address with rental or shortlet potential.",
    icon: TrendingUp,
  },
  {
    id: "balanced",
    label: "Live now, earn later",
    description: "I want flexibility as my plans change.",
    icon: Compass,
  },
];

const BUDGETS: Array<{
  id: Budget;
  label: string;
  description: string;
  icon: typeof WalletCards;
}> = [
  {
    id: "entry",
    label: "Up to ₦30M",
    description: "An accessible first step into Lagos property.",
    icon: WalletCards,
  },
  {
    id: "mid",
    label: "₦30M – ₦80M",
    description: "More space, amenities or an off-plan opportunity.",
    icon: Landmark,
  },
  {
    id: "premium",
    label: "₦80M+",
    description: "Premium layouts and long-term lifestyle value.",
    icon: Gem,
  },
];

const PRIORITIES: Array<{
  id: Priority;
  label: string;
  description: string;
  icon: typeof Zap;
}> = [
  {
    id: "accessible",
    label: "Accessible entry",
    description: "Keep the commitment practical and straightforward.",
    icon: Zap,
  },
  {
    id: "amenities",
    label: "Lifestyle amenities",
    description: "Pool, gym, lounge and elevated shared spaces.",
    icon: Sparkles,
  },
  {
    id: "workspace",
    label: "Smart work-life design",
    description: "A home office and intelligent everyday features.",
    icon: Laptop2,
  },
];

function getRecommendation(goal: Goal, budget: Budget, priority: Priority) {
  const scores: Record<string, number> = {
    "sinai-spaces": 0,
    "crest-residence": 0,
    "sinai-residence": 0,
  };

  if (goal === "live") {
    scores["sinai-residence"] += 4;
    scores["crest-residence"] += 3;
  } else if (goal === "earn") {
    scores["sinai-spaces"] += 5;
    scores["crest-residence"] += 2;
  } else {
    scores["sinai-spaces"] += 3;
    scores["crest-residence"] += 3;
    scores["sinai-residence"] += 2;
  }

  if (budget === "entry") {
    scores["sinai-spaces"] += 7;
  } else if (budget === "mid") {
    scores["crest-residence"] += 6;
    scores["sinai-spaces"] += 2;
  } else {
    scores["sinai-residence"] += 7;
    scores["crest-residence"] += 3;
  }

  if (priority === "accessible") scores["sinai-spaces"] += 5;
  if (priority === "amenities") scores["crest-residence"] += 5;
  if (priority === "workspace") scores["sinai-residence"] += 5;

  const slug = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
  return PROPERTIES.find((property) => property.slug === slug) ?? PROPERTIES[0];
}

export function PropertyMatchmaker() {
  const { format } = useCurrency();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState<Goal | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);
  const [priority, setPriority] = useState<Priority | null>(null);

  const recommendation = useMemo(() => {
    if (!goal || !budget || !priority) return null;
    return getRecommendation(goal, budget, priority);
  }, [budget, goal, priority]);

  const reset = () => {
    setStep(0);
    setGoal(null);
    setBudget(null);
    setPriority(null);
  };

  const chooseGoal = (value: Goal) => {
    setGoal(value);
    setStep(1);
  };

  const chooseBudget = (value: Budget) => {
    setBudget(value);
    setStep(2);
  };

  const choosePriority = (value: Priority) => {
    setPriority(value);
    setStep(3);
  };

  const recommendationReason =
    priority === "amenities"
      ? "Its amenity-led design best matches the lifestyle experience you selected."
      : priority === "workspace"
        ? "Its home-office layouts and smart features align with the way you want to live and work."
        : "Its entry point and flexible use case make it the strongest place to begin.";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="concierge-trigger group fixed bottom-5 left-4 z-40 flex min-h-13 items-center gap-3 overflow-hidden border border-white/15 bg-[#071128]/94 px-4 pr-5 text-left text-white shadow-[0_20px_60px_rgba(7,17,40,0.32)] backdrop-blur-xl transition-all hover:-translate-y-1 hover:border-[#9be15d]/60 sm:bottom-6 sm:left-6"
        aria-label="Find the Engrite property that best matches your needs"
      >
        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#9be15d] text-[#071128]">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#9be15d]/30" aria-hidden="true" />
          <Compass className="relative h-4 w-4" />
        </span>
        <span>
          <span className="block text-[7px] font-bold uppercase tracking-[0.2em] text-[#9be15d]">
            60-second concierge
          </span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.13em]">
            Find your property
          </span>
        </span>
        <ArrowUpRight className="ml-1 hidden h-4 w-4 text-white/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:block" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[94vh] w-[calc(100vw-24px)] max-w-5xl overflow-y-auto border-0 bg-[#f7f7f2] p-0 shadow-[0_40px_140px_rgba(7,17,40,0.45)] sm:w-[94vw]">
          <DialogHeader className="sr-only">
            <DialogTitle>Engrite Property Concierge</DialogTitle>
            <DialogDescription>
              Answer three quick questions to find the Engrite development that best matches your plans.
            </DialogDescription>
          </DialogHeader>

          <div className="grid min-h-[680px] lg:grid-cols-[300px_1fr]">
            <aside className="relative overflow-hidden bg-[#071128] p-7 text-white sm:p-9">
              <div className="architectural-grid absolute inset-0 opacity-45" aria-hidden="true" />
              <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-[#1f7f39]/30 blur-3xl" aria-hidden="true" />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center gap-3">
                  <Image src="/img/favicon.svg" width={34} height={31} alt="" />
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-[0.18em]">Engrite</div>
                    <div className="text-[7px] font-bold uppercase tracking-[0.24em] text-[#9be15d]">
                      Property Concierge
                    </div>
                  </div>
                </div>

                <div className="mt-16">
                  <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#9be15d]">
                    Your private shortlist
                  </div>
                  <h2 className="mt-4 font-serif text-4xl leading-[0.95] tracking-[-0.035em] sm:text-5xl">
                    A better way to find your address.
                  </h2>
                  <p className="mt-5 text-xs font-light leading-7 text-white/58">
                    Three focused questions. One tailored place to begin your conversation with Engrite.
                  </p>
                </div>

                <ol className="mt-12 space-y-5">
                  {["Your goal", "Your budget", "Your priority", "Your match"].map((label, index) => (
                    <li key={label} className="flex items-center gap-3">
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border text-[9px] font-bold transition-colors ${
                          step > index
                            ? "border-[#9be15d] bg-[#9be15d] text-[#071128]"
                            : step === index
                              ? "border-[#9be15d] text-[#9be15d]"
                              : "border-white/20 text-white/35"
                        }`}
                      >
                        {step > index ? <Check className="h-3.5 w-3.5" /> : `0${index + 1}`}
                      </span>
                      <span
                        className={`text-[8px] font-bold uppercase tracking-[0.18em] ${
                          step === index ? "text-white" : "text-white/38"
                        }`}
                      >
                        {label}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-auto hidden border-t border-white/10 pt-6 text-[8px] uppercase tracking-[0.18em] text-white/35 lg:block">
                  No obligation · No personal data required
                </div>
              </div>
            </aside>

            <div className="relative flex flex-col p-6 sm:p-10 lg:p-12">
              <div className="mb-8 flex items-center justify-between pr-10">
                <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#596174]">
                  Step {Math.min(step + 1, 4)} of 4
                </div>
                <div className="h-1 w-32 overflow-hidden bg-[#102357]/10 sm:w-48">
                  <span
                    className="block h-full origin-left bg-[#1f7f39] transition-transform duration-500"
                    style={{ transform: `scaleX(${(step + 1) / 4})` }}
                  />
                </div>
              </div>

              {step === 0 && (
                <QuestionStep
                  eyebrow="Start with intention"
                  title="What do you want this property to do for you?"
                  options={GOALS}
                  onSelect={chooseGoal}
                />
              )}

              {step === 1 && (
                <QuestionStep
                  eyebrow="Shape the shortlist"
                  title="Which entry range feels right today?"
                  options={BUDGETS}
                  onSelect={chooseBudget}
                  onBack={() => setStep(0)}
                />
              )}

              {step === 2 && (
                <QuestionStep
                  eyebrow="The deciding detail"
                  title="What would make one address stand out?"
                  options={PRIORITIES}
                  onSelect={choosePriority}
                  onBack={() => setStep(1)}
                />
              )}

              {step === 3 && recommendation && (
                <div className="flex flex-1 flex-col">
                  <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#1f7f39]">
                    Your strongest starting point
                  </div>
                  <h3 className="mt-3 font-serif text-4xl leading-none tracking-[-0.04em] text-[#102357] sm:text-6xl">
                    {recommendation.name}
                  </h3>

                  <div className="mt-7 grid flex-1 gap-7 xl:grid-cols-[1.08fr_0.92fr]">
                    <div className="relative min-h-[300px] overflow-hidden bg-[#071128]">
                      <Image
                        src={recommendation.image}
                        alt={recommendation.name}
                        fill
                        sizes="(min-width: 1280px) 440px, 80vw"
                        className="object-cover"
                      />
                      <div className="image-wash absolute inset-0" />
                      <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                        <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#9be15d]">
                          {recommendation.location}
                        </div>
                        <div className="mt-2 text-sm font-light text-white/70">{recommendation.tagline}</div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="border-l-2 border-[#1f7f39] pl-5">
                        <div className="text-[8px] font-bold uppercase tracking-[0.18em] text-[#596174]">
                          Why this match
                        </div>
                        <p className="mt-2 text-sm font-light leading-7 text-[#343c4d]">
                          {recommendationReason}
                        </p>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-px bg-[#102357]/10">
                        <div className="bg-white p-4">
                          <div className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#596174]">
                            Entry point
                          </div>
                          <div className="mt-1 font-serif text-xl text-[#102357]">
                            {format(recommendation.startingPrice)}
                          </div>
                        </div>
                        <div className="bg-white p-4">
                          <div className="text-[7px] font-bold uppercase tracking-[0.18em] text-[#596174]">
                            Target gross yield
                          </div>
                          <div className="mt-1 font-serif text-xl text-[#1f7f39]">
                            {recommendation.annualReturn}%
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 space-y-2">
                        <Link
                          href={`/properties/${recommendation.slug}`}
                          onClick={() => setOpen(false)}
                          className="group flex min-h-13 items-center justify-between bg-[#102357] px-5 text-[9px] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#1f7f39]"
                        >
                          Explore this residence
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                        <a
                          href={`https://wa.me/${SETTINGS.contact.whatsappNumber}?text=${encodeURIComponent(
                            `Hi Engrite, your website concierge matched me with ${recommendation.name}. Please share the current offer document and next steps.`,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-h-13 items-center justify-between border border-[#102357]/18 px-5 text-[9px] font-bold uppercase tracking-[0.18em] text-[#102357] transition-colors hover:border-[#1f7f39] hover:text-[#1f7f39]"
                        >
                          Request a tailored conversation
                          <ArrowRight className="h-4 w-4" />
                        </a>
                      </div>

                      <button
                        type="button"
                        onClick={reset}
                        className="mt-4 inline-flex items-center gap-2 self-start text-[8px] font-bold uppercase tracking-[0.18em] text-[#596174] transition-colors hover:text-[#102357]"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Start again
                      </button>
                    </div>
                  </div>

                  <p className="mt-5 text-[9px] leading-5 text-[#747b89]">
                    This is a guided starting point based on your selections, not financial advice.
                    Confirm current pricing, availability and legal documents with Engrite.
                  </p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function QuestionStep<T extends string>({
  eyebrow,
  title,
  options,
  onSelect,
  onBack,
}: {
  eyebrow: string;
  title: string;
  options: Array<{
    id: T;
    label: string;
    description: string;
    icon: typeof Building2;
  }>;
  onSelect: (value: T) => void;
  onBack?: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col">
      <div className="text-[8px] font-bold uppercase tracking-[0.22em] text-[#1f7f39]">{eyebrow}</div>
      <h3 className="mt-3 max-w-2xl font-serif text-4xl leading-[1.02] tracking-[-0.035em] text-[#102357] sm:text-5xl">
        {title}
      </h3>

      <div className="mt-9 grid gap-3">
        {options.map((option, index) => {
          const Icon = option.icon;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className="group grid min-h-[108px] grid-cols-[50px_1fr_34px] items-center gap-4 border border-[#102357]/10 bg-white p-4 text-left shadow-[0_12px_40px_rgba(7,17,40,0.035)] transition-all hover:-translate-y-0.5 hover:border-[#1f7f39]/45 hover:shadow-[0_18px_55px_rgba(7,17,40,0.09)] sm:p-5"
            >
              <span className="flex h-12 w-12 items-center justify-center bg-[#f0f3eb] text-[#1f7f39] transition-colors group-hover:bg-[#1f7f39] group-hover:text-white">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#102357]">
                  {option.label}
                </span>
                <span className="mt-2 block text-xs font-light leading-5 text-[#596174]">
                  {option.description}
                </span>
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#102357]/10 text-[#102357] transition-all group-hover:border-[#1f7f39] group-hover:bg-[#1f7f39] group-hover:text-white">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="sr-only">Option {index + 1}</span>
            </button>
          );
        })}
      </div>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-2 self-start text-[8px] font-bold uppercase tracking-[0.18em] text-[#596174] transition-colors hover:text-[#102357]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Previous question
        </button>
      )}
    </div>
  );
}
