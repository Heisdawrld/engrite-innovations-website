import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CurrencyProvider } from "@/components/providers/currency-provider";
import { LanguageProvider } from "@/components/providers/language-provider";

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
    "Explore thoughtfully designed residences by Engrite Innovations across Abule Ijesha, Yaba and Gbagada, Lagos. View current developments, ownership options and construction updates.",
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
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Engrite Innovations — Own An Address That Pays You Back",
    description:
      "Thoughtfully designed residences across Abule Ijesha, Yaba and Gbagada, Lagos. Explore current developments and book a private inspection.",
    siteName: "Engrite Innovations Ltd.",
    locale: "en_NG",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Engrite Innovations — Building Dreams. Shaping Cities.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Engrite Innovations — Own An Address That Pays You Back",
    description:
      "Explore Engrite developments across Lagos and book a private inspection.",
    images: ["/og.png"],
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
      logo: `${SITE_URL}/img/og-image.webp`,
      image: `${SITE_URL}/img/og-image.webp`,
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
        {/* Load the admin identity bundle only when an invitation/recovery link
            lands on the public site. Regular visitors avoid the extra script. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var needsIdentity = /(?:invite|recovery|confirmation)_token=/.test(window.location.hash);
                if (!needsIdentity) return;
                var script = document.createElement("script");
                script.src = "https://identity.netlify.com/v1/netlify-identity-widget.js";
                script.onload = function () {
                  if (!window.netlifyIdentity) return;
                  window.netlifyIdentity.on("init", function (user) {
                    if (!user) {
                      window.netlifyIdentity.on("login", function () {
                        document.location.href = "/admin/";
                      });
                    }
                  });
                  window.netlifyIdentity.open();
                };
                document.head.appendChild(script);
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${playfair.variable} ${montserrat.variable} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <LanguageProvider>
          <CurrencyProvider>
            {children}
            <Toaster />
          </CurrencyProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
