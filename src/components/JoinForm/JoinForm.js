import React from "react";
import "./index.css";

import Input from "../Input";
import Button from "../Button";

function JoinForm({
  userName = "",
  password = "",
  isNewAccount,
  onChange,
  onSubmit,
  isSubmitting
}) {
  return (
    <div className="join-form">
      <h1 className="--inverted">Ahoy!</h1>
      <p className="white">
        {isNewAccount
          ? "You must be new here. Pick a name and a password!"
          : "Log in and start drawing!"}
      </p>
      <form
        className="join-form__inner"
        onSubmit={onSubmit}
        disabled={isSubmitting}
      >
        <Input
          name="userName"
          type="text"
          placeholder="Enter name"
          value={userName}
          onChange={({ target }) => onChange("userName", target.value)}
        />
        <Input
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={({ target }) => onChange("userPassword", target.value)}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isNewAccount ? `I'm ready!` : `Log in!`}
        </Button>
      </form>
    </div>
  );
}

export default JoinForm;
