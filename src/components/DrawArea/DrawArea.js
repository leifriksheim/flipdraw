import React from "react";
import autoBind from 'react-autobind';
import "./index.css";
import { submitDrawing } from '../../firebase/';
import { delay } from '../../utilities';

import Drawing from './Drawing.js';

class DrawArea extends React.Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      lines: [],
      isDrawing: false,
      isReplaying: false,
    };
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("keydown", this.handleShortCuts);
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
      isReplaying: true,
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
        isReplaying: false,
      });
    }

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
      drawingId: '123',
      drawingData: this.state.lines,
      bodyPart: 'head'
    })
  }

  undoLastPath() {
    const lines = [...this.state.lines];
    lines.splice(lines.length - 1, 1);

    this.setState({
      lines: lines
    });
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const {clientWidth, clientHeight, offsetLeft, offsetTop} = this.refs.drawArea;
    return {
      x: (mouseEvent.clientX - offsetLeft) * 1000/clientWidth,
      y: (mouseEvent.clientY - offsetTop) * 500/clientHeight
    }
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
        <button className="drawing-replay" onClick={this.replayDrawing}>Replay</button>
        <button className="drawing-submit" onClick={this.submit}>Submit</button>
      </section>
    );
  }
}

export default DrawArea;
