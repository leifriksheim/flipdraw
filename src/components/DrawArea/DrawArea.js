import React from "react";
import autoBind from "react-autobind";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import { delay } from "../../utilities/delay";
import "./index.css";

import View from "../View";
import Drawing from "./Drawing.js";
import MenuBtn from "../MenuBtn";
import UndoBtn from "../UndoBtn";
import Button from "../Button";
import Notification from "../Notification";

class DrawArea extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      lines: [],
      isDrawing: false,
      isReplaying: false,
      menuVisible: false
    };
  }

  async componentDidMount() {
    document.addEventListener("mouseup", this.handleLineEnd);
    document.addEventListener("touchEnd", this.handleLineEnd);
    document.addEventListener("keydown", this.handleShortCuts);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleLineEnd);
    document.removeEventListener("touchEnd", this.handleLineEnd);
    document.removeEventListener("keydown", this.handleShortCuts);
  }

  handleStartLine(e) {
    // Abort if target is menu or undobutton
    if (e.target.dataset.stopBubbling) {
      return;
    }
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
      menuVisible: false,
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
    // Abort if target is menu or undobutton
    if (e.target.dataset.stopBubbling) {
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

  toggleMenu(e) {
    e.preventDefault();
    this.setState({
      menuVisible: !this.state.menuVisible
    });
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
    const drawAreaClass = cx({
      "draw-area": true,
      "--head": this.props.bodyPart === "head",
      "--body": this.props.bodyPart === "body",
      "--legs": this.props.bodyPart === "legs"
    });
    return (
      <div>
        <View isFull isVcentered isVisible={!this.state.menuVisible}>
          <section
            className={drawAreaClass}
            ref="drawArea"
            onMouseDown={this.handleStartLine}
            onMouseMove={this.handleLineMove}
            onTouchStart={this.handleStartLine}
            onTouchMove={this.handleLineMove}
          >
            <Notification>
              <p>Draw the {this.props.bodyPart}!</p>
            </Notification>
            <Drawing lines={this.state.lines} />
            <MenuBtn onClick={this.toggleMenu} />
            <UndoBtn onClick={this.undoLastPath} />
          </section>
        </View>
        <View isDark isBack isVspaced isVisible={this.state.menuVisible}>
          <Button onClick={this.replayDrawing}>View replay</Button>
          <Button onClick={() => this.props.onSubmit(this.state.lines)}>
            Submit drawing
          </Button>
          <Button onClick={this.toggleMenu}>Close menu</Button>
        </View>
      </div>
    );
  }
}

export default withRouter(DrawArea);
