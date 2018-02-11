import React from "react";
import "./index.css";

import cx from "classnames";

import Input from "../Input";
import Button from "../Button";

function StartDrawingForm(props) {
  const wrapperClass = cx({
    submitWrapper: true,
    "submitWrapper--visible": props.userName.length > 1
  });

  return (
    <form className="start-drawing-form" onSubmit={props.onSubmit}>
      <Input
        placeholder="Enter username"
        value={props.userName}
        onChange={props.onChange}
      />
      <div className={wrapperClass}>
        <Button type="submit">Start Drawing!</Button>
      </div>
    </form>
  );
}

export default StartDrawingForm;
