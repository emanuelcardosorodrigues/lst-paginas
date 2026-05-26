import { useEffect } from "react";

const VTURB_PLAYER_ID = "6a14d534b28e4eb31f823863";
const VTURB_SCRIPT_SRC = `https://scripts.converteai.net/37201b92-a048-47c6-8ba2-e601346d2802/players/${VTURB_PLAYER_ID}/v4/player.js`;

export function VturbPlayer() {
  useEffect(() => {
    const scriptId = `vturb-script-${VTURB_PLAYER_ID}`;
    if (document.getElementById(scriptId)) return;
    const s = document.createElement("script");
    s.id = scriptId;
    s.src = VTURB_SCRIPT_SRC;
    s.async = true;
    document.head.appendChild(s);
  }, []);

  return (
    <div
      className="w-full mx-auto"
      dangerouslySetInnerHTML={{
        __html: `<vturb-smartplayer id="vid-${VTURB_PLAYER_ID}" style="display: block; margin: 0 auto; width: 100%; max-width: 400px;"></vturb-smartplayer>`,
      }}
    />
  );
}
