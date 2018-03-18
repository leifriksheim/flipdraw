import React from "react";
import cx from "classnames";
import "./index.css";

import undo from "../../assets/undo.svg";
import zoom from "../../assets/zoom.svg";
import menu from "../../assets/menu.svg";
import check from "../../assets/check.svg";
import ToolbarButton from "./ToolbarButton";

function Toolbar({ isFaded, onShowMenu, onFullScreen, onUndo, onSubmit }) {
  const drawAreaClass = cx({
    toolbar: true,
    "--faded": isFaded
  });
  return (
    <div data-stop-bubbling className={drawAreaClass}>
      <ToolbarButton icon={menu} label="menu" onClick={onShowMenu} />
      <ToolbarButton icon={zoom} label="full screen" onClick={onFullScreen} />
      <ToolbarButton icon={undo} label="undo" onClick={onUndo} />
      <ToolbarButton icon={check} label="submit drawing" onClick={onSubmit} />
    </div>
  );
}

export default Toolbar;
