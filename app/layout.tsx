import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CacheConsent from "./components/CacheConsent";
import CachePreferences from "./components/CachePreferences";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const SITE_DESCRIPTION =
  "Professionelle Gebäudereinigung und Gartenlandschaftsbau in Deutschland. Zuverlässige Dienstleistungen für Unternehmen und private Kunden.";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.balweh.de"),
  title: {
    default: "Balweh Gebäudereinigung und Galabau",
    template: "%s | Balweh - Gebäudereinigung und Galabau",
  },
  description: SITE_DESCRIPTION,
  applicationName: "Balweh - Gebäudereinigung und Galabau",
  icons: {
    icon: [
      {
        url: "/web-app-manifest-192x192.png",
        type: "image/png",
      },
      {
        url: "/web-app-manifest-512x512.png",
        type: "image/png",
      },
    ],
    apple: "/web-app-manifest-192x192.png",
  },
  appleWebApp: {
    capable: true,
    title: "Balweh",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Balweh - Gebäudereinigung und Galabau",
    description: SITE_DESCRIPTION,
    locale: "de_DE",
    type: "website",
    siteName: "Balweh",
    url: "https://www.balweh.de",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.balweh.de",
  name: "Balweh Gebäudereinigung und Garten- und Landschaftsbau",
  description: SITE_DESCRIPTION,
  url: "https://www.balweh.de",
  telephone: "+4921423086869",
  email: "info@balweh.de",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Baumberger Str. 54",
    postalCode: "51373",
    addressLocality: "Leverkusen",
    addressRegion: "NRW",
    addressCountry: "DE",
  },
  areaServed: [
    {
      "@type": "State",
      name: "Nordrhein-Westfalen",
    },
    {
      "@type": "City",
      name: "Leverkusen",
    },
  ],
  priceRange: "$$",
  image: "https://www.balweh.de/balweh_logo_with_text.svg",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "18:00",
  },
  sameAs: ["https://www.instagram.com/balweh_/"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    ratingCount: "1",
  },
  serviceType: ["Gebäudereinigung", "Garten- und Landschaftsbau"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
        <CacheConsent />
        <CachePreferences />
      </body>
    </html>
  );
}
