import { useRef, type ReactNode, type CSSProperties } from "react";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  href?: string;
  onClick?: () => void;
  "data-gtm-id"?: string;
  "data-gtm-label"?: string;
};

export function MagneticButton({ children, className = "", style, href, onClick, ...rest }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia("(hover: none)").matches) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.15;
    const dy = (e.clientY - cy) * 0.15;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate(0,0)";
    el.style.transition = "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)";
  };

  const handleEnter = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.1s linear";
  };

  const shared = {
    ref,
    className,
    style: { ...style, display: "inline-block" },
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onMouseEnter: handleEnter,
    ...rest,
  };

  if (href) {
    return <a href={href} {...shared}>{children}</a>;
  }
  return <button type="button" onClick={onClick} {...(shared as React.ButtonHTMLAttributes<HTMLButtonElement>)}>{children}</button>;
}
