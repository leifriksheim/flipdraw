import React from "react";
import autoBind from "react-autobind";
import Loader from "../components/Loader";
import View from "../components/View";
import Drawing from "../components/Drawing";

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
    const { isLoading, drawingData } = this.state;

    return isLoading ? (
      <View isVisible isVcentered>
        <Loader />
      </View>
    ) : (
      <div>
        <Drawing
          head={drawingData.parts.head}
          body={drawingData.parts.body}
          legs={drawingData.parts.legs}
        />
      </div>
    );
  }
}

export default SingleDrawing;
