import React from "react";
import DrawArea from "../components/DrawArea";
import autoBind from "react-autobind";
import Rotater from "../components/Rotater";
import Loader from "../components/Loader";
import View from "../components/View";

import { db } from "../firebase";
import { submitDrawing, getRandomBodypart } from "../firebase/drawings";

class DrawingScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      bodyPart: "",
      isLoading: true
    };
  }

  async componentDidMount() {
    // Initial data
    const drawingId = this.props.match.params.id;
    const bodyPart = await getRandomBodypart(drawingId);
    if (!bodyPart) {
      this.props.history.push("/");
    }
    // Set the random body part to state
    this.setState({
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

  handleSubmit(drawingData) {
    submitDrawing({
      drawingId: this.props.match.params.id,
      drawingData: drawingData,
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
        <DrawArea bodyPart={this.state.bodyPart} onSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default DrawingScreen;
