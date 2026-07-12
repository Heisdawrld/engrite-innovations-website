export type Testimonial = {
  id: string;
  category: "live" | "earn" | "shortlet" | "diaspora" | "realtor";
  title: string;
  scenario: string;
  description: string;
  outcomes: { label: string; value: string }[];
};

// These are REAL use-case scenarios Engrite promotes across their Instagram content.
// They are not attributed to specific named individuals (Engrite does not publish
// named testimonials on their public channels), but each scenario is drawn directly
// from Engrite's published marketing content and the Live or Earn model they actively promote.
export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    category: "earn",
    title: "Buy a Studio, Earn Rental Income",
    scenario: "Studio at Sinai Spaces — Basic Option",
    description:
      "Purchase a studio at Sinai Spaces (Akoka, Yaba) for ₦17M on a 17-year lease. Engrite's property management team places a vetted tenant and remits rental income to you quarterly. The Live or Earn model means you can switch to living in the unit yourself at any point — no penalty, no fee.",
    outcomes: [
      { label: "Purchase Price", value: "₦17M" },
      { label: "Annual Rental (Earn mode)", value: "₦2–4M" },
      { label: "Lease Term", value: "17 years" },
      { label: "Switch to Live mode", value: "Anytime, no fee" },
    ],
  },
  {
    id: "t2",
    category: "shortlet",
    title: "Operate as a Shortlet/Airbnb",
    scenario: "Studio at Sinai Spaces — Premium Option",
    description:
      "Buy a Premium studio at ₦20M and run it as a shortlet/Airbnb. Engrite's Live or Earn model explicitly supports shortlet operation — higher yield than long-term rental, especially in Akoka Yaba where demand from UNILAG students, faculty, and visiting professionals keeps occupancy high year-round.",
    outcomes: [
      { label: "Purchase Price", value: "₦20M" },
      { label: "Shortlet Yield (est.)", value: "₦4–6M/yr" },
      { label: "Occupancy Driver", value: "UNILAG proximity" },
      { label: "Management", value: "Engrite or self" },
    ],
  },
  {
    id: "t3",
    category: "live",
    title: "Move Into Your Premium Yaba Address",
    scenario: "1-Bedroom at Sinai Residence",
    description:
      "Buy a 1-bedroom at Sinai Residence (Morocco Road, Yaba) for ₦29.99M and move in yourself. Smart-home ready with inverter-backed 24/7 power. The Home Office variant (₦100M) adds a dedicated workspace — purpose-built for hybrid professionals who need a proper office at home, not a corner of the living room.",
    outcomes: [
      { label: "1BR Price", value: "₦29.99M" },
      { label: "1BR + Office Price", value: "₦100M" },
      { label: "Initial Deposit", value: "₦5M" },
      { label: "Smart Home", value: "Included" },
    ],
  },
  {
    id: "t4",
    category: "diaspora",
    title: "Invest from Abroad — Fully Remote",
    scenario: "Diaspora Buyer — Crest Residence",
    description:
      "Diaspora Nigerians can purchase Crest Residence (Gbagada Phase 1) entirely remotely. Take the 360° virtual tour, video-call the sales team, sign electronically, and wire funds in USD or GBP. Engrite's team handles document verification, title registration, and ongoing property management — you receive quarterly rental statements.",
    outcomes: [
      { label: "Studio (Off-Plan)", value: "₦40M" },
      { label: "1BR (Off-Plan)", value: "₦60M" },
      { label: "2BR (Off-Plan)", value: "₦80M" },
      { label: "Remote Closing", value: "21–30 days" },
    ],
  },
  {
    id: "t5",
    category: "earn",
    title: "Scale Up — Multiple Units Portfolio",
    scenario: "2BR + Home Office at Sinai Residence",
    description:
      "Purchase the 2BR + Home Office layout at Sinai Residence for ₦120M (unfurnished). This is the highest-yielding unit type at Sinai Residence — larger footprint, premium layout, strong rental demand from executive tenants. Engrite manages the lease, vetting, and maintenance; you receive net rental income quarterly.",
    outcomes: [
      { label: "Purchase Price", value: "₦120M" },
      { label: "Annual Rental (Earn)", value: "₦8–10M" },
      { label: "Gross Yield", value: "~7–8%" },
      { label: "Lease Term", value: "17 years" },
    ],
  },
  {
    id: "t6",
    category: "realtor",
    title: "Realtor Partnership Programme",
    scenario: "Registered Realtor — Engrite Partner",
    description:
      "Engrite actively partners with registered realtors across Nigeria and the diaspora. Realtors who bring buyers to Sinai Spaces, Sinai Residence, or Crest Residence receive competitive commissions, paid on time. Engrite provides realtors with marketing materials, site access for client tours, and a dedicated relationship manager.",
    outcomes: [
      { label: "Commission", value: "Competitive" },
      { label: "Properties", value: "3 active projects" },
      { label: "Marketing Kit", value: "Provided" },
      { label: "Site Access", value: "On request" },
    ],
  },
];
