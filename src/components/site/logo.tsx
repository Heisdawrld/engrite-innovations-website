type LogoProps = {
  variant?: "nav" | "footer" | "compact";
  className?: string;
};

export function Logo({ variant = "nav", className = "" }: LogoProps) {
  const strokeGreen = variant === "footer" ? "#7fd89a" : "#3a7c45";
  const strokeNavy = variant === "footer" ? "#7fd89a" : "#1c2d6e";
  const baseLine = variant === "footer" ? "#7fd89a" : "#1c2d6e";

  return (
    <svg
      width={variant === "compact" ? 32 : 46}
      height={variant === "compact" ? 29 : 42}
      viewBox="0 0 92 84"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <rect x="5" y="30" width="19" height="50" stroke={strokeGreen} strokeWidth="2.2" fill="none" />
      <rect x="37" y="10" width="19" height="70" stroke={strokeNavy} strokeWidth="2.2" fill="none" />
      <line x1="37" y1="10" x2="24" y2="30" stroke={strokeGreen} strokeWidth="2.2" />
      <rect x="56" y="24" width="14" height="56" stroke={strokeGreen} strokeWidth="2.2" fill="none" />
      <line x1="56" y1="24" x2="70" y2="38" stroke={strokeNavy} strokeWidth="2.2" />
      <rect x="70" y="38" width="15" height="42" stroke={strokeNavy} strokeWidth="2.2" fill="none" />
      <line x1="2" y1="80" x2="88" y2="80" stroke={baseLine} strokeWidth="1.8" />
    </svg>
  );
}
