// Tiny zero-dependency static site builder.
// Reads src/pages/*.html, wraps each in the shared layout, writes to the repo root.
// Usage: node build.mjs
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = new URL(".", import.meta.url).pathname;
const read = (p) => readFileSync(join(root, p), "utf8");

const site = JSON.parse(read("src/site.json"));
const partials = Object.fromEntries(
  readdirSync(join(root, "src/partials")).map((f) => [f.replace(/\.html$/, ""), read(`src/partials/${f}`)])
);

const fill = (tpl, vars) =>
  tpl.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const val = key.split(".").reduce((o, k) => (o == null ? o : o[k]), vars);
    return val == null ? "" : String(val);
  });

for (const file of readdirSync(join(root, "src/pages"))) {
  const raw = read(`src/pages/${file}`);
  const m = raw.match(/^<!--\s*(\{[\s\S]*?\})\s*-->\n?/);
  if (!m) throw new Error(`${file}: missing <!-- {meta} --> header`);
  const page = JSON.parse(m[1]);
  const slug = file.replace(/\.html$/, "");
  const vars = { site, page: { ...page, slug, url: slug === "index" ? "" : `${slug}.html` } };

  let header = fill(partials.header, vars);
  // Mark the active nav item.
  header = header.replace(new RegExp(`data-nav="${page.nav || slug}"`, "g"), 'aria-current="page" data-nav-active');

  const body = fill(raw.slice(m[0].length), vars);
  const html = [
    fill(partials.head, vars),
    header,
    `<main id="main">\n${body}\n</main>`,
    fill(partials.cta, vars).repeat(page.cta === false ? 0 : 1),
    fill(partials.footer, vars),
  ].join("\n");

  writeFileSync(join(root, file), html);
  console.log(`built ${file}`);
}
