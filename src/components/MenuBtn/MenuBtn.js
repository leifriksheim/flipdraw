import React from "react";
import "./index.css";

function MenuBtn({ onClick }) {
  return (
    <button data-stop-bubbling className="menu-btn" onClick={onClick}>
      <i data-stop-bubbling className="menu-btn__line" />
      <i data-stop-bubbling className="menu-btn__line" />
      <i data-stop-bubbling className="menu-btn__line" />
    </button>
  );
}

export default MenuBtn;
