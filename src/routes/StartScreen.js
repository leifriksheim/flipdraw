import React from "react";
import PropTypes from "prop-types";
import autoBind from "react-autobind";
import { createUser, logInUser } from "../firebase/user";
import { findDrawing, createNewDrawing } from "../firebase/drawings";

import View from "../components/View";
import Logo from "../components/Logo";
import Button from "../components/Button";
import DemoDrawing from "../components/DemoDrawing";
import Loader from "../components/Loader";
import JoinForm from "../components/JoinForm";
import Avatar from "../components/Avatar";
import LogInBtn from "../components/LogInBtn";

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      fields: {
        userName: "",
        userPassword: ""
      },
      pageFlipped: false,
      isNewAccount: true,
      isSubmitting: false
    };
  }

  static contextTypes = {
    authUser: PropTypes.object,
    authLoading: PropTypes.bool
  };

  handleChange(key, value) {
    this.setState({ fields: { ...this.state.fields, [key]: value } });
  }

  togglePageFlip() {
    // Bypass new user form if logged in
    if (this.context.authUser) {
      return this.startGame();
    }
    this.setState({
      pageFlipped: !this.state.pageFlipped
    });
  }

  toggleLogin() {
    this.setState({
      isNewAccount: false,
      pageFlipped: !this.state.pageFlipped
    });
  }

  async startGame(e) {
    e && e.preventDefault();

    this.setState({
      isSubmitting: true
    });

    // Create user only if not logged in
    if (!this.context.authUser) {
      const { userName, userPassword } = this.state.fields;
      if (this.state.isNewAccount) {
        await createUser(userName, userPassword);
      } else {
        await logInUser(userName, userPassword);
      }
    }

    // Find drawing to add to
    const existingDrawing = await findDrawing();
    if (existingDrawing) {
      this.props.history.push(`/draw/${existingDrawing}`);
    } else {
      const newDrawingId = await createNewDrawing();
      this.props.history.push(`/draw/${newDrawingId}`);
    }
  }

  render() {
    const { pageFlipped, isNewAccount, isSubmitting } = this.state;
    const { userName, userPassword } = this.state.fields;
    const { authLoading, authUser } = this.context;
    return (
      <div>
        <View isVisible={!pageFlipped} isVcenteredDesktop>
          <DemoDrawing />
          <Logo />
          <Avatar isVisible={authUser} user={authUser} />
          <LogInBtn isVisible={!authUser} onClick={this.toggleLogin} />
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
            isNewAccount={isNewAccount}
            userName={userName}
            password={userPassword}
            onChange={this.handleChange}
            onSubmit={this.startGame}
            isSubmitting={isSubmitting}
          />
        </View>
      </div>
    );
  }
}

export default StartScreen;
