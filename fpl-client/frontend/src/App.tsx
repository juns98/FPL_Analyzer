import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Player from "./page/Player";
import Manager from "./page/Manager";
import styled from "styled-components";
import Team from "./page/Team";

function App() {
  return (
    <div className="App">
      <Application>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/player" element={<Player />} />
          <Route path="/team" element={<Team />} />
          <Route path="/manager" element={<Manager />} />
        </Routes>
      </Application>
    </div>
  );
}

export default App;

const Application = styled.div`
  font-family: "RobotoMono";
  font-weight: 400;
  width: 100%; /* Allows fluid width on smaller screens */
  margin: 0 auto; /* Center the content */
  padding: 1rem; /* Adequate padding */

  /* Adjust font size for different screen sizes */
  font-size: 0.9rem; /* Default font size for small screens */

  @media (min-width: 480px) {
    font-size: 1rem; /* Slightly larger font for medium-small screens */
  }

  @media (min-width: 768px) {
    max-width: 768px; /* Fixed width for tablet screens */
    font-size: 1.1rem; /* Slightly larger font for tablet screens */
  }

  @media (min-width: 992px) {
    max-width: 992px; /* Fixed width for small desktop screens */
    font-size: 1.2rem; /* Larger font for small desktop screens */
  }

  @media (min-width: 1200px) {
    max-width: 1200px; /* Fixed width for large desktop screens */
    font-size: 1.3rem; /* Larger font for large desktop screens */
  }

  @media (min-width: 1600px) {
    max-width: 2000px; /* Fixed width for extra-large screens */
  }
`;
