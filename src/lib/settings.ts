import { GENERATED_SETTINGS } from "./content-generated";

export type SiteSettings = {
  company: {
    name: string;
    legalName: string;
    rcNumber: string;
    tagline: string;
    established: string;
    description: string;
  };
  contact: {
    phonePrimary: string;
    phoneSecondary: string;
    email: string;
    address: string;
    whatsappNumber: string;
    hours: string;
  };
  social: {
    instagram: string;
    linkedin: string;
    facebook: string;
  };
  hero: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: {
    annualReturn: string;
    annualReturnLabel: string;
    leaseTerm: string;
    leaseTermLabel: string;
    activeProjects: string;
    activeProjectsLabel: string;
    legalFees: string;
    legalFeesLabel: string;
  };
  founder: {
    name: string;
    title: string;
    role: string;
    education: string;
    location: string;
  };
  diaspora: {
    title: string;
    description: string;
    closingTime: string;
  };
  footer: {
    aboutBlurb: string;
    copyright: string;
  };
};

const FALLBACK: SiteSettings = {
  company: {
    name: "Engrite Innovations Ltd.",
    legalName: "Engrite Innovations Ltd.",
    rcNumber: "7233410",
    tagline: "Building Dreams, Shaping Cities.",
    established: "2020",
    description: "Your trusted partner in the journey towards home ownership.",
  },
  contact: {
    phonePrimary: "+234 813 066 5862",
    phoneSecondary: "+234 906 175 3571",
    email: "engriteinnovations@gmail.com",
    address: "27, Montgomery Street, Yaba, Lagos, Nigeria",
    whatsappNumber: "2348130665862",
    hours: "Mon–Sat, 9am–6pm WAT",
  },
  social: {
    instagram: "https://instagram.com/engriteinnovations_",
    linkedin: "https://linkedin.com/company/engrite-innovations",
    facebook: "https://facebook.com/engriteinnovations",
  },
  hero: {
    eyebrow: "Own An Address",
    titleLine1: "Own An Address",
    titleLine2: "That Pays",
    titleLine3: "You Back.",
    subtitle: "Your trusted partner in the journey towards home ownership. Premium real estate development and investment opportunities across Lagos.",
    primaryCta: "Explore Properties",
    secondaryCta: "Investment Returns",
  },
  stats: {
    annualReturn: "7.1%",
    annualReturnLabel: "Illustrative Gross Yield",
    leaseTerm: "17",
    leaseTermLabel: "Year Lease",
    activeProjects: "3+",
    activeProjectsLabel: "Active Projects",
    legalFees: "5%",
    legalFeesLabel: "Legal Fees Only",
  },
  founder: {
    name: "Victor Osinaike",
    title: "Founder & CEO",
    role: "Real Estate Developer & Registered Surveyor",
    education: "University of Lagos",
    location: "Lagos, Nigeria",
  },
  diaspora: {
    title: "Built for the Diaspora",
    description: "A guided remote buying experience for Nigerians abroad — from live video walkthroughs and document review to coordinated payments and construction updates.",
    closingTime: "By appointment",
  },
  footer: {
    aboutBlurb: "Your trusted partner in the journey towards home ownership. Premium real estate development and investment in Lagos, Nigeria.",
    copyright: "© 2026 Engrite Innovations Ltd. All rights reserved.",
  },
};

export const SETTINGS: SiteSettings = (GENERATED_SETTINGS as SiteSettings | null) ?? FALLBACK;
