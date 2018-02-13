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

  handleNewDrawing() {
    this.props.history.push("/");
  }

  handleAllDrawings() {
    this.props.history.push("/all-drawings");
  }

  render() {
    return (
      <div className="section --full-height --center-v --center-h">
        <h1 className="logo">
          <span className="logo__flipped">Thank</span>You!
        </h1>
        <Button onClick={this.handleNewDrawing}>Draw a new one</Button>
        <Button onClick={this.handleAllDrawings}>See all your drawings</Button>
      </div>
    );
  }
}

export default ThankYouScreen;
