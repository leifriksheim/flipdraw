import React from "react";
import "./index.css";

import cx from "classnames";

import Input from "../Input";
import Button from "../Button";

function JoinForm(props) {
  const formClass = cx({
    "join-form": true,
    "--visible": props.isVisible
  });

  return (
    <div className={formClass}>
      <form className="join-form__inner" onSubmit={props.onSubmit}>
        <h1 className="--inverted">Ahoi!</h1>
        <p>You must be new here. Pick a name!</p>
        <Input
          name="username"
          placeholder="Enter username"
          value={props.userName}
          onChange={props.onChange}
        />
        <Button type="submit">I'm ready!</Button>
      </form>
    </div>
  );
}

export default JoinForm;
