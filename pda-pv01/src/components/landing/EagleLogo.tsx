type Props = { size?: number; color?: string };

export function EagleLogo({ size = 40, color = "#C8A84E" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Águia - logo do Programa Águia"
    >
      {/* Circle */}
      <circle cx="40" cy="40" r="38" stroke={color} strokeWidth="2.5" fill="none" />
      {/* Abstract A / eagle wings — geometric mark */}
      {/* Left wing */}
      <path d="M12 52 Q22 28 40 38" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Right wing */}
      <path d="M68 52 Q58 28 40 38" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Body / A stem */}
      <path d="M40 22 L40 52" stroke={color} strokeWidth="3" strokeLinecap="round" />
      {/* A crossbar */}
      <path d="M31 43 L49 43" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {/* Head dot */}
      <circle cx="40" cy="19" r="3" fill={color} />
    </svg>
  );
}
