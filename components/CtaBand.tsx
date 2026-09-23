import Link from "next/link";
import { Icon } from "./Icon";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container cta-band__inner reveal">
        <div>
          <p className="eyebrow eyebrow--light">Ready when you are</p>
          <h2 id="cta-title">Let&apos;s get your power right — the first time.</h2>
          <p>
            Tell us what&apos;s going on and a licensed King&apos;s Electric electrician will get back to you with
            honest, upfront pricing.
          </p>
        </div>
        <div className="cta-band__actions">
          <Link className="btn btn--gold btn--lg" href="/contact">Request a Free Estimate</Link>
          <a className="btn btn--ghost btn--lg" href={site.phoneHref}>
            <Icon name="phone" />
            {site.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
