import React from "react";
import DrawArea from "../components/DrawArea";
import autoBind from "react-autobind";
import { firebase, db, submitDrawing, getRandomBodypart } from "../firebase/";

class DrawingScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      bodyPart: ""
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
      bodyPart: bodyPart
    });
    // Set the given bodyPart to inProgress so other people can't draw on the same part
    this.inProgress = db.ref(
      `drawings/${drawingId}/parts/${bodyPart}/inProgress`
    );
    this.inProgress.set(true);
    // Remove inProgress status if user logs off without finishing
    this.inProgress.onDisconnect().set(false);
  }

  componentDidUnmount() {
    // Remove inProgress status if user submits drawing or leaves the route
    this.inProgress.set(false);
  }

  submit(drawingData) {
    submitDrawing({
      drawingId: this.props.match.params.id,
      drawingData: drawingData,
      bodyPart: this.state.bodyPart
    });
    this.props.history.push("/thank-you");
  }

  render() {
    return (
      <div className="section --full-height --center-v --center-h">
        <DrawArea submit={this.submit} />
      </div>
    );
  }
}

export default DrawingScreen;
