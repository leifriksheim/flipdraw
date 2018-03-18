import React from "react";
import "./index.css";

import undo from "../../assets/undo.svg";
import zoom from "../../assets/zoom.svg";
import menu from "../../assets/menu.svg";
import check from "../../assets/check.svg";
import ToolbarButton from "./ToolbarButton";

function Toolbar({ onShowMenu, onFullScreen, onUndo, onSubmit }) {
  return (
    <div data-stop-bubbling className="toolbar">
      <ToolbarButton icon={menu} label="menu" onClick={onShowMenu} />
      <ToolbarButton icon={zoom} label="full screen" onClick={onFullScreen} />
      <ToolbarButton icon={undo} label="undo" onClick={onUndo} />
      <ToolbarButton icon={check} label="submit drawing" onClick={onSubmit} />
    </div>
  );
}

export default Toolbar;
