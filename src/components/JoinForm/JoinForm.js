import React from "react";
import "./index.css";

import Input from "../Input";
import Button from "../Button";

function JoinForm({
  userName = "",
  password = "",
  newUser,
  onChangePassword,
  onChangeUserName,
  handleSubmit,
  isSubmitting
}) {
  return (
    <div className="join-form">
      <h1 className="--inverted">Ahoi!</h1>
      <p className="white">
        {newUser ?
          'You must be new here. Pick a name and a password!' :
          'Log in and start drawing!'}
      </p>
      <form
        className="join-form__inner"
        onSubmit={handleSubmit}
        disabled={isSubmitting}
      >
        <Input
          name="userName"
          type="text"
          placeholder="Enter name"
          value={userName}
          onChange={onChangeUserName}
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={onChangePassword}
        />
        <Button type="submit" disabled={isSubmitting}>
          {newUser ?
            `I'm ready!` :
            `Log in!`}
        </Button>
      </form>
    </div>
  );
}

export default JoinForm;
