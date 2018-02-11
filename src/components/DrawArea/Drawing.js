import React from 'react';

function Drawing({ lines }) {
  return (
    <svg className="drawing" viewBox="0 0 1920 1080" preserveAspectRatio="xMinYMin meet">
      {lines.map((line, index) => <DrawingLine key={index} line={line} />)}
    </svg>
  );
}

function DrawingLine({ line }) {
  const pathData =
    "M " +
    line
      .map(p => {
        return `${p.x} ${p.y}`;
      })
      .join(" L ");

  return <path className="drawing__path" d={pathData} />;
}

export default Drawing;
