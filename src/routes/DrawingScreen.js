import React from "react";
import DrawArea from "../components/DrawArea";
import autoBind from "react-autobind";
import Rotater from "../components/Rotater";
import Loader from "../components/Loader";
import View from "../components/View";

import { db, auth } from "../firebase";
import { pickBodyPart } from "../utilities/drawing";
import { submitDrawing, getDrawingById } from "../firebase/drawings";

class DrawingScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      drawingData: {},
      bodyPart: "",
      drawingSubmitted: false,
      isLoading: true
    };
  }

  async componentDidMount() {
    // Initial data
    const drawingId = this.props.match.params.id;
    const drawingData = await getDrawingById(drawingId);
    const bodyPart = pickBodyPart(drawingData);

    if (!bodyPart) {
      this.props.history.push("/");
    }
    // Set the random body part to state
    this.setState({
      drawingData: drawingData,
      bodyPart: bodyPart,
      isLoading: false
    });
    // Set the given bodyPart to inProgress so other people can't draw on the same part
    this.drawingRef = db.ref(`drawings/${drawingId}/parts/${bodyPart}`);
    this.drawingRef.child('inProgress').set(true);
    this.drawingRef.child('uid').set(auth.currentUser.uid);
    // Remove inProgress status if user logs off without finishing
    this.drawingRef.child('inProgress').onDisconnect().set(false);
  }

  componentWillUnmount() {
    // Remove uid and inProgress if user leaves route without submitting
    if (this.drawingRef && !this.state.drawingSubmitted) {
      this.drawingRef.child('inProgress').set(false);
    }
  }

  handleSubmit(lines) {
    submitDrawing({
      drawingId: this.props.match.params.id,
      lines: lines,
      bodyPart: this.state.bodyPart
    });
    this.setState({drawingSubmitted: true});
    this.props.history.push("/thank-you");
  }

  render() {
    return this.state.isLoading ? (
      <View isVisible isVcentered>
        <Loader />
      </View>
    ) : (
      <div>
        <Rotater />
        <DrawArea
          bodyPart={this.state.bodyPart}
          drawingData={this.state.drawingData}
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default DrawingScreen;
