// Team roster. Add a square photo at public/team/<slug>.jpg and set `photo: true`
// to show it; otherwise a branded initials avatar is displayed.
export type Member = {
  name: string;
  role: string;
  slug: string;
  group: "leadership" | "pm" | "field";
  bio?: string;
  photo?: boolean;
};

export const team: Member[] = [
  {
    name: "Michael King",
    role: "CEO & Master Electrician",
    slug: "michael-king",
    group: "leadership",
    bio: "Founder and owner. Works alongside customers from the office to the field to make sure every job meets the King's standard.",
  },
  {
    name: "Bruno Borges",
    role: "COO & HR Director",
    slug: "bruno-borges",
    group: "leadership",
    bio: "Keeps operations running smoothly and builds the team that shows up at your door.",
  },
  { name: "Austin Luger", role: "Commercial Project Manager", slug: "austin-luger", group: "pm" },
  { name: "Miranda McCall", role: "Residential Project Manager", slug: "miranda-mccall", group: "pm" },
  { name: "Jamon Duson", role: "Senior Electrician", slug: "jamon-duson", group: "field" },
  { name: "Kieran Goodnight", role: "Lead Electrician", slug: "kieran-goodnight", group: "field" },
  { name: "Colton Mount", role: "Lead Electrician", slug: "colton-mount", group: "field" },
  { name: "Will Parr", role: "Lead Electrician", slug: "will-parr", group: "field" },
  { name: "Maddox Matthews", role: "Electrician", slug: "maddox-matthews", group: "field" },
  { name: "Logan Bistrup", role: "Electrician", slug: "logan-bistrup", group: "field" },
  { name: "Connor Baird", role: "Electrician", slug: "connor-baird", group: "field" },
  { name: "Jude Marlin", role: "Electrician", slug: "jude-marlin", group: "field" },
];
