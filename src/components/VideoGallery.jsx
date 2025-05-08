import React from "react";
import "./VideoGallery.css";

// 引入所有视频和缩略图
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

export default function VideoGallery() {
  return (
    <div className="gallery">
      {videos.map(({ src, poster, title }, i) => (
        <div className="video-card" key={i}>
          <video
            src={src}
            poster={poster}
            controls
            preload="none"
            width="100%"
            height="auto"
          />
          <div className="caption">{title}</div>
        </div>
      ))}
    </div>
  );
}
