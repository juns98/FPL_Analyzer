import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
import About from "./page/About";
import Player from "./page/Player";
import Manager from "./page/Manager";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/player" element={<Player />} />
      <Route path="/manager" element={<Manager />} />
    </Routes>
  );
}

export default App;
