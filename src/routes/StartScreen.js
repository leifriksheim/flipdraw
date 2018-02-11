import React from "react";
import autoBind from "react-autobind";
import { createUser, findDrawing } from "../firebase";
import Logo from "../components/Logo";
import DemoDrawing from "../components/DemoDrawing";
import StartDrawingForm from "../components/StartDrawingForm";

class StartScreen extends React.Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      userName: ""
    };
  }

  updateUsername(e) {
    const userName = e.target.value;
    this.setState({
      userName: userName
    });
  }

  async startGame() {
    const userKey = createUser(this.state.userName);
    const existingDrawing = await findDrawing();
    if (existingDrawing) {
      console.log("Start drawing in existing drawing", existingDrawing);
    } else {
      console.log("Create totally new drawing here");
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
