import React from "react";
import "./index.css";

import Canvas from "../Canvas";

function Overlap({ position, lines = [] }) {
  return (
    <div className={`overlap --${position}`}>
      <Canvas lines={lines} />
    </div>
  );
}

export default Overlap;
