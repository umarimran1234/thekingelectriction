import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/LeadForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Free Estimate",
  description:
    "Contact The King's Electric in Arlington, TX for a free estimate. Call (817) 308-6444 or send a request online. Serving homes and businesses across DFW.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's talk about your project."
        lead="Call us during business hours or send a request anytime. We'll get back to you quickly with next steps and honest pricing."
        crumbs={[{ label: "Contact" }]}
      />

      <section className="section section--overlap" aria-label="Contact options">
        <div className="container contact">
          <aside className="contact__info">
            <a className="info-card info-card--gold" href={site.phoneHref}>
              <span className="info-card__icon"><Icon name="phone" /></span>
              <div><small>Call us</small><strong>{site.phone}</strong></div>
            </a>
            <a className="info-card" href={site.mapsUrl} target="_blank" rel="noopener">
              <span className="info-card__icon"><Icon name="pin" /></span>
              <div><small>Visit us</small><strong>{site.street}</strong><span>{site.city}, {site.region} {site.zip}</span></div>
            </a>
            <div className="info-card">
              <span className="info-card__icon"><Icon name="clock" /></span>
              <div><small>Office hours</small><strong>Monday – Friday</strong><span>7:30 AM – 4:30 PM</span></div>
            </div>
            <a className="info-card" href={site.facebook} target="_blank" rel="noopener">
              <span className="info-card__icon"><Icon name="facebook" /></span>
              <div><small>Follow us</small><strong>Facebook</strong><span>@thekingselectric</span></div>
            </a>
          </aside>
          <ContactForm />
        </div>
      </section>

      <section className="section section--flush" aria-label="Map">
        <div className="map-wide">
          <iframe title="Map to The King's Electric" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={site.mapEmbed.replace("z=12", "z=13")} />
        </div>
      </section>
    </>
  );
}
