import React from "react";
import DrawArea from "../components/DrawArea";
import autoBind from "react-autobind";
import {
  submitDrawing,
  getRandomBodypart
} from "../firebase/";

class DrawingScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      bodyPart: "",
    };
  }

  async componentDidMount() {
    const bodyPart = await getRandomBodypart(this.props.match.params.id);
    this.setState({
      bodyPart: bodyPart
    });
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
