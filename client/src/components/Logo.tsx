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
      aria-label="UpskillinTech"
    >
      <span className="brand-logo__symbol" aria-hidden="true">U</span>
      <span className="brand-logo__wordmark">UpskillinTech</span>
    </span>
  );

  return href ? (
    <Link href={href} className="brand-logo__link" aria-label="UpskillinTech home">
      {content}
    </Link>
  ) : content;
}
