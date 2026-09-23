import Link from "next/link";
import { PageHero } from "@/components/PageHero";

export default function NotFound() {
  return (
    <PageHero
      variant="center"
      eyebrow="Error 404"
      title="Looks like this circuit is dead."
      lead="The page you're looking for doesn't exist or has moved."
    >
      <Link className="btn btn--gold btn--lg" href="/">Back to home</Link>
      <Link className="btn btn--ghost btn--lg" href="/contact">Contact us</Link>
    </PageHero>
  );
}
