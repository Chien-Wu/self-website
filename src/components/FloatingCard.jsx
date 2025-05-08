import React, { useRef, useState } from "react";
import "../App.css";
import heroImg from "../assets/Mountain.jpeg";

export default function FloatingCard({ children }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);

  // 鼠标倾斜逻辑，只改 .card 的 transform
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    card.style.transform = `
      rotateX(${-y * 20}deg)
      rotateY(${x * 20}deg)
      translateZ(30px)
    `;
  };

  const handleMouseLeave = () => {
    cardRef.current.style.transform = "";
  };

  // 翻转状态切换
  const toggleFlip = () => {
    setFlipped((f) => !f);
  };

  return (
    <div className="scene">
      <div
        className="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`card-inner${flipped ? " flipped" : ""}`}>
          {/* 正面 */}
          <div
            className="card-face card-front"
            style={{
              backgroundImage: `url(${heroImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="card-content">
              {children}
              <button onClick={toggleFlip}>More Info →</button>
            </div>
          </div>
          {/* 背面 */}
          <div className="card-face card-back">
            <div className="card-content">
              <h2>Back Side</h2>
              <p>This is the back of the card.</p>
              <button onClick={toggleFlip}>Flip</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
