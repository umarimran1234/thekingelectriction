"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navHeight, setNavHeight] = useState<number>();

  // Close menus on navigation
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const onResize = () => window.innerWidth > 960 && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setServicesOpen(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    document.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
  }, [open]);

  const toggleMenu = () => {
    if (!open && headerRef.current) {
      setNavHeight(window.innerHeight - headerRef.current.getBoundingClientRect().bottom);
    }
    setOpen((o) => !o);
  };

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const current = (href: string) => (isActive(href) ? { "aria-current": "page" as const, "data-nav-active": "" } : {});

  return (
    <>
      <div className="topbar">
        <div className="container topbar__inner">
          <span className="topbar__item">
            <Icon name="pin" />
            {site.city}, {site.region} · Serving {site.area}
          </span>
          <span className="topbar__item topbar__hours">
            <Icon name="clock" />
            {site.hours}
          </span>
        </div>
      </div>
      <header ref={headerRef} className={`header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container header__inner">
          <Link className="brand" href="/" aria-label={`${site.name} — home`}>
            <Image src="/logo.svg" alt="" width={44} height={44} priority />
            <span className="brand__text">
              <span className="brand__the">The</span> King&apos;s Electric
            </span>
          </Link>

          <nav
            className={`nav${open ? " is-open" : ""}`}
            id="site-nav"
            aria-label="Main"
            style={navHeight ? ({ "--nav-h": `${navHeight}px` } as React.CSSProperties) : undefined}
          >
            <ul className="nav__list">
              {nav.map((item) =>
                "children" in item ? (
                  <li
                    key={item.label}
                    className="nav__group"
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false);
                    }}
                  >
                    <button
                      className="nav__toggle"
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      onClick={() => setServicesOpen((s) => !s)}
                      {...(item.children.some((c) => isActive(c.href)) ? { "data-nav-active": "" } : {})}
                    >
                      {item.label} <Icon name="chevron" className="i--sm" />
                    </button>
                    <ul className="nav__menu" id="services-menu">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link href={c.href} {...current(c.href)}>
                            <strong>{c.label}</strong>
                            <span>{c.sub}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} {...current(item.href)}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <a className="btn btn--gold nav__cta-mobile" href={site.phoneHref}>
              Call {site.phone}
            </a>
          </nav>

          <div className="header__actions">
            <a className="header__phone" href={site.phoneHref}>
              <Icon name="phone" />
              <span>
                <small>Call us</small>
                {site.phone}
              </span>
            </a>
            <Link className="btn btn--gold btn--sm" href="/contact">
              Free Estimate
            </Link>
            <button
              className="burger"
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="site-nav"
              onClick={toggleMenu}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
