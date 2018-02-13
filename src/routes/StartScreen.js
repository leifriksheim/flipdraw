import React from "react";
import autoBind from "react-autobind";
import { withRouter } from "react-router-dom";
import { createUser, findDrawing, createNewDrawing } from "../firebase";

import View from "../components/View";
import Logo from "../components/Logo";
import Button from "../components/Button";
import DemoDrawing from "../components/DemoDrawing";
import JoinForm from "../components/JoinForm";

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      userName: "",
      pageFlipped: false
    };
  }

  showJoinForm() {
    this.setState({
      pageFlipped: !this.state.pageFlipped
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
    const { userName, pageFlipped } = this.state;
    return (
      <div>
        <View isVisible={!pageFlipped}>
          <DemoDrawing />
          <Logo />
          <Button onClick={this.showJoinForm}>Start Drawing!</Button>
        </View>
        <View isDark isBack isVcentered isVisible={pageFlipped}>
          <JoinForm
            userName={userName}
            onChange={this.updateUsername}
            onSubmit={this.startGame}
          />
        </View>
      </div>
    );
  }
}

export default StartScreen;
