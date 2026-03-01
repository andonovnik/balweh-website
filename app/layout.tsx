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
    default: "BALWEH GmbH",
    template: "%s | BALWEH - Gebäudereinigung und Galabau",
  },
  description: "Description here.",
  applicationName: "BALWEH - Gebäudereinigung und Galabau",
  alternates: {
    canonical: "/",
  },
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
