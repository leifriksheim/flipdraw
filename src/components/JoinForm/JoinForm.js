import React from "react";
import "./index.css";

import Input from "../Input";
import Button from "../Button";

function JoinForm({ userName = "", onChange, onSubmit, isSubmitting }) {
  return (
    <div className="join-form">
      <h1 className="--inverted">Ahoi!</h1>
      <p className="white">You must be new here. Pick a name!</p>
      <form
        className="join-form__inner"
        onSubmit={onSubmit}
        disabled={isSubmitting}
      >
        <Input
          name="displayName"
          placeholder="Enter name"
          value={userName}
          onChange={onChange}
        />
        <Button type="submit" disabled={isSubmitting}>
          I'm ready!
        </Button>
      </form>
    </div>
  );
}

export default JoinForm;
