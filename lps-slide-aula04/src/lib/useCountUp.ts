import { useEffect, useRef, useState } from "react";
import { useSlideActive } from "@/components/SlideFrame";
import { useSlideVariants } from "@/lib/motion";

/**
 * Conta de 0 até `to` quando o slide entra, e volta a 0 quando ele sai
 * (assim o ensaio indo e voltando sempre mostra a contagem de novo).
 *
 * Vive no lib porque dois slides usam: o contador dos R$ 25.000 (slide 5)
 * e o resultado do caso (slide 32).
 */
export function useCountUp(to: number, ms = 1200) {
  const active = useSlideActive();
  const { reduce } = useSlideVariants();
  const [v, setV] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (!active) {
      setV(0);
      return;
    }
    if (reduce) {
      setV(to);
      return;
    }
    let start = 0;
    const step = (t: number) => {
      if (!start) start = t;
      const p = Math.min((t - start) / ms, 1);
      // easeOutCubic: chega rápido e assenta, como um número que "para".
      setV(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active, reduce, to, ms]);

  return v;
}
