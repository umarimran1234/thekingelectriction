import Link from "next/link";
import { Icon, Stars, type IconName } from "@/components/Icon";
import { CountUp } from "@/components/CountUp";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: "shield", title: "Licensed & insured", text: "Work performed by Texas-licensed electricians, built to code and ready for inspection." },
  { icon: "tag", title: "Upfront, fair pricing", text: "You'll know the price before we start. Reasonable rates, no surprise line items." },
  { icon: "clock", title: "Fast & reliable", text: "We arrive when we say we will, diagnose quickly and finish efficiently." },
  { icon: "sparkle", title: "Clean job sites", text: "We treat your home or business with respect and leave it as tidy as we found it." },
];

const steps = [
  { title: "Reach out", text: "Call or send a request. Tell us what's happening and when works for you." },
  { title: "Diagnose & quote", text: "A licensed electrician assesses the job and gives you a clear, upfront price." },
  { title: "Expert work", text: "We complete the work safely, to code, and keep you updated along the way." },
  { title: "Walkthrough", text: "We test everything, walk you through it and clean up before we leave." },
];

const reviews: { icon: IconName; title: string; text: string }[] = [
  { icon: "sparkle", title: "On our service", text: "Friendly, communicative and hard-working. They finished the whole job in a single day and left no mess behind." },
  { icon: "users", title: "On our communication", text: "Showed up on time, fixed every problem quickly, took time to answer our questions and charged a very fair rate." },
  { icon: "wrench", title: "On our workmanship", text: "Knowledgeable team, great workmanship and fair pricing — from a small repair all the way to a large rewiring project." },
];

