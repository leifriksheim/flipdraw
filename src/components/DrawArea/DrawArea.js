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
    document.addEventListener("mouseup", this.handleLineEnd);
    document.addEventListener("touchEnd", this.handleLineEnd);
    document.addEventListener("keydown", this.handleShortCuts);

    const bodyPart = await getRandomBodypart(this.props.drawingId);
    this.setState({
      bodyPart: bodyPart
    });
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleLineEnd);
    document.removeEventListener("touchEnd", this.handleLineEnd);
    document.removeEventListener("keydown", this.handleShortCuts);
  }

  handleStartLine(e) {
    const { isReplaying } = this.state;
    const isMouseMove = e.button === 0;
    const isTouchMove = e.touches && e.touches.length === 1;

    // Return if event doesn't match above checks
    if ((!isMouseMove && !isTouchMove) || isReplaying) {
      return;
    }

    const input = isMouseMove ? e : e.touches[0];
    const point = this.relativeCoordinatesForEvent(input);

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

  handleLineMove(e) {
    if (!this.state.isDrawing) {
      return;
    }
    const isMouseMove = e.button === 0;
    const input = isMouseMove ? e : e.touches[0];
    const point = this.relativeCoordinatesForEvent(input);

    const lines = [...this.state.lines];
    lines[lines.length - 1].push(point);

    this.setState({
      lines: lines
    });
  }

  handleLineEnd() {
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

  relativeCoordinatesForEvent(e) {
    const {
      clientWidth,
      clientHeight,
      offsetLeft,
      offsetTop
    } = this.refs.drawArea;
    return {
      x: (e.clientX - offsetLeft) * 1920 / clientWidth,
      y: (e.clientY - offsetTop) * 1080 / clientHeight
    };
  }

  render() {
    return (
      <section
        className="draw-area"
        ref="drawArea"
        onMouseDown={this.handleStartLine}
        onMouseMove={this.handleLineMove}
        onTouchStart={this.handleStartLine}
        onTouchMove={this.handleLineMove}
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
