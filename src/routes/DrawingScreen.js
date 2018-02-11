import React from "react";
import DrawArea from "../components/DrawArea";

function DrawingScreen({ match }) {
  return (
    <div className="section --full-height --center-v --center-h">
      <DrawArea drawingId={match.params.id} />
    </div>
  );
}

export default DrawingScreen;
