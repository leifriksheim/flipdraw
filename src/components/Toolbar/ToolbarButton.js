import React from "react";
import "./index.css";

function ToolbarButton({ onClick, icon, label }) {
  return (
    <button data-stop-bubbling className="toolbar__button" onClick={onClick}>
      <img data-stop-bubbling src={icon} alt="undo" />
      <p className="toolbar__button-label">{label}</p>
    </button>
  );
}

export default ToolbarButton;
