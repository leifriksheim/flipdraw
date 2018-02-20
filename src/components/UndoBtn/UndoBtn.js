import React from "react";
import "./index.css";

import Image from "../../assets/undo.svg";

function UndoBtn({ onClick }) {
  return (
    <button data-stop-bubbling className="undo-btn" onClick={onClick}>
      <img data-stop-bubbling src={Image} alt="undo" />
    </button>
  );
}

export default UndoBtn;
