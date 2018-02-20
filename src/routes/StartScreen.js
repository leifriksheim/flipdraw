import React from "react";
import autoBind from "react-autobind";
import {
  firebase,
  createUser,
  findDrawing,
  createNewDrawing,
  getAllDrawings
} from "../firebase";

import View from "../components/View";
import Logo from "../components/Logo";
import Button from "../components/Button";
import DemoDrawing from "../components/DemoDrawing";
import Loader from "../components/Loader";
import Input from "../components/Input";
import Avatar from "../components/Avatar";

class StartScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      isLoading: true,
      userData: {
        displayName: ""
      },
      userDrawings: {},
      pageFlipped: false
    };
  }

  async componentDidMount() {
    // Find user if data exists in localstorage
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        const allDrawings = (await getAllDrawings(uid)) || {};
        const allDrawingsArray = Object.keys(allDrawings).map(drawingId => {
          return allDrawings[drawingId];
        });
        this.setState({
          userData: user,
          allDrawings: allDrawingsArray,
          isLoading: false
        });
      } else {
        // User is signed out.
        this.setState({
          userData: {},
          isLoading: false
        });
      }
    });
  }

  togglePageFlip() {
    // Bypass new user form if logged in
    if (this.state.userData.uid) {
      return this.startGame();
    }
    this.setState({
      pageFlipped: !this.state.pageFlipped
    });
  }

  updateDisplayName(e) {
    const displayName = e.target.value;
    this.setState({
      userData: Object.assign({}, { displayName: displayName })
    });
  }

  async startGame(e) {
    e && e.preventDefault();

    // Create user only if not logged in
    if (!this.state.userData.uid) {
      await createUser(this.state.userData.displayName);
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
    const { userData, pageFlipped, isLoading } = this.state;
    return (
      <div>
        <View isVisible={!pageFlipped} isVcenteredDesktop>
          <DemoDrawing />
          <Logo />
          <Avatar isVisible={userData.uid} displayName={userData.displayName} />
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <Button onClick={this.togglePageFlip}>Start Drawing!</Button>
              {userData.uid && (
                <p className="white">Drawing as {userData.displayName}</p>
              )}
            </div>
          )}
        </View>

        <View isDark isBack isVisible={pageFlipped}>
          <h1 className="--inverted">Ahoi!</h1>
          <p>You must be new here. Pick a name!</p>
          <form className="join-form__inner" onSubmit={this.startGame}>
            <Input
              name="displayName"
              placeholder="Enter name"
              value={userData.displayName}
              onChange={this.updateDisplayName}
            />
            <Button type="submit">I'm ready!</Button>
          </form>
        </View>
      </div>
    );
  }
}

export default StartScreen;
