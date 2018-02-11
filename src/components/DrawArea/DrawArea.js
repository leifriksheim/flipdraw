import React from "react";
import autoBind from "react-autobind";
import { withRouter } from "react-router-dom";
import "./index.css";
import {
  submitDrawing,
  getDrawingById,
  getRandomBodypart
} from "../../firebase/";
import { delay } from "../../utilities";

import Drawing from "./Drawing.js";
import Button from "../Button";

class DrawArea extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      lines: [],
      isDrawing: false,
      bodyPart: "",
      isReplaying: false
    };
  }

  async componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("keydown", this.handleShortCuts);

    const bodyPart = await getRandomBodypart(this.props.drawingId);
    this.setState({
      bodyPart: bodyPart
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("keydown", this.handleShortCuts);
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0 || this.state.isReplaying) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState({
      lines: [...this.state.lines, [point]],
      isDrawing: true
    });
  }

  replayDrawing() {
    const lines = this.state.lines;
    let newLines = [];

    // Disable drawing
    this.setState({
      isReplaying: true
    });

    const startReplay = async () => {
      // Loop through each line
      for (let line of lines) {
        newLines.push([]);

        // Loop through each "dot" in given line
        for (let dot of line) {
          newLines[lines.indexOf(line)].push(dot);
          this.setState({
            lines: newLines
          });
          await delay(20);
        }
      }

      // Re-enable drawing
      this.setState({
        isReplaying: false
      });
    };

    startReplay();
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    const lines = [...this.state.lines];
    lines[lines.length - 1].push(point);

    this.setState({
      lines: lines
    });
  }

  handleMouseUp() {
    this.setState({ isDrawing: false });
  }

  handleShortCuts(e) {
    if (e.keyCode === 90 && (e.ctrlKey || e.metaKey)) {
      this.undoLastPath();
    }
  }

  submit() {
    submitDrawing({
      drawingId: this.props.drawingId,
      drawingData: this.state.lines,
      bodyPart: this.state.bodyPart
    });
    this.props.history.push("/thank-you");
  }

  undoLastPath() {
    const lines = [...this.state.lines];
    lines.splice(lines.length - 1, 1);

    this.setState({
      lines: lines
    });
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const {
      clientWidth,
      clientHeight,
      offsetLeft,
      offsetTop
    } = this.refs.drawArea;
    return {
      x: (mouseEvent.clientX - offsetLeft) * 1920 / clientWidth,
      y: (mouseEvent.clientY - offsetTop) * 1080 / clientHeight
    };
  }

  render() {
    return (
      <section
        className="draw-area"
        ref="drawArea"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
      >
        <Drawing lines={this.state.lines} />
        <aside className="draw-area__actions">
          <Button onClick={this.replayDrawing}>Replay</Button>
          <Button onClick={this.submit}>Submit</Button>
        </aside>
      </section>
    );
  }
}

export default withRouter(DrawArea);
