import { Icon, type IconName } from "./Icon";

export type Service = { icon: IconName; title: string; text: React.ReactNode };

export function ServiceGrid({ items, dark }: { items: Service[]; dark?: boolean }) {
  return (
    <div className={`service-grid${dark ? " service-grid--dark" : ""}`}>
      {items.map((s) => (
        <article key={s.title} className="service reveal">
          <span className="service__icon"><Icon name={s.icon} /></span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </article>
      ))}
    </div>
  );
}
