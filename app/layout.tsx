import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.balweh.de"),
  title: {
    default: "BALWEH Gebäudereinigung und Galabau",
    template: "%s | BALWEH - Gebäudereinigung und Galabau",
  },
  description: "Description here.",
  applicationName: "BALWEH - Gebäudereinigung und Galabau",
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
    title: "BALWEH",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "BALWEH - Gebäudereinigung und Galabau",
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
        {children}
      </body>
    </html>
  );
}
