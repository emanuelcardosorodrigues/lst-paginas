import { ReactNode } from "react";

export function SectionLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`font-body font-medium text-[13px] tracking-[0.12em] uppercase text-gold mb-4 ${className}`}
    >
      {children}
    </div>
  );
}
