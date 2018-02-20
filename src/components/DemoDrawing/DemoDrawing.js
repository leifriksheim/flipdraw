import React from "react";
import autoBind from "react-autobind";
import { Link } from "react-router-dom";
import "./index.css";

import { delay } from "../../utilities/delay";
import demoDrawingLines from "../../constants/demoDrawing";

class DemoDrawing extends React.Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      lines: demoDrawingLines
    };
  }

  componentDidMount() {
    this.replayDrawing();
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
          await delay(10);
        }
      }

      // Re-enable drawing
      this.setState({
        isReplaying: false
      });
    };

    startReplay();
  }

  render() {
    return (
      <div className="demo-drawing">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMinYMin meet">
          {this.state.lines.map((line, index) => (
            <DrawingLine key={index} line={line} />
          ))}
        </svg>
        <div className="demo-drawing-info">
          <Link to="/drawings/testID">
            Drawing by Sammy345, Paul Smith and Sewerboy34
          </Link>
        </div>
      </div>
    );
  }
}

function DrawingLine({ line }) {
  const pathData =
    "M " +
    line
      .map(p => {
        return `${p.x} ${p.y}`;
      })
      .join(" L ");

  return <path className="demo-drawing__path" d={pathData} />;
}

export default DemoDrawing;
