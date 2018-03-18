import React from "react";
import "./index.css";

import cx from "classnames";

function MenuBtn({ onClick, isVisible }) {
  const logInClass = cx({
    'login-btn': true,
    "--visible": isVisible
  });

  return (
    <button className={logInClass} onClick={onClick}>
      Log in
    </button>
  );
}

export default MenuBtn;
