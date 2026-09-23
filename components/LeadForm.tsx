"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Icon } from "./Icon";
import { fallbackEmail, formEndpoint, site } from "@/lib/site";

type Status = { msg: string; ok: boolean } | null;

/** Shared validation + submission for the contact and careers forms. */
function useLeadForm(subjectFor: (data: Record<string, string>) => string) {
  const [status, setStatus] = useState<Status>(null);
  const [invalid, setInvalid] = useState<Set<string>>(new Set());
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fields = [...form.querySelectorAll<HTMLInputElement>("input, select, textarea")];
    const bad = fields.filter((f) => !f.checkValidity());
    setInvalid(new Set(bad.map((f) => f.name)));
    if (bad.length) {
      setStatus({ msg: "Please fill in the highlighted fields.", ok: false });
      bad[0].focus();
      return;
    }

    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const subject = subjectFor(data);

    if (formEndpoint) {
      setSending(true);
      try {
        const res = await fetch(formEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ _subject: subject, ...data }),
        });
        if (!res.ok) throw new Error(res.statusText);
        form.reset();
        setStatus({ msg: "Thank you! We received your message and will be in touch soon.", ok: true });
      } catch {
        setStatus({ msg: `Sorry, something went wrong. Please call us at ${site.phone}.`, ok: false });
      } finally {
        setSending(false);
      }
      return;
    }

    if (fallbackEmail) {
      const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
      window.location.href = `mailto:${fallbackEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus({ msg: "Opening your email app to send your message…", ok: true });
      return;
    }

    setStatus({ msg: `Online requests are coming soon — please call us at ${site.phone}.`, ok: false });
  };

  const fieldClass = (name: string) => `field${invalid.has(name) ? " is-invalid" : ""}`;
  const clear = (e: FormEvent<HTMLFormElement>) => {
    const name = (e.target as HTMLInputElement).name;
    if (invalid.has(name)) setInvalid((s) => new Set([...s].filter((n) => n !== name)));
  };

  const statusEl = (
    <p className={`form__status${status ? (status.ok ? " is-ok" : " is-error") : ""}`} role="status" aria-live="polite">
      {status?.msg}
    </p>
  );

  return { onSubmit, fieldClass, clear, sending, statusEl };
}

export function ContactForm() {
  const [type, setType] = useState("residential");
  const { onSubmit, fieldClass, clear, sending, statusEl } = useLeadForm(
    (d) => `Estimate request (${d.type}) — ${d.name}`
  );

  // Pre-select service type from ?type=commercial links
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("type");
    if (t === "residential" || t === "commercial") setType(t);
  }, []);

  return (
    <form className="form card" noValidate onSubmit={onSubmit} onInput={clear}>
      <h2 className="form__title">Request a free estimate</h2>
      <fieldset className="segmented">
        <legend>Type of service *</legend>
        {(["residential", "commercial"] as const).map((t) => (
          <label key={t}>
            <input type="radio" name="type" value={t} checked={type === t} onChange={() => setType(t)} />
            <span>
              <Icon name={t === "residential" ? "home" : "building"} />
              {t === "residential" ? "Residential" : "Commercial"}
            </span>
          </label>
        ))}
      </fieldset>
      <div className="form__row">
        <label className={fieldClass("name")}><span>Full name *</span><input name="name" autoComplete="name" required /></label>
        <label className={fieldClass("phone")}><span>Phone *</span><input name="phone" type="tel" autoComplete="tel" required /></label>
      </div>
      <div className="form__row">
        <label className={fieldClass("email")}><span>Email</span><input name="email" type="email" autoComplete="email" /></label>
        <label className={fieldClass("zip")}><span>ZIP code</span><input name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} /></label>
      </div>
      <label className={fieldClass("message")}>
        <span>How can we help? *</span>
        <textarea name="message" rows={5} required placeholder="Describe the problem or project — e.g. breaker keeps tripping, new lighting for a store, remodel wiring…" />
      </label>
      <button className="btn btn--gold btn--lg btn--block" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send request"} <Icon name="arrow" />
      </button>
      <p className="form__note">
        For anything urgent, please call <a href={site.phoneHref}>{site.phone}</a>.
      </p>
      {statusEl}
    </form>
  );
}

export const positions = ["Apprentice Electrical Technician", "Journeyman Electrician"] as const;
const SELECT_EVENT = "select-position";

/** "Apply" button on a job card: scrolls to the form and pre-selects the position. */
export function ApplyButton({ position }: { position: string }) {
  return (
    <a
      className="btn btn--gold btn--sm"
      href="#apply"
      onClick={() => window.dispatchEvent(new CustomEvent(SELECT_EVENT, { detail: position }))}
    >
      Apply
    </a>
  );
}

export function CareersForm() {
  const [position, setPosition] = useState("");
  const { onSubmit, fieldClass, clear, sending, statusEl } = useLeadForm(
    (d) => `Job application: ${d.position} — ${d.name}`
  );

  useEffect(() => {
    const onSelect = (e: Event) => setPosition((e as CustomEvent<string>).detail);
    window.addEventListener(SELECT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_EVENT, onSelect);
  }, []);

  return (
    <form className="form card reveal" noValidate onSubmit={onSubmit} onInput={clear}>
      <div className="form__row">
        <label className={fieldClass("name")}><span>Full name *</span><input name="name" autoComplete="name" required /></label>
        <label className={fieldClass("phone")}><span>Phone *</span><input name="phone" type="tel" autoComplete="tel" required /></label>
      </div>
      <div className="form__row">
        <label className={fieldClass("email")}><span>Email *</span><input name="email" type="email" autoComplete="email" required /></label>
        <label className={fieldClass("position")}>
          <span>Position *</span>
          <select name="position" required value={position} onChange={(e) => setPosition(e.target.value)}>
            <option value="">Select a position</option>
            {positions.map((p) => <option key={p}>{p}</option>)}
            <option>Other / General application</option>
          </select>
        </label>
      </div>
      <label className={fieldClass("message")}>
        <span>Experience &amp; licenses</span>
        <textarea name="message" rows={5} placeholder="Years of experience, license type and number, the kind of work you've done…" />
      </label>
      <button className="btn btn--gold btn--lg" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Submit application"}
      </button>
      {statusEl}
    </form>
  );
}
