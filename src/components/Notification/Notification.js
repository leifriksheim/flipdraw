import React from "react";
import "./index.css";

function Notification(props) {
  return <div className="notification">{props.children}</div>;
}

export default Notification;
