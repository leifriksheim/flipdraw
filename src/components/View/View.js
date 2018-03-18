import React from "react";
import "./index.css";

import cx from "classnames";

function View(props) {
  const viewClass = cx({
    view: true,
    "--full": props.isFull,
    "--vcenter": props.isVcentered,
    "--vspaced": props.isVspaced,
    "--vcenter-desktop": props.isVcenteredDesktop,
    "--dark": props.isDark,
    "--back": props.isBack,
    "--visible": props.isVisible
  });

  return (
    <div className={viewClass} id={props.id}>
      {props.children}
    </div>
  );
}

export default View;
