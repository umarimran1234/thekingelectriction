import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { ApplyButton, CareersForm } from "@/components/LeadForm";
import { CtaBand } from "@/components/CtaBand";

export const metadata: Metadata = {
  title: "Careers | Electrician Jobs in Arlington, TX",
  description:
    "Join The King's Electric in Arlington, Texas. We're hiring apprentice electrical technicians and Texas-licensed journeyman electricians for residential and commercial work.",
};

const perks: { icon: IconName; title: string; text: string }[] = [
  { icon: "grad", title: "Learn on the job", text: "Train alongside experienced lead electricians and a licensed Master Electrician." },
  { icon: "trend", title: "Room to grow", text: "Responsibility grows with your skills — from apprentice to lead and beyond." },
  { icon: "building", title: "Variety of work", text: "Residential and commercial projects keep every week interesting." },
  { icon: "heart", title: "Real team culture", text: "A local, owner-led company where people know your name." },
];

const jobs = [
  {
    title: "Apprentice Electrical Technician",
    text: "Start your electrical career the right way. You'll assist licensed electricians with installing, repairing and maintaining electrical systems, taking on more responsibility as your experience grows.",
    reqs: [
      "Help with installations, alterations, additions and repairs",
      "Work on a wide range of residential and commercial projects",
      "Reliable, safety-minded and eager to learn",
      "Texas apprentice registration (or willingness to obtain)",
    ],
  },
  {
    title: "Journeyman Electrician",
    text: "Lead jobs from start to finish, communicate with customers and help mentor apprentices on our crews.",
    reqs: [
      "Texas State Journeyman Electrical License required",
      "Solid troubleshooting skills and working knowledge of the NEC",
      "Professional, customer-friendly communication",
      "Valid driver's license",
    ],
  },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build your career with a crew that has your back."
        lead="Whether you're just starting out or already licensed, The King's Electric is a place to learn, grow and do work you're proud of."
        crumbs={[{ label: "Careers" }]}
      >
        <a className="btn btn--gold btn--lg" href="#apply">Apply now</a>
      </PageHero>

      <section className="section" aria-labelledby="perks">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">Why work here</p>
            <h2 id="perks">More than a job</h2>
          </header>
          <div className="why__grid why__grid--4">
            {perks.map((p) => (
              <article key={p.title} className="value reveal">
                <span className="value__icon"><Icon name={p.icon} /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="openings">
        <div className="container narrow">
          <header className="section__head reveal">
            <p className="eyebrow">Open positions</p>
            <h2 id="openings">Current openings</h2>
          </header>
          {jobs.map((j) => (
            <article key={j.title} className="job reveal">
              <div className="job__head">
                <div>
                  <h3>{j.title}</h3>
                  <p className="job__meta"><span>Full-time</span><span>Arlington, TX</span><span>Residential &amp; Commercial</span></p>
                </div>
                <ApplyButton position={j.title} />
              </div>
              <p>{j.text}</p>
              <ul className="checks">{j.reqs.map((r) => <li key={r}>{r}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="apply" aria-labelledby="apply-title">
        <div className="container narrow">
          <header className="section__head reveal">
            <p className="eyebrow">Apply</p>
            <h2 id="apply-title">Send us your application</h2>
            <p>Tell us a bit about yourself and we&apos;ll be in touch.</p>
          </header>
          <CareersForm />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
