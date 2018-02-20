import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

import cx from "classnames";

function Avatar({ isVisible, displayName = "?" }) {
  const avatarClass = cx({
    avatar: true,
    "--visible": isVisible
  });
  return (
    <Link to="/all-drawings" className={avatarClass}>
      {displayName.charAt(0)}
    </Link>
  );
}

export default Avatar;
