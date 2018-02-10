import React from "react";
import autoBind from 'react-autobind';
import "./DrawArea.css";

import config from '../../constants/config';

class DrawArea extends React.Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      lines: [],
      isDrawing: false
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

  relativeCoordinatesForEvent(e) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    const { left, top, width, height } = boundingRect;
    const deltaX = config.CANVAS_WIDTH / width;
    const deltaY = config.CANVAS_HEIGHT / height;

    return {
      x: (e.clientX - left) * deltaX,
      y: (e.clientY - top) * deltaY,
    };
  }

  render() {
    return (
      <div className="draw-area-wrapper">
        <section
          className="draw-area"
          ref="drawArea"
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          >
          <Drawing lines={this.state.lines} />
        </section>
      </div>
    );
  }
}

function Drawing({ lines }) {
  return (
    <svg className="drawing" viewBox="0 0 1920 1080" preserveAspectRatio="xMinYMin meet">
      {lines.map((line, index) => <DrawingLine key={index} line={line} />)}
    </svg>
  );
}

function DrawingLine({ line }) {
  const pathData =
    "M " +
    line
      .map(p => {
        return `${p.x} ${p.y}`;
      })
      .join(" L ");

  return <path className="drawing__path" d={pathData} />;
}

export default DrawArea;
