import React from "react";

import Canvas from "../Canvas";

import "./index.css";

function Drawing({ head, body, legs }) {
  return (
    <div className="drawing">
      <div className="drawing__part">
        <Canvas lines={head.data} />
      </div>
      <div className="drawing__part">
        <Canvas lines={body.data} />
      </div>
      <div className="drawing__part">
        <Canvas lines={legs.data} />
      </div>
    </div>
  );
}

export default Drawing;
