import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { team, type Member } from "@/lib/team";

export const metadata: Metadata = {
  title: "Meet the Team",
  description: "Meet the licensed electricians, project managers and leadership behind The King's Electric in Arlington, Texas.",
};

function MemberCard({ m }: { m: Member }) {
  const initials = m.name.split(" ").slice(0, 2).map((w) => w[0]).join("");
  return (
    <article className={`member${m.group === "leadership" ? " member--lead" : ""} reveal`}>
      <div className="member__photo" data-initials={initials}>
        {m.photo && (
          <Image src={`/team/${m.slug}.jpg`} alt={`${m.name}, ${m.role}`} fill sizes="(max-width: 640px) 50vw, 25vw" />
        )}
      </div>
      <div className="member__body">
        <h3>{m.name}</h3>
        <p className="member__role">{m.role}</p>
        {m.bio && <p>{m.bio}</p>}
      </div>
    </article>
  );
}

const groups = (g: Member["group"]) => team.filter((m) => m.group === g).map((m) => <MemberCard key={m.slug} m={m} />);

export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="The team"
        title="The people behind the power."
        lead="Skilled, licensed and genuinely proud of their work. When you call The King's Electric, this is who shows up."
        crumbs={[{ label: "The Team" }]}
      />

      <section className="section" aria-labelledby="leaders">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">Leadership</p>
            <h2 id="leaders">Owner-led, hands-on</h2>
          </header>
          <div className="team-grid team-grid--lead">{groups("leadership")}</div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="pms">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">Project management</p>
            <h2 id="pms">Your single point of contact</h2>
            <p>Dedicated project managers for residential and commercial work keep your job organized, on schedule and communicated clearly.</p>
          </header>
          <div className="team-grid team-grid--pm">{groups("pm")}</div>
        </div>
      </section>

      <section className="section" aria-labelledby="field">
        <div className="container">
          <header className="section__head reveal">
            <p className="eyebrow">In the field</p>
            <h2 id="field">Our electricians</h2>
            <p>Skilled tradespeople who treat your home or business like their own.</p>
          </header>
          <div className="team-grid">{groups("field")}</div>
        </div>
      </section>

      <section className="section section--tint" aria-labelledby="join">
        <div className="container join reveal">
          <div>
            <p className="eyebrow">Now hiring</p>
            <h2 id="join">Want to wear the crown?</h2>
            <p>We&apos;re always looking for motivated apprentices and licensed journeymen who take pride in their craft.</p>
          </div>
          <Link className="btn btn--navy btn--lg" href="/careers">View open positions <Icon name="arrow" /></Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
