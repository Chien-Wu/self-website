import React from "react";
import FloatingCard from "./components/FloatingCard";
import VideoCarousel from "./components/VideoCarousel";

function App() {
  return (
    <div>
      <FloatingCard>
        <h2>Chien Wu</h2>
        <p>Artist, Web developer</p>
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
