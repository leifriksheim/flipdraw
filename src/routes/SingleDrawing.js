import React from "react";
import autoBind from "react-autobind";
import Loader from "../components/Loader";
import View from "../components/View";

import { db } from "../firebase";
import { getDrawingById } from "../firebase/drawings";

class SingleDrawing extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      drawingData: {},
      isLoading: true
    };
  }

  async componentDidMount() {
    // Drawing data
    const drawingId = this.props.match.params.id;
    const drawingData = await getDrawingById(drawingId);

    console.log(drawingData);

    // Set the random body part to state
    this.setState({
      drawingData: drawingData,
      isLoading: false
    });
  }

  handleReplay() {
    console.log("replay");
  }

  render() {
    return this.state.isLoading ? (
      <View isVisible isVcentered>
        <Loader />
      </View>
    ) : (
      <div>
        <p>Draw here!</p>
      </div>
    );
  }
}

export default SingleDrawing;
