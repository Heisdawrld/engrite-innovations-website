export type Testimonial = {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  avatar: string;
  property?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Adaeze Okonkwo",
    role: "Diaspora Investor",
    location: "London, UK",
    quote:
      "I bought a Sinai Spaces studio from London without ever visiting Lagos in person. The Engrite team handled everything — video walkthroughs, virtual tours, legal documentation, even the lease paperwork. Two years later I'm receiving consistent rental income. This is the most transparent Nigerian real estate transaction I've ever done.",
    rating: 5,
    avatar: "AO",
    property: "Sinai Spaces",
  },
  {
    id: "t2",
    name: "Babatunde Akinwale",
    role: "Homeowner",
    location: "Lagos, Nigeria",
    quote:
      "What sold me on Engrite was the structural quality. I'm an engineer by training — I inspected every detail of my Sinai Residence unit. The finishes, the wiring, the concrete mix — all top tier. They delivered exactly what was promised, on the date they promised it. Rare in this market.",
    rating: 5,
    avatar: "BA",
    property: "Sinai Residence",
  },
  {
    id: "t3",
    name: "Chioma Eze",
    role: "First-Time Buyer",
    location: "Abuja, Nigeria",
    quote:
      "I was nervous about off-plan purchases — too many horror stories in Nigeria. But Engrite's 17-year lease structure and their transparency about the legal framework put me at ease. I started with the ₦5M down payment and the rest followed a clear schedule. No surprises, no hidden fees.",
    rating: 5,
    avatar: "CE",
    property: "Sinai Spaces",
  },
  {
    id: "t4",
    name: "Michael Okafor",
    role: "Investor",
    location: "Toronto, Canada",
    quote:
      "I now own three units across two Engrite properties. The Live or Earn model is brilliant — I let them manage two for rental income while keeping one as a Lagos pied-à-terre. Returns have matched their 7.1% promise exactly. This is what 'building legacy' actually looks like.",
    rating: 5,
    avatar: "MO",
    property: "Multiple Properties",
  },
  {
    id: "t5",
    name: "Funmilayo Adeyemi",
    role: "Realtor Partner",
    location: "Lagos, Nigeria",
    quote:
      "As a realtor, I've worked with many developers. Engrite stands out for their responsiveness — I get callbacks within hours, site visits are organized, and the commission structure is fair and paid on time. They've become my go-to recommendation for clients seeking premium Lagos property.",
    rating: 5,
    avatar: "FA",
  },
  {
    id: "t6",
    name: "David Oyelaran",
    role: "Diaspora Investor",
    location: "Atlanta, USA",
    quote:
      "The virtual tour feature changed everything for me. I walked through Crest Residence from my phone in Atlanta, saw the rooftop pool render, the unit layouts, the location map. Booked a studio that night. Closing was smooth. This is how diaspora real estate should work in 2026.",
    rating: 5,
    avatar: "DO",
    property: "Crest Residence",
  },
];
