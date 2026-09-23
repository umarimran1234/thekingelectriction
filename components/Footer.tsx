import Link from "next/link";
import Image from "next/image";
import { Icon } from "./Icon";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Link className="brand brand--light" href="/">
              <Image src="/logo.svg" alt="" width={44} height={44} />
              <span className="brand__text">
                <span className="brand__the">The</span> King&apos;s Electric
              </span>
            </Link>
            <p>
              Locally owned, licensed electrical contractor in Arlington, Texas — powering homes and businesses
              across the DFW Metroplex with craftsmanship fit for a king.
            </p>
            <a className="footer__social" href={site.facebook} target="_blank" rel="noopener" aria-label="The King's Electric on Facebook">
              <Icon name="facebook" /> Follow us on Facebook
            </a>
          </div>
          <div>
            <h3 className="footer__title">Services</h3>
            <ul className="footer__links">
              <li><Link href="/residential">Residential</Link></li>
              <li><Link href="/commercial">Commercial</Link></li>
              <li><Link href="/residential#services">Repairs &amp; troubleshooting</Link></li>
              <li><Link href="/residential#services">Panel upgrades</Link></li>
              <li><Link href="/commercial#services">Lighting &amp; infrastructure</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer__title">Company</h3>
            <ul className="footer__links">
              <li><Link href="/team">The Team</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="footer__title">Get in touch</h3>
            <ul className="footer__contact">
              <li><Icon name="phone" /><a href={site.phoneHref}>{site.phone}</a></li>
              <li>
                <Icon name="pin" />
                <a href={site.mapsUrl} target="_blank" rel="noopener">
                  {site.street}<br />{site.city}, {site.region} {site.zip}
                </a>
              </li>
              <li><Icon name="clock" /><span>{site.hours}</span></li>
            </ul>
          </div>
        </div>
        <div className="container footer__bottom">
          <p>© {new Date().getFullYear()} {site.legalName} All rights reserved.</p>
          <p>Licensed &amp; insured · Texas</p>
        </div>
      </footer>

      <a className="call-fab" href={site.phoneHref} aria-label={`Call ${site.name} at ${site.phone}`}>
        <Icon name="phone" />
        <span>Call now</span>
      </a>
    </>
  );
}
