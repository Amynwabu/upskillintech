import { Link } from "wouter";

export type LogoVariant = "dark-background" | "light-background";

export default function Logo({
  variant,
  href = "/",
  size = "md",
  className = "",
}: {
  variant: LogoVariant;
  href?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const content = (
    <span
      className={`brand-logo brand-logo--${variant} brand-logo--${size} ${className}`.trim()}
    >
      <img
        className="brand-logo__image"
        src="/icon-only.png?v=2"
        alt=""
        aria-hidden="true"
      />
      <span className="brand-logo__wordmark">UpskillinTech</span>
    </span>
  );

  return href ? (
    <Link
      href={href}
      className="brand-logo__link"
      aria-label="UpskillinTech home"
    >
      {content}
    </Link>
  ) : (
    content
  );
}
