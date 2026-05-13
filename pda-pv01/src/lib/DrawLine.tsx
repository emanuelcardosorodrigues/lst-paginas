import { useRef, useEffect, useState } from "react";

type DrawLineProps = {
  direction?: "right" | "down";
  color?: string;
  thickness?: number;
  length?: string;
  duration?: number;
  delay?: number;
  className?: string;
};

export function DrawLine({
  direction = "right",
  color = "#C8A84E",
  thickness = 2,
  length = "120px",
  duration = 800,
  delay = 0,
  className = "",
}: DrawLineProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setDrawn(true); io.disconnect(); } },
      { rootMargin: "-60px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const isHorizontal = direction === "right";

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "block",
        backgroundColor: color,
        ...(isHorizontal
          ? {
              height: thickness,
              width: length,
              transform: drawn ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left center",
            }
          : {
              width: thickness,
              height: length,
              transform: drawn ? "scaleY(1)" : "scaleY(0)",
              transformOrigin: "top center",
            }),
        transition: `transform ${duration}ms cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    />
  );
}
