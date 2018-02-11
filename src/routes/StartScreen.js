import React from "react";
import autoBind from "react-autobind";
import { withRouter } from "react-router-dom";
import { createUser, findDrawing, createNewDrawing } from "../firebase";
import * as firebase from "firebase";

class StartScreen extends React.Component {
  constructor() {
    super();
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
      <div>
        <input
          type="text"
          value={this.state.userName}
          onChange={this.updateUsername}
        />
        <button onClick={this.startGame}>Start Drawing!</button>
      </div>
    );
  }
}

export default StartScreen;
