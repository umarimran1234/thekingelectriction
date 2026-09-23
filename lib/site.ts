export const site = {
  name: "The King's Electric",
  legalName: "The King's Electric, LLC",
  url: "https://www.thekingselectric.com",
  phone: "(817) 308-6444",
  phoneHref: "tel:+18173086444",
  street: "1288 W Arkansas Ln",
  city: "Arlington",
  region: "TX",
  zip: "76013",
  hours: "Mon – Fri · 7:30 AM – 4:30 PM",
  area: "Arlington & the Dallas–Fort Worth Metroplex",
  mapsUrl: "https://maps.google.com/?q=1288+W+Arkansas+Ln,+Arlington,+TX+76013",
  mapEmbed:
    "https://maps.google.com/maps?q=1288%20W%20Arkansas%20Ln%2C%20Arlington%2C%20TX%2076013&z=12&output=embed",
  facebook: "https://www.facebook.com/thekingselectric/",
} as const;

// Paste a form endpoint (e.g. https://formspree.io/f/xxxxxx) into .env.local as
// NEXT_PUBLIC_FORM_ENDPOINT to receive submissions by email.
export const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "";
export const fallbackEmail = process.env.NEXT_PUBLIC_FALLBACK_EMAIL ?? "";

export const nav = [
  { href: "/", label: "Home" },
  {
    label: "Services",
    children: [
      { href: "/residential", label: "Residential", sub: "Homes, remodels & repairs" },
      { href: "/commercial", label: "Commercial", sub: "Retail, restaurants, offices & more" },
    ],
  },
  { href: "/team", label: "The Team" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;
