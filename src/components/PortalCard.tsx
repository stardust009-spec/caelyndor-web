import Link from "next/link";

type PortalCardProps = {
  title: string;
  text: string;
  href: string;
};

export function PortalCard({ title, text, href }: PortalCardProps) {
  return (
    <Link className="portal-card" href={href}>
      <span className="portal-card__sigil" aria-hidden="true" />
      <span className="portal-card__title">{title}</span>
      <span className="portal-card__text">{text}</span>
    </Link>
  );
}
