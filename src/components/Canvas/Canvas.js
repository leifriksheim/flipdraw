import React from "react";
import settings from "../../constants/settings";
import "./index.css";

const { canvasHeight, canvasWidth } = settings;

function Canvas({ lines }) {
  return (
    <svg
      className="canvas"
      viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}
      preserveAspectRatio="xMinYMin meet"
    >
      {lines.map((line, index) => <CanvasLine key={index} line={line} />)}
    </svg>
  );
}

function CanvasLine({ line }) {
  const pathData =
    "M " +
    line
      .map(p => {
        return `${p.x} ${p.y}`;
      })
      .join(" L ");

  return <path className="canvas__path" d={pathData} />;
}

export default Canvas;
