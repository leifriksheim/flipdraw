import React from "react";
import "./index.css";

function Input(props) {
  return (
    <input
      type={props.type}
      className="input"
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
}

export default Input;
