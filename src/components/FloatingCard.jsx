import React, { useRef, useState } from "react";
import "../App.css";
import heroImg from "../assets/Mountain.jpeg";

export default function FloatingCard({ children }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `
      rotateY(${flipped ? 180 : 0}deg)
      rotateX(${-y * 20}deg)
      rotateY(${x * 20}deg)
      translateZ(30px)
    `;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = `
      rotateY(${flipped ? 180 : 0}deg)
      rotateX(0deg)
      rotateY(0deg)
      translateZ(0px)
    `;
  };

  const toggleFlip = () => {
    setFlipped((f) => !f);
    // 立即更新一次 transform，保留当前 tilt
    const card = cardRef.current;
    card.style.transform = `rotateY(${!flipped ? 180 : 0}deg)`;
  };

  return (
    <div className="scene">
      <button className="flip-btn" onClick={toggleFlip}>
        Flip
      </button>
      <div
        className={`card${flipped ? " flipped" : ""}`}
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* 前面 */}
        <div
          className="card-face card-front"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="card-content">{children}</div>
        </div>
        {/* 后面 */}
        <div className="card-face card-back">
          <div className="card-content">
            <h2>Back Side</h2>
            <p>This is the back of the card.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
