import React from "react";
import autoBind from "react-autobind";
import { withRouter } from "react-router-dom";
import { createUser, findDrawing, createNewDrawing } from "../firebase";
import * as firebase from "firebase";

import Logo from "../components/Logo";
import DemoDrawing from "../components/DemoDrawing";
import StartDrawingForm from "../components/StartDrawingForm";

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      userName: ""
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

  updateUsername(e) {
    const userName = e.target.value;
    this.setState({
      userName: userName
    });
  }

  async startGame(e) {
    e.preventDefault();
    const userKey = await createUser(this.state.userName);
    const existingDrawing = await findDrawing();
    if (existingDrawing) {
      this.props.history.push(`/draw/${existingDrawing}`);
    } else {
      const newDrawingId = await createNewDrawing();
      this.props.history.push(`/draw/${newDrawingId}`);
    }
  }

  render() {
    return (
      <div className="landing-screen">
        <DemoDrawing />
        <Logo />
        <StartDrawingForm
          userName={this.state.userName}
          onChange={this.updateUsername}
          onSubmit={this.startGame}
        />
      </div>
    );
  }
}

export default StartScreen;
