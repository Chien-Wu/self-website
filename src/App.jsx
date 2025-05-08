import React from "react";
import FloatingCard from "./components/FloatingCard";
import VideoGallery from "./components/VideoGallery";

function App() {
  return (
    <div>
      <FloatingCard>
        <h2>Chien Wu</h2>
        <p>Artist, Web developer</p>
      </FloatingCard>
      <div>
        <VideoGallery />
      </div>
    </div>
  );
}

export default App;
