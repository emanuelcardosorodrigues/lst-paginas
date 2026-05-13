import { useRef, useEffect, useState, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** base delay before first word (ms) */
  baseDelay?: number;
  /** delay between each word (ms) */
  stagger?: number;
  /** If true, treats the entire children as one fade-in block */
  block?: boolean;
};

/**
 * Splits text children into words and reveals them with a stagger.
 * Non-text children (React elements) are treated as a single block.
 */
export function Reveal({ children, className = "", baseDelay = 0, stagger = 60, block = false }: RevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) { setVisible(true); io.disconnect(); }
      },
      { rootMargin: "-60px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (block || typeof children !== "string") {
    return (
      <span
        ref={ref}
        className={className}
        style={{
          display: "inline-block",
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(12px)",
          transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${baseDelay}ms`,
        }}
      >
        {children}
      </span>
    );
  }

  const words = (children as string).split(" ");

  return (
    <span ref={ref} className={className} aria-label={children as string}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(10px)",
            transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * stagger}ms`,
            marginRight: i < words.length - 1 ? "0.28em" : 0,
          }}
        >
          {word}
        </span>
      ))}
    </span>
  );
}
