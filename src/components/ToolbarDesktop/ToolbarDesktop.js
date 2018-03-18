import React from "react";
import "./index.css";

import undo from "../../assets/undo.svg";
import check from "../../assets/check.svg";
import ToolbarButton from "./ToolbarButton";

function ToolbarDesktop({ onUndo, onSubmit }) {
  return (
    <div data-stop-bubbling className="toolbar-desktop">
      <ToolbarButton icon={undo} label="undo" onClick={onUndo} />
      <ToolbarButton icon={check} label="submit drawing" onClick={onSubmit} />
    </div>
  );
}

export default ToolbarDesktop;
