import { useEffect, useRef, useState } from "react";

const VTURB_PLAYER_ID = "6a14d534b28e4eb31f823863";
const VTURB_SCRIPT_SRC = `https://scripts.converteai.net/37201b92-a048-47c6-8ba2-e601346d2802/players/${VTURB_PLAYER_ID}/v4/player.js`;

export function VturbPlayer() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Só revela o container quando perto da viewport — evita baixar o player no boot
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  // Injeta o script do player apenas após o container ficar visível
  useEffect(() => {
    if (!visible) return;
    const scriptId = `vturb-script-${VTURB_PLAYER_ID}`;
    if (document.getElementById(scriptId)) return;
    const s = document.createElement("script");
    s.id = scriptId;
    s.src = VTURB_SCRIPT_SRC;
    s.async = true;
    document.head.appendChild(s);
  }, [visible]);

  return (
    <div ref={ref} className="w-full mx-auto" style={{ minHeight: 220 }}>
      {visible && (
        <div
          dangerouslySetInnerHTML={{
            __html: `<vturb-smartplayer id="vid-${VTURB_PLAYER_ID}" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>`,
          }}
        />
      )}
    </div>
  );
}
