import React from "react";
import "./DrawArea.css";

class DrawArea extends React.Component {
  constructor() {
    super();

    this.state = {
      lines: [],
      isDrawing: false
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleShortCuts = this.handleShortCuts.bind(this);
    this.undoLastPath = this.undoLastPath.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
    document.addEventListener("keydown", this.handleShortCuts);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
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
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return {
      x: mouseEvent.clientX - boundingRect.left,
      y: mouseEvent.clientY - boundingRect.top
    };
  }

  render() {
    return (
      <div
        className="draw-area"
        ref="drawArea"
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
      >
        <Drawing lines={this.state.lines} />
      </div>
    );
  }
}

function Drawing({ lines }) {
  return (
    <svg className="drawing" viewBox="0 0 1000 500" preserveAspectRatio="xMinYMin meet">
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
