import React from "react";
import "./index.css";

function Toolbar({ onClick }) {
  return (
    <div data-stop-bubbling className="toolbar">
      <i data-stop-bubbling className="toolbar__line" />
      <i data-stop-bubbling className="toolbar__line" />
      <i data-stop-bubbling className="toolbar__line" />
    </div>
  );
}

export default Toolbar;
