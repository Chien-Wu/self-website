// src/components/FloatingCard.jsx
import React, { useRef, useState } from "react";
import "../App.css";
import "./FloatingCard.css";
import heroImg from "../assets/Mountain.jpeg";

export default function FloatingCard({ children, backContent }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef(null);

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

  const toggleFlip = () => setFlipped((f) => !f);

  return (
    <div className="scene">
      <div
        className="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`card-inner${flipped ? " flipped" : ""}`}>
          {/* Front Side */}
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
          {/* Back Side */}
          <div className="card-face card-back">
            <div className="card-content">
              {backContent}
              <button onClick={toggleFlip}>Back →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
