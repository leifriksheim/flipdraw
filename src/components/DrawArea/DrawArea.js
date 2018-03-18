import React from "react";
import autoBind from "react-autobind";
import cx from "classnames";
import { withRouter } from "react-router-dom";
import { delay } from "../../utilities/delay";
import { toggleFullScreen } from "../../utilities/dom";
import { findOverlaps } from "../../utilities/drawing";
import "./index.css";

import View from "../View";
import Canvas from "../Canvas";
import Overlap from "../Overlap";
import Button from "../Button";
import Notification from "../Notification";
import Toolbar from "../Toolbar";
import ToolbarDesktop from "../ToolbarDesktop";

class DrawArea extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      lines: [],
      overlaps: findOverlaps(props.bodyPart, props.drawingData.parts),
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
      this.handleUndo();
    }
  }

  handleToggleFullScreen() {
    toggleFullScreen("drawing-area");
  }

  handleToggleMenu(e) {
    e.preventDefault();
    this.setState({
      menuVisible: !this.state.menuVisible
    });
  }

  handleUndo() {
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
    const { bodyPart, onSubmit } = this.props;
    const { lines, overlaps, isDrawing, menuVisible } = this.state;
    const drawAreaClass = cx({
      "draw-area": true,
      "--head": bodyPart === "head",
      "--body": bodyPart === "body",
      "--legs": bodyPart === "legs"
    });

    return (
      <div id="drawing-screen">
        <View isFull isVcentered isVisible={!menuVisible} id="drawing-area">
          <section
            className={drawAreaClass}
            ref="drawArea"
            onMouseDown={this.handleStartLine}
            onMouseMove={this.handleLineMove}
            onTouchStart={this.handleStartLine}
            onTouchMove={this.handleLineMove}
          >
            <Notification>
              <p>Draw the {bodyPart}!</p>
            </Notification>
            <Toolbar
              onUndo={this.handleUndo}
              onShowMenu={this.handleToggleMenu}
              onFullScreen={this.handleToggleFullScreen}
              onSubmit={() => onSubmit(lines)}
              isFaded={isDrawing}
            />
            <Overlap position="top" lines={overlaps.top} />
            <Overlap position="bottom" lines={overlaps.bottom} />
            <Canvas lines={lines} />
          </section>
          <ToolbarDesktop
            onUndo={this.handleUndo}
            onSubmit={() => onSubmit(lines)}
          />
        </View>
        <View isDark isBack isVspaced isVisible={menuVisible}>
          <Button onClick={this.replayDrawing}>View replay</Button>
          <Button onClick={() => onSubmit(lines)}>Submit drawing</Button>
          <Button onClick={this.handleToggleMenu}>Close menu</Button>
        </View>
      </div>
    );
  }
}

export default withRouter(DrawArea);
