import React from "react";
import autoBind from 'react-autobind';
import "./DrawArea.css";

import Drawing from './Drawing.js';

class DrawArea extends React.Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      lines: [],
      isDrawing: false,
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
    if (mouseEvent.button !== 0) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState({
      lines: [...this.state.lines, [point]],
      isDrawing: true
    });
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
      </section>
    );
  }
}

export default DrawArea;
