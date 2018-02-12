import React from "react";
import autoBind from "react-autobind";
import { withRouter } from "react-router-dom";
import { createUser, findDrawing, createNewDrawing } from "../firebase";
import * as firebase from "firebase";
import Button from "../components/Button";

class ThankYouScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      userName: ""
    };
  }

  render() {
    return (
      <div className="section --full-height --center-v --center-h">
        <h1 className="logo">
          <span className="logo__flipped">Thank</span>You!
        </h1>
        <Button>Draw a new one</Button>
        <Button>See all your drawings</Button>
      </div>
    );
  }
}

export default ThankYouScreen;
