import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.balweh.de"),
  title: {
    default: "Balweh Gebäudereinigung und Galabau",
    template: "%s | Balweh - Gebäudereinigung und Galabau",
  },
  description: "Description here.",
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
    description: "Description here.",
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
        <div className="min-h-screen bg-white text-zinc-900">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
