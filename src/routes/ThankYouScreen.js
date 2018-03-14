import React from "react";
import autoBind from "react-autobind";
import Button from "../components/Button";
import View from "../components/View";

class ThankYouScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      userName: ""
    };
  }

  handleNewDrawing() {
    this.props.history.push("/");
  }

  handleAllDrawings() {
    this.props.history.push("/all-drawings");
  }

  render() {
    return (
      <View isFull isVcentered isVisible>
        <h1 className="logo">
          <span className="logo__flipped">Thank</span>You!
        </h1>
        <Button onClick={this.handleNewDrawing}>Draw a new one</Button>
        <Button onClick={this.handleAllDrawings}>See all your drawings</Button>
      </View>
    );
  }
}

export default ThankYouScreen;
