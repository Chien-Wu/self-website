// FloatingCard.jsx
import React, { useRef } from "react";
import "../App.css";

import heroImg from "../assets/Mountain.jpeg";

export default function FloatingCard({ children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const { left, top, width, height } = card.getBoundingClientRect();
    // calculate center-relative mouse coords between -0.5 and +0.5
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    const rotateX = y * 20; // max tilt 20°
    const rotateY = x * 20;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateZ(30px)`;
  };

  const handleMouseLeave = () => {
    // reset
    cardRef.current.style.transform = `rotateX(0deg) rotateY(0deg) translateZ(0px)`;
  };

  return (
    <div className="scene">
      <div
        className="card"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="card-content">{children}</div>
      </div>
    </div>
  );
}
