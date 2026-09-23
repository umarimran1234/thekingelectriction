import Link from "next/link";

type Crumb = { label: string; href?: string };

export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  variant,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  crumbs?: Crumb[];
  variant?: "biz" | "center";
  children?: React.ReactNode;
}) {
  return (
    <section className={`page-hero${variant ? ` page-hero--${variant}` : ""}`}>
      <div className="container page-hero__inner">
        {crumbs && (
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            {crumbs.map((c, i) => (
              <span key={c.label} style={{ display: "contents" }}>
                <span>/</span>
                {c.href ? (
                  <Link href={c.href}>{c.label}</Link>
                ) : (
                  <span aria-current={i === crumbs.length - 1 ? "page" : undefined}>{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}
        <p className="eyebrow eyebrow--light">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="lead">{lead}</p>
        {children && <div className="hero__actions">{children}</div>}
      </div>
    </section>
  );
}
