import React from "react";
import DrawArea from "../components/DrawArea";
import autoBind from "react-autobind";
import Rotater from "../components/Rotater";
import Loader from "../components/Loader";
import View from "../components/View";

import { db } from "../firebase";
import { pickBodyPart } from "../utilities/drawing";
import { submitDrawing, getDrawingById } from "../firebase/drawings";

class DrawingScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      drawingData: {},
      bodyPart: "",
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
    this.inProgress = db.ref(
      `drawings/${drawingId}/parts/${bodyPart}/inProgress`
    );
    this.inProgress.set(true);
    // Remove inProgress status if user logs off without finishing
    this.inProgress.onDisconnect().set(false);
  }

  componentWillUnmount() {
    // Remove inProgress status if user submits drawing or leaves the route
    this.inProgress.set(false);
  }

  handleSubmit(lines) {
    submitDrawing({
      drawingId: this.props.match.params.id,
      lines: lines,
      bodyPart: this.state.bodyPart
    });
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
