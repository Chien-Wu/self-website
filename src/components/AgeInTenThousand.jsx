// src/components/AgeInTenThousand.jsx
import React, { useEffect, useRef, useState } from "react";
import "./AgeInTenThousand.css";

export default function AgeInTenThousand() {
  const birthMs = new Date(2005, 7, 14, 22, 10, 15, 22).getTime();
  const hundredMs = new Date(2005 + 100, 7, 14, 22, 10, 15, 22).getTime();

  const [hover, setHover] = useState(false);
  const displayRef = useRef(null);

  useEffect(() => {
    let stopped = false;

    function tick(ts) {
      const nowHighRes = performance.timeOrigin + ts;
      let raw, text;

      if (hover) {
        const remMs = hundredMs - nowHighRes;
        if (remMs > 0) {
          raw = (remMs / 1000).toFixed(4);
        } else {
          text = "🎉 100!";
        }
      } else {
        const elapsedMs = nowHighRes - birthMs;
        raw = (elapsedMs / 1000).toFixed(4);
      }

      if (raw !== undefined) {
        const [intPart, fracPart] = raw.split(".");
        const paddedInt = intPart.padStart(10, "0");
        text = `${paddedInt}.${fracPart}${hover ? " ETD" : ""}`;
      }

      if (displayRef.current) {
        const h3 = displayRef.current.querySelector("h3");
        const p = displayRef.current.querySelector("p");
        if (p) p.textContent = text;
      }

      if (!stopped) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    return () => {
      stopped = true;
    };
  }, [birthMs, hundredMs, hover]);

  return (
    <div
      className="age-container"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div ref={displayRef}>
        <p>0000000000.0000 s</p>
      </div>
    </div>
  );
}
