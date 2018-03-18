import React from "react";
import Drawing from './DrawArea/Drawing';

import cx from "classnames";

const FullDrawing = ({showAll, head, body, legs, uid}) => {

  const headClass = cx({
    "full-drawing__head": true,
    "--hidden": uid === head.uid,
  });

  const headClass = cx({
    "full-drawing__head": true,
    "--hidden": uid === head.uid,
  });

  const headClass = cx({
    "full-drawing__head": true,
    "--hidden": uid === head.uid,
  });

  return (
    <div className="full-drawing">
      <div className={headClass}>
        <Drawing lines={head.data}></Drawing>
      </div>
      <div className={bodyClass}>
        <Drawing lines={head.data}></Drawing>
      </div>
      <div className={legClass}>
        <Drawing lines={head.data}></Drawing>
      </div>
    </div>
  )
}

export default FullDrawing;
