import React from "react";
import "./index.css";

import cx from "classnames";

function View(props) {
  const viewClass = cx({
    view: true,
    "--vcenter": props.isVcentered,
    "--vcenter-desktop": props.isVcenteredDesktop,
    "--dark": props.isDark,
    "--back": props.isBack,
    "--visible": props.isVisible
  });

  return <section className={viewClass}>{props.children}</section>;
}

export default View;
