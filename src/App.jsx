// src/App.jsx
import React from "react";
import FloatingCard from "./components/FloatingCard";
import VideoCarousel from "./components/VideoCarousel";
import "./App.css";

function App() {
  return (
    <div>
      <FloatingCard
        backContent={
          <>
            <p>
              <a
                href="https://www.instagram.com/572_chien/"
                target="_blank"
                rel="noopener noreferrer"
              >
                📷IG
              </a>
            </p>
            <p>
              <a
                href="https://github.com/Chien-Wu"
                target="_blank"
                rel="noopener noreferrer"
              >
                👾GitHub
              </a>
            </p>
          </>
        }
      >
        {/* 这是正面的内容 */}
        <h2>Chien Wu</h2>
        <p>Artist, Web Developer</p>
      </FloatingCard>

      <div>
        <VideoCarousel />
      </div>

      <div>
        <p>hihihi hihihi hihihi</p>
      </div>
    </div>
  );
}

export default App;
