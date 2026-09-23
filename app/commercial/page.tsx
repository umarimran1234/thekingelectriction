import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { ServiceGrid, type Service } from "@/components/ServiceGrid";
import { CtaBand } from "@/components/CtaBand";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Commercial Electrician in Arlington & DFW",
  description:
    "Commercial electrical contractor for restaurants, retail stores, apartment complexes, offices and parking lots in Arlington and the DFW Metroplex. Lighting, infrastructure, build-outs and maintenance.",
};

const industries: { icon: IconName; title: string; text: string }[] = [
  { icon: "utensils", title: "Restaurants", text: "Kitchen circuits, equipment hookups, dining & exterior lighting" },
  { icon: "store", title: "Retail stores", text: "Display & sales-floor lighting, signage, POS power" },
  { icon: "apartment", title: "Apartment complexes", text: "Unit turns, common areas, meters & ongoing maintenance" },
  { icon: "briefcase", title: "Offices", text: "Tenant finish-outs, workstations, lighting upgrades" },
  { icon: "parking", title: "Parking lots", text: "Pole & area lighting repair, retrofits and new installs" },
  { icon: "building", title: "& much more", text: "Have a different facility? Let's talk about it." },
];

const services: Service[] = [
  { icon: "bulb", title: "Retail lighting", text: "Lighting design support, installation and energy-efficient LED retrofits that make products and spaces shine." },
  { icon: "panel", title: "Electrical infrastructure", text: "Service entrances, distribution, panels and feeders sized and installed for your building's load." },
  { icon: "hammer", title: "Build-outs & remodels", text: "Tenant finish-outs and renovations coordinated with your GC, inspections and opening date." },
  { icon: "building", title: "New construction", text: "Full electrical scope for new commercial spaces, from plan review to final inspection." },
  { icon: "wrench", title: "Service & maintenance", text: "Responsive service calls and scheduled maintenance to prevent costly surprises." },
  { icon: "car", title: "Exterior & site lighting", text: "Parking lot, walkway and building lighting that keeps your property safe after dark." },
];

export default function CommercialPage() {
  return (
    <>
      <PageHero
        variant="biz"
        eyebrow="Commercial services"
        title="Power that keeps your business open."
        lead="Downtime costs money. Our commercial team delivers dependable electrical work on schedule — with minimal disruption to your staff and customers."
        crumbs={[{ label: "Services" }, { label: "Commercial" }]}
      >
        <Link className="btn btn--gold btn--lg" href="/contact?type=commercial">Request a Bid</Link>
        <a className="btn btn--ghost btn--lg" href={site.phoneHref}><Icon name="phone" />{site.phone}</a>
      </PageHero>

      <section className="section" aria-labelledby="industries">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">Who we serve</p>
            <h2 id="industries">Built for the way your business works</h2>
          </header>
          <ul className="industry-grid">
            {industries.map((i) => (
              <li key={i.title} className="industry reveal">
                <Icon name={i.icon} />
                <strong>{i.title}</strong>
                <span>{i.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--navy" id="services" aria-labelledby="biz-services">
        <div className="container">
          <header className="section__head section__head--light reveal">
            <p className="eyebrow eyebrow--light">Capabilities</p>
            <h2 id="biz-services">Commercial electrical services</h2>
          </header>
          <ServiceGrid items={services} dark />
        </div>
      </section>

      <section className="section" aria-labelledby="biz-why">
        <div className="container two-col">
          <div className="reveal">
            <p className="eyebrow">The commercial difference</p>
            <h2 id="biz-why">A partner, not just a contractor</h2>
            <p>Our commercial project manager is your single point of contact — from bid to walkthrough. You&apos;ll always know where your project stands.</p>
          </div>
          <ul className="checks checks--lg reveal">
            <li>Dedicated commercial project management</li>
            <li>Work scheduled around your business hours</li>
            <li>Clear bids with no hidden costs</li>
            <li>Licensed crews that pass inspection the first time</li>
            <li>Clean, safe and respectful job sites</li>
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
