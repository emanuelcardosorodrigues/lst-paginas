import React, { useEffect, useState, useRef } from "react";

export const checkoutUrl = "https://pay.hotmart.com/K105045449J?off=tanuaurl&split=12&offDiscount=MAPAOCULTO&bid=1776377238546";
export const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export const img = (path: string) => `${base}${path}`;

export function imgSet(path: string, widths: number[]): string {
  const dot = path.lastIndexOf(".");
  const base_path = path.slice(0, dot);
  const ext = path.slice(dot);
  return widths.map((w) => `${base_path}-${w}${ext} ${w}w`).join(", ") + `, ${path} 9999w`;
}

const DEFAULT_IO_OPTIONS = { threshold: 0.1 };

export function useIntersectionObserver(options = DEFAULT_IO_OPTIONS) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsIntersecting(true);
        observer.disconnect();
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isIntersecting] as const;
}

export function useCountUp(end: number, start = 0, duration = 2000, startAnimation = true) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!startAnimation) return;
    let startTime: number | null = null;
    let rafId: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) rafId = window.requestAnimationFrame(step);
    };
    rafId = window.requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [end, start, duration, startAnimation]);

  return count;
}

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function pushGtmClick(label: string, isPrimary: boolean) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "cta_click",
    cta_label: label,
    cta_type: isPrimary ? "primary" : "secondary",
    page_slug: "plo-pv01",
  });
}

export function CtaButton({ children, primary = true, className = "", ...props }: any) {
  const { onClick, href = checkoutUrl, ...rest } = props;
  const label = typeof children === "string" ? children : "CTA";
  const handleClick = () => {
    pushGtmClick(label, primary);
    if (onClick) onClick();
  };

  if (primary) {
    return (
      <a
        href={href}
        onClick={handleClick}
        data-gtm-click="cta-primary"
        data-gtm-label={label}
        className={`block w-full py-4 px-8 bg-[#4ADE80] hover:bg-[#22C55E] text-[#080C09] font-bold text-[0.9375rem] tracking-[0.04em] uppercase text-center rounded-lg border-none shadow-[0_0_20px_rgba(74,222,128,0.25)] transition-all duration-200 cursor-pointer animate-cta-glow ${className}`}
        aria-label={label}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <a
      href={href}
      onClick={handleClick}
      data-gtm-click="cta-secondary"
      data-gtm-label={label}
      className={`block w-full py-3.5 bg-transparent hover:bg-[rgba(74,222,128,0.08)] text-[#4ADE80] font-semibold text-[0.9rem] text-center rounded-lg border border-[rgba(74,222,128,0.35)] transition-all duration-200 cursor-pointer ${className}`}
      aria-label={label}
      {...rest}
    >
      {children}
    </a>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <span className="block w-8 h-[1px] bg-[rgba(74,222,128,0.5)] mb-2.5"></span>
      <span className="font-medium text-[0.7rem] tracking-[0.18em] uppercase text-[#4ADE80]">
        {children}
      </span>
    </div>
  );
}
