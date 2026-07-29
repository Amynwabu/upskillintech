import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";

type GoogleSignInButtonProps = {
  className?: string;
  label?: string;
  onClick?: () => void;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "secondary" | "ghost";
};

export default function GoogleSignInButton({
  className,
  label = "Sign in with Google",
  onClick,
  size = "default",
  variant = "outline",
}: GoogleSignInButtonProps) {
  const handleClick = () => {
    onClick?.();
    window.location.href = getLoginUrl();
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      <span
        aria-hidden="true"
        className="flex h-5 w-5 items-center justify-center rounded-full bg-[#07100B] text-sm font-bold text-[#4285F4]"
      >
        G
      </span>
      {label}
    </Button>
  );
}
