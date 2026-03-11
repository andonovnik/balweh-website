import type { Metadata } from "next";
import { Geist } from "next/font/google";
import JsonLd from "./components/JsonLd";
import Footer from "./components/Footer";
import Header from "./components/Header";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  websiteSchema,
} from "./lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: {
    canonical: "/",
  },
  category: "Dienstleistungen",
  keywords: [
    "Gebäudereinigung Leverkusen",
    "Garten- und Landschaftsbau Leverkusen",
    "Gebäudeservice NRW",
    "Galabau Leverkusen",
  ],
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
    title: "Balweh Gebäudereinigung und Galabau",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "de_DE",
    type: "website",
    siteName: SITE_NAME,
    images: [
      {
        url: "/social/og-image.png",
        width: 1200,
        height: 630,
        alt: "Balweh Gebäudereinigung und Galabau",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: ["/social/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <JsonLd data={websiteSchema} />
      </head>
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
