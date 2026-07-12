import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { LanguageProvider } from "@/components/providers/language-provider";
import { FavoritesProvider } from "@/components/providers/favorites-provider";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const SITE_URL = "https://engriteinnovations.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Engrite Innovations Ltd. — Premium Real Estate Development & Investment in Lagos, Nigeria",
    template: "%s | Engrite Innovations Ltd.",
  },
  description:
    "Engrite Innovations Ltd. — Premium real estate development and investment in Lagos. Own properties from ₦17M with 7.1% annual returns, 17-year lease structures, and our Live or Earn model. Headquartered in Yaba, Lagos.",
  keywords: [
    "Lagos real estate",
    "Nigeria property investment",
    "Yaba apartments",
    "Gbagada off-plan",
    "Live or Earn",
    "premium real estate Lagos",
    "17 year lease",
    "Engrite Innovations",
    "Sinai Spaces",
    "Sinai Residence",
    "Crest Residence",
    "diaspora real estate Nigeria",
  ],
  authors: [{ name: "Engrite Innovations Ltd." }],
  creator: "Engrite Innovations Ltd.",
  publisher: "Engrite Innovations Ltd.",
  robots: { index: true, follow: true },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "en-NG": SITE_URL,
      "yo-NG": `${SITE_URL}/?lang=yo`,
      "ha-NG": `${SITE_URL}/?lang=ha`,
      "ig-NG": `${SITE_URL}/?lang=ig`,
      "pcm-NG": `${SITE_URL}/?lang=pcm`,
    },
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Engrite Innovations — Own An Address That Pays You Back",
    description:
      "Premium real estate development in Lagos. 7.1% annual returns, 17-year lease, Live or Earn model. From ₦17M.",
    siteName: "Engrite Innovations Ltd.",
    locale: "en_NG",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Engrite Innovations — Premium Real Estate in Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engrite Innovations — Own An Address That Pays You Back",
    description:
      "Premium real estate in Lagos. 7.1% annual returns. Live or Earn model. From ₦17M.",
    images: ["/img/og-image.jpg"],
  },
  icons: {
    icon: [{ url: "/img/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/img/favicon.svg" }],
  },
  manifest: "/site.webmanifest",
  category: "real estate",
};

export const viewport: Viewport = {
  themeColor: "#102357",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "RealEstateAgent",
      "@id": `${SITE_URL}/#organization`,
      name: "Engrite Innovations Ltd.",
      alternateName: "Engrite Innovations",
      url: SITE_URL,
      logo: `${SITE_URL}/img/og-image.jpg`,
      image: `${SITE_URL}/img/og-image.jpg`,
      description:
        "Engrite Innovations Ltd. — Building Dreams, Shaping Cities. A Lagos-based real estate development and investment company headquartered in Yaba, specializing in Sales, Rent, Lease, Development, Surveying, and Construction.",
      slogan: "Building Dreams, Shaping Cities",
      telephone: "+234-813-066-5862",
      email: "engriteinnovations@gmail.com",
      founder: {
        "@type": "Person",
        name: "Victor Osinaike",
        jobTitle: "CEO & Real Estate Developer",
        almaMater: "University of Lagos",
        knowsAbout: ["Land Surveying", "Real Estate Development", "Building Construction"],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "27, Montgomery Street",
        addressLocality: "Yaba",
        addressRegion: "Lagos",
        addressCountry: "NG",
      },
      areaServed: { "@type": "City", name: "Lagos" },
      knowsAbout: [
        "Real Estate Development",
        "Property Investment",
        "Land Surveying",
        "Building Construction",
        "Property Management",
        "Shortlet Management",
      ],
      sameAs: [
        "https://instagram.com/engriteinnovations_",
        "https://ng.linkedin.com/company/engrite-innovations",
        "https://www.facebook.com/EduserveNG",
        "https://www.tiktok.com/@engriteinnovation",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Engrite Innovations",
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "en-NG",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <LanguageProvider>
          <CurrencyProvider>
            <FavoritesProvider>
              {children}
              <Toaster />
            </FavoritesProvider>
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
