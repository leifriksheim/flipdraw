import React from "react";
import PropTypes from "prop-types";
import autoBind from "react-autobind";
import { createUser } from "../firebase/user";
import { findDrawing, createNewDrawing } from "../firebase/drawings";

import View from "../components/View";
import Logo from "../components/Logo";
import Button from "../components/Button";
import DemoDrawing from "../components/DemoDrawing";
import Loader from "../components/Loader";
import JoinForm from "../components/JoinForm";
import Avatar from "../components/Avatar";

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      newUserName: "",
      pageFlipped: false,
      isSubmitting: false
    };
  }

  static contextTypes = {
    authUser: PropTypes.object,
    authLoading: PropTypes.bool
  };

  togglePageFlip() {
    // Bypass new user form if logged in
    if (this.context.authUser) {
      return this.startGame();
    }
    this.setState({
      pageFlipped: !this.state.pageFlipped
    });
  }

  updateDisplayName(e) {
    const newUserName = e.target.value;
    this.setState({
      newUserName
    });
  }

  async startGame(e) {
    e && e.preventDefault();

    this.setState({
      isSubmitting: true
    });

    // Create user only if not logged in
    if (!this.context.authUser) {
      await createUser(this.state.newUserName);
    }

    const existingDrawing = await findDrawing();

    if (existingDrawing) {
      this.props.history.push(`/draw/${existingDrawing}`);
    } else {
      const newDrawingId = await createNewDrawing();
      this.props.history.push(`/draw/${newDrawingId}`);
    }
  }

  render() {
    const { newUserName, pageFlipped, isSubmitting } = this.state;
    const { authLoading, authUser } = this.context;
    return (
      <div>
        <View isVisible={!pageFlipped} isVcenteredDesktop>
          <DemoDrawing />
          <Logo />
          <Avatar isVisible={authUser} user={authUser} />
          {authLoading || isSubmitting ? (
            <Loader />
          ) : (
            <div>
              <Button onClick={this.togglePageFlip}>Start Drawing!</Button>
              {authUser && (
                <p className="white">Drawing as {authUser.displayName}</p>
              )}
            </div>
          )}
        </View>

        <View isDark isBack isVspaced isVisible={pageFlipped}>
          <JoinForm
            isSubmitting={isSubmitting}
            userName={newUserName}
            onChange={this.updateDisplayName}
            onSubmit={this.startGame}
          />
        </View>
      </div>
    );
  }
}

export default StartScreen;
