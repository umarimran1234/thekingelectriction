import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { ServiceGrid, type Service } from "@/components/ServiceGrid";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Residential Electrician in Arlington, TX",
  description:
    "Licensed residential electricians for Arlington and DFW homes: troubleshooting and repairs, aluminum wiring upgrades, dedicated circuits, ceiling fans, lighting, panel upgrades, remodels and new construction.",
};

const services: Service[] = [
  { icon: "wrench", title: "Troubleshooting & repairs", text: "Dead outlets, tripping breakers, flickering lights, faulty switches and circuit problems — diagnosed quickly and fixed right." },
  { icon: "shield", title: "Aluminum wiring upgrades", text: "Professional pigtailing and remediation of outdated aluminum wiring to bring older homes up to modern safety standards." },
  { icon: "plug", title: "Dedicated circuits & outlets", text: "New circuits for appliances, workshops and home offices, plus weather-rated outdoor outlets." },
  { icon: "fan", title: "Ceiling fans", text: "New fan installs and replacements, including new boxes and switching where needed." },
  { icon: "bulb", title: "Lighting & fixtures", text: "Chandeliers, recessed lighting, under-cabinet and exterior lighting installed cleanly and securely." },
  { icon: "panel", title: "Panels & service upgrades", text: "Breaker panel replacements and capacity upgrades so your home can handle today's electrical demand." },
  { icon: "hammer", title: "Remodels", text: "Kitchen, bath and whole-home remodel wiring, coordinated with your contractor and timeline." },
  { icon: "home", title: "New construction", text: "Complete rough-in through trim-out for new homes and additions across the DFW area." },
  {
    icon: "sparkle",
    title: "Something else?",
    text: <>Don&apos;t see your project listed? <Link href="/contact?type=residential">Tell us about it</Link> — chances are we can help.</>,
  },
];

const signs = [
  "Breakers that trip again and again",
  "Lights that flicker or dim when appliances run",
  "Warm, discolored or buzzing outlets and switches",
  "A burning smell with no obvious source",
  "Aluminum wiring in an older home",
  "Not enough outlets — and too many extension cords",
];

const faqs = [
  { q: "Do you give upfront pricing?", a: "Yes. After we assess the job, you'll get a clear price before any work begins — no surprise charges on the invoice." },
  { q: "Is aluminum wiring really a problem?", a: "Aluminum branch wiring, common in some older homes, can loosen at connections over time and overheat. Pigtailing with approved connectors is a proven way to make those connections safer. We'll inspect and recommend the right fix." },
  { q: "Are your electricians licensed?", a: "Our work is performed by Texas-licensed electricians and backed by a licensed Master Electrician." },
  { q: "What areas do you serve?", a: "We're based in Arlington and serve homes across the Dallas–Fort Worth Metroplex. Not sure if you're in range? Just call." },
  { q: "What are your hours?", a: `Our office is open ${site.hours}. Leave a message or send a request anytime and we'll get back to you.` },
];

export default function ResidentialPage() {
  return (
    <>
      <PageHero
        eyebrow="Residential services"
        title="A safer, brighter home — wired by pros you can trust."
        lead="Your home's electrical system should be the last thing you worry about. We diagnose problems fast, fix them properly, and explain everything in plain English."
        crumbs={[{ label: "Services" }, { label: "Residential" }]}
      >
        <Link className="btn btn--gold btn--lg" href="/contact?type=residential">Book a Service Call</Link>
        <a className="btn btn--ghost btn--lg" href={site.phoneHref}><Icon name="phone" />{site.phone}</a>
      </PageHero>

      <section className="section" id="services" aria-labelledby="res-services">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">What we handle</p>
            <h2 id="res-services">Home electrical services</h2>
            <p>From quick fixes to whole-home projects, every job is done to code by a licensed electrician.</p>
          </header>
          <ServiceGrid items={services} />
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="res-signs">
        <div className="container two-col">
          <div className="reveal">
            <p className="eyebrow">Know the signs</p>
            <h2 id="res-signs">When to call an electrician</h2>
            <p>Electrical issues rarely fix themselves. If you notice any of these, give us a call before a small problem becomes a dangerous one.</p>
            <a className="btn btn--navy" href={site.phoneHref}>Call {site.phone}</a>
          </div>
          <ul className="signs reveal">
            {signs.map((s) => <li key={s}><Icon name="bolt" />{s}</li>)}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="res-faq">
        <div className="container narrow">
          <header className="section__head reveal">
            <p className="eyebrow">FAQ</p>
            <h2 id="res-faq">Homeowner questions, answered</h2>
          </header>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q} className="reveal">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
