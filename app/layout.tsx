import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
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
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
    other: [
      {
        rel: "icon",
        url: "/icon0.svg",
        type: "image/svg+xml",
      },
      {
        rel: "icon",
        url: "/icon1.png",
        type: "image/png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Balweh",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Balweh - Gebäudereinigung und Galabau",
    description: SITE_DESCRIPTION,
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={`${geistSans.variable} font-sans antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
