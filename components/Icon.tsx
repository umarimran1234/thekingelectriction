export type IconName =
  | "phone" | "pin" | "clock" | "chevron" | "arrow" | "check" | "bolt" | "home" | "building"
  | "shield" | "tag" | "star" | "users" | "sparkle" | "plug" | "bulb" | "panel" | "fan"
  | "wrench" | "hammer" | "car" | "store" | "utensils" | "apartment" | "briefcase"
  | "parking" | "grad" | "heart" | "trend" | "facebook" | "mail";

export function Icon({ name, className = "" }: { name: IconName; className?: string }) {
  return (
    <svg className={`i ${className}`.trim()} aria-hidden="true">
      <use href={`/icons.svg#${name}`} />
    </svg>
  );
}

export function Stars() {
  return (
    <span className="stars" role="img" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((n) => (
        <Icon key={n} name="star" />
      ))}
    </span>
  );
}
