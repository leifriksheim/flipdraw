import React from "react";
import "./index.css";

function ButtonLink(props) {
  return (
    <button className="button-link" value={props.value} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default ButtonLink;
