import React from "react";
import { Link } from "react-router-dom";
import "./index.css";

import cx from "classnames";

function Avatar({ isVisible, user }) {
  const avatarClass = cx({
    avatar: true,
    "--visible": isVisible
  });

  const name = (user && user.displayName) || "?";

  return (
    <Link to="/all-drawings" className={avatarClass}>
      {name.charAt(0)}
    </Link>
  );
}

export default Avatar;