const cities = ["Arlington", "Fort Worth", "Dallas", "Grand Prairie", "Mansfield", "Irving", "Euless", "Bedford", "Hurst", "Kennedale", "Burleson", "& surrounding cities"];

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <svg className="hero__circuit" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            <g fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M0 120h180l40 40h200l30-30h350" />
              <path d="M0 300h90l50-50h240l40 40h380" />
              <path d="M0 470h260l40-40h160l60 60h280" />
              <path d="M520 0v90l-40 40v140M660 600V420l40-40V200" />
            </g>
            <g fill="currentColor">
              {[[220, 160], [450, 130], [380, 250], [480, 270], [300, 430], [700, 380]].map(([cx, cy]) => (
                <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" />
              ))}
            </g>
          </svg>
        </div>
        <div className="container hero__grid">
          <div className="hero__copy">
            <p className="pill"><span className="pill__dot" />Locally owned in Arlington, Texas</p>
            <h1>Electrical work done <span className="text-gold">right</span>, by people who show up.</h1>
            <p className="lead">
              From a flickering outlet to a full commercial build-out, The King&apos;s Electric brings licensed
              electricians, clear communication and upfront pricing to homes and businesses across the DFW Metroplex.
            </p>
            <div className="hero__actions">
              <Link className="btn btn--gold btn--lg" href="/contact">Get a Free Estimate <Icon name="arrow" /></Link>
              <a className="btn btn--ghost btn--lg" href={site.phoneHref}><Icon name="phone" />{site.phone}</a>
            </div>
            <ul className="hero__proof">
              <li><Stars /> 5.0 from 240+ customer reviews</li>
              <li><Icon name="shield" /> Texas licensed &amp; insured</li>
            </ul>
          </div>

          <div className="hero__visual" aria-hidden="true">
            <div className="panel-card">
              <div className="panel-card__head">
                <span className="panel-card__led" /> Service status
                <span className="panel-card__ok">All circuits live</span>
              </div>
              <div className="panel-card__breakers">
                {Array.from({ length: 12 }, (_, i) => <span key={i} />)}
              </div>
              <div className="panel-card__foot">
                <div><strong>Residential</strong><small>Repairs · remodels · upgrades</small></div>
                <div><strong>Commercial</strong><small>Retail · restaurants · offices</small></div>
              </div>
            </div>
            <div className="float-badge float-badge--a"><Icon name="bolt" /><div><strong>Top 2%</strong><small>of Texas licensed contractors*</small></div></div>
            <div className="float-badge float-badge--b"><Icon name="tag" /><div><strong>Upfront pricing</strong><small>No surprises</small></div></div>
          </div>
        </div>
      </section>

      <section className="trust" aria-label="Why customers trust us">
        <div className="container trust__grid">
          <div className="trust__item"><strong><CountUp to={5} decimals={1} /></strong><span>Average customer rating</span></div>
          <div className="trust__item"><strong><CountUp to={240} />+</strong><span>Customer reviews</span></div>
          <div className="trust__item"><strong>Top <CountUp to={2} />%</strong><span>Of Texas licensed contractors*</span></div>
          <div className="trust__item"><strong>DFW</strong><span>Homes &amp; businesses served</span></div>
        </div>
      </section>

      <section className="section" aria-labelledby="services-title">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">What we do</p>
            <h2 id="services-title">Two specialties. One standard of work.</h2>
            <p>Whether it&apos;s your family&apos;s home or your place of business, you get the same licensed crew, the same attention to code, and the same clean job site.</p>
          </header>

          <div className="split-cards">
            <Link className="feature-card reveal" href="/residential">
              <div className="feature-card__art feature-card__art--home" aria-hidden="true"><Icon name="home" /></div>
              <div className="feature-card__body">
                <p className="eyebrow">For homeowners</p>
                <h3>Residential Electrical</h3>
                <p>Service calls, troubleshooting, panel and wiring upgrades, lighting, fans and full remodel wiring — handled safely and explained plainly.</p>
                <ul className="checks">
                  <li>Outlets, switches &amp; circuit repairs</li>
                  <li>Aluminum wiring pigtailing &amp; upgrades</li>
                  <li>Remodels &amp; new construction</li>
                </ul>
                <span className="link-arrow">Explore residential <Icon name="arrow" /></span>
              </div>
            </Link>
            <Link className="feature-card feature-card--dark reveal" href="/commercial">
              <div className="feature-card__art feature-card__art--biz" aria-hidden="true"><Icon name="building" /></div>
              <div className="feature-card__body">
                <p className="eyebrow eyebrow--light">For businesses</p>
                <h3>Commercial Electrical</h3>
                <p>Restaurants, retail stores, apartment complexes, offices and parking lots — we keep your lights on and your doors open.</p>
                <ul className="checks checks--light">
                  <li>Retail lighting &amp; infrastructure</li>
                  <li>Build-outs, remodels &amp; new construction</li>
                  <li>Ongoing maintenance &amp; service calls</li>
                </ul>
                <span className="link-arrow">Explore commercial <Icon name="arrow" /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="why-title">
        <div className="container why">
          <div className="why__intro reveal">
            <p className="eyebrow">Why The King&apos;s Electric</p>
            <h2 id="why-title">Small enough to care. Skilled enough for any job.</h2>
            <p>We&apos;re a local, owner-led team. Leadership works alongside customers from the first call to the final inspection — so nothing gets lost in a hand-off, and every job carries our name.</p>
            <Link className="btn btn--navy" href="/team">Meet the team</Link>
          </div>
          <div className="why__grid">
            {values.map((v) => (
              <article key={v.title} className="value reveal">
                <span className="value__icon"><Icon name={v.icon} /></span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="process-title">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">How it works</p>
            <h2 id="process-title">Simple from first call to final switch-on.</h2>
          </header>
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title} className="step reveal">
                <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--navy" aria-labelledby="reviews-title">
        <div className="container">
          <header className="section__head section__head--light reveal">
            <p className="eyebrow eyebrow--light">What customers say</p>
            <h2 id="reviews-title">Rated 5.0 by our neighbors across DFW.</h2>
            <p>Here are the themes customers mention most in their reviews.</p>
          </header>
          <div className="reviews">
            {reviews.map((r) => (
              <figure key={r.title} className="review reveal">
                <Stars />
                <blockquote>{r.text}</blockquote>
                <figcaption>
                  <span className="avatar"><Icon name={r.icon} /></span>
                  <div><strong>{r.title}</strong><small>Summarized from customer reviews</small></div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="area-title">
        <div className="container area">
          <div className="area__copy reveal">
            <p className="eyebrow">Service area</p>
            <h2 id="area-title">Based in Arlington. Working across the Metroplex.</h2>
            <p>Our shop sits in the heart of the DFW area, so our trucks reach homes and businesses throughout Tarrant and Dallas counties quickly.</p>
            <ul className="chips">{cities.map((c) => <li key={c}>{c}</li>)}</ul>
            <a className="link-arrow" href={site.mapsUrl} target="_blank" rel="noopener">
              {site.street}, {site.city}, {site.region} {site.zip} <Icon name="arrow" />
            </a>
          </div>
          <div className="area__map reveal">
            <iframe title="Map to The King's Electric" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={site.mapEmbed} />
          </div>
        </div>
        <p className="container footnote">*Based on BuildZoom&apos;s contractor score ranking of Texas licensed contractors.</p>
      </section>

      <CtaBand />
    </>
  );
}
