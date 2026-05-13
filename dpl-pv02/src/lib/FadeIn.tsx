import { useRef, useEffect, useState, type ReactNode } from "react";

type FadeInProps = {
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  scale?: boolean;
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
};

export function FadeIn({
  className = "",
  delay = 0,
  direction = "up",
  scale = false,
  children,
  as: Tag = "div",
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { rootMargin: "-80px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const getTransform = () => {
    if (visible) return "none";
    if (scale) return "scale(0.95)";
    if (direction === "up") return "translateY(20px)";
    if (direction === "left") return "translateX(-30px)";
    if (direction === "right") return "translateX(30px)";
    return "none";
  };

  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </Tag>
  );
}
