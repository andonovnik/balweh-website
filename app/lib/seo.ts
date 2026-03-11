import type { Metadata } from "next";

export const SITE_URL = "https://www.balweh.de";
export const SITE_NAME = "Balweh Gebäudereinigung und Galabau";
export const BUSINESS_NAME = "Balweh Gebäudereinigung und Galabau e.K.";
export const SITE_DESCRIPTION =
  "Professionelle Gebäudereinigung und Gartenlandschaftsbau in Deutschland. Zuverlässige Dienstleistungen für Unternehmen und private Kunden.";
export const CONTACT_EMAIL = "info@balweh.de";
export const CONTACT_PHONE = "+49 155 67200971";
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

const POSTAL_ADDRESS = {
  "@type": "PostalAddress",
  streetAddress: "Baumberger Str. 54",
  postalCode: "51373",
  addressLocality: "Leverkusen",
  addressRegion: "Nordrhein-Westfalen",
  addressCountry: "DE",
};

const NRW_AREA = {
  "@type": "AdministrativeArea",
  name: "Nordrhein-Westfalen",
};

type PageMetadataOptions = {
  description: string;
  keywords?: string[];
  openGraphTitle?: string;
  path: string;
  title: string;
};

type BreadcrumbItem = {
  label: string;
  path: string;
};

export function absoluteUrl(path: string) {
  if (path === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createPageMetadata({
  description,
  keywords,
  openGraphTitle,
  path,
  title,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: openGraphTitle ?? `${title} | Balweh`,
      description,
      url: absoluteUrl(path),
      type: "website",
    },
    keywords,
  };
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createServiceSchema(name: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    serviceType: name,
    areaServed: NRW_AREA,
    provider: {
      "@id": ORGANIZATION_ID,
    },
    url: absoluteUrl(path),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
    },
  };
}

export function createContactPageSchema(path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${absoluteUrl(path)}#contactpage`,
    url: absoluteUrl(path),
    name: "Kontakt",
    about: {
      "@id": ORGANIZATION_ID,
    },
    mainEntity: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      address: POSTAL_ADDRESS,
    },
  };
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: BUSINESS_NAME,
      url: SITE_URL,
      email: CONTACT_EMAIL,
      telephone: CONTACT_PHONE,
      logo: `${SITE_URL}/balweh_logo_with_text.svg`,
      sameAs: [
        "https://www.instagram.com/balweh_/",
        "https://www.tiktok.com/@balweh10",
      ],
      address: POSTAL_ADDRESS,
      areaServed: NRW_AREA,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "de-DE",
      publisher: {
        "@id": ORGANIZATION_ID,
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: BUSINESS_NAME,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      image: `${SITE_URL}/balweh_logo_with_text.svg`,
      priceRange: "$$",
      telephone: CONTACT_PHONE,
      email: CONTACT_EMAIL,
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      makesOffer: {
        "@type": "OfferCatalog",
        name: "Leistungen",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Gebäudereinigung",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Garten- und Landschaftsbau",
            },
          },
        ],
      },
      parentOrganization: {
        "@id": ORGANIZATION_ID,
      },
    },
  ],
};