import React from "react";
import autoBind from "react-autobind";
import { withRouter } from "react-router-dom";
import { createUser, findDrawing, createNewDrawing } from "../firebase";
import * as firebase from "firebase";

import Logo from "../components/Logo";
import Button from "../components/Button";
import DemoDrawing from "../components/DemoDrawing";
import JoinForm from "../components/JoinForm";

class StartScreen extends React.Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      userName: "",
      overlayVisible: false
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        const uid = user.uid;
        console.log(uid);
      } else {
        console.log("not logged in");
      }
    });
  }

  showJoinForm() {
    this.setState({
      overlayVisible: true
    });
  }

  updateUsername(e) {
    const userName = e.target.value;
    this.setState({
      userName: userName
    });
  }

  async startGame() {
    const userKey = await createUser(this.state.userName);
    const existingDrawing = await findDrawing();
    if (existingDrawing) {
      this.props.history.push(`/draw/${existingDrawing}`);
    } else {
      const drawingId = await createNewDrawing();
    }
  }

  render() {
    return (
      <div className="landing-screen">
        <DemoDrawing />
        <Logo />
        <Button onClick={this.showJoinForm}>Start Drawing!</Button>
        <JoinForm
          isVisible={this.state.overlayVisible}
          userName={this.state.userName}
          onChange={this.updateUsername}
          onSubmit={this.startGame}
        />
      </div>
    );
  }
}

export default StartScreen;
