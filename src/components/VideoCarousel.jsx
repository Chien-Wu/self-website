import React, { useState, useRef, useEffect } from "react";
import "./VideoCarousel.css";

import video1 from "../assets/blenders/1.mp4";
import thumb1 from "../assets/blenders/1.jpeg";
import video2 from "../assets/blenders/2.mp4";
import thumb2 from "../assets/blenders/2.jpeg";
import video3 from "../assets/blenders/3.mp4";
import thumb3 from "../assets/blenders/3.jpeg";
import video4 from "../assets/blenders/4.mp4";
import thumb4 from "../assets/blenders/4.jpeg";
import video5 from "../assets/blenders/5.mp4";
import thumb5 from "../assets/blenders/5.jpeg";
import video6 from "../assets/blenders/6.mp4";
import thumb6 from "../assets/blenders/6.jpeg";

const videos = [
  { src: video1, poster: thumb1, title: "Tennis" },
  { src: video2, poster: thumb2, title: "Roller coaster" },
  { src: video3, poster: thumb3, title: "Poker" },
  { src: video4, poster: thumb4, title: "Travel" },
  { src: video5, poster: thumb5, title: "Clock" },
  { src: video6, poster: thumb6, title: "Head" },
];

export default function VideoCarousel() {
  const count = videos.length;
  const theta = 360 / count;
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);

  // 响应式 itemWidth & radius（同之前）
  const [dim, setDim] = useState({
    itemWidth: 250,
    radius: 250 / (2 * Math.tan(Math.PI / count)),
  });
  useEffect(() => {
    function update() {
      if (!wrapperRef.current) return;
      const w = wrapperRef.current.clientWidth;
      const iW = w * 0.5;
      const r = Math.round(iW / (2 * Math.tan(Math.PI / count)));
      setDim({ itemWidth: iW, radius: r });
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [count]);

  // 累积旋转角度
  const [rotationY, setRotationY] = useState(0);
  useEffect(() => {
    const c = containerRef.current;
    c.style.transition = "transform 1s";
    c.style.transform = `translateZ(-${dim.radius}px) rotateY(${rotationY}deg)`;
  }, [rotationY, dim.radius]);

  const prev = () => setRotationY((r) => r + theta);
  const next = () => setRotationY((r) => r - theta);

  // 触摸滑动
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 50; // px
    if (dx > threshold) prev();
    else if (dx < -threshold) next();
  };

  return (
    <div
      className="carousel"
      ref={wrapperRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        width: "100vw",
        maxWidth: "500px",
        height: "calc(100vw * 0.6)",
        maxHeight: "300px",
      }}
    >
      <div className="carousel__container" ref={containerRef}>
        {videos.map(({ src, poster, title }, i) => (
          <div className="carousel__item" key={i}>
            <div
              className="carousel__item-inner"
              style={{
                width: `${dim.itemWidth}px`,
                transform: `rotateY(${i * theta}deg) translateZ(${
                  dim.radius
                }px)`,
              }}
            >
              <video
                src={src}
                poster={poster}
                controls
                preload="none"
                width="100%"
              />
              <div className="caption">{title}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="nav prev" onClick={prev}>
        ‹
      </button>
      <button className="nav next" onClick={next}>
        ›
      </button>
    </div>
  );
}
