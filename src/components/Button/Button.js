import React from "react";
import "./index.css";

function Button(props) {
  return (
    <button className="button" value={props.value} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
