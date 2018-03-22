import React from "react";
import "./index.css";
import cx from "classnames/bind";

function Flex(props) {
  const flexClass = cx({
    flex: true,
    "flex--guttered": props.guttered,
    "flex--justify-around": props.justify === "around",
    "flex--justify-between": props.justify === "between",
    "flex--align-center": props.align === "center"
  });
  return <div className={flexClass}>{props.children}</div>;
}

export default Flex;
