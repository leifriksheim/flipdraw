import React from "react";
import autoBind from "react-autobind";
import { Link } from "react-router-dom";

import { auth } from "../firebase";
import { getAllDrawings } from "../firebase/drawings";

import Loader from "../components/Loader";
import View from "../components/View";

class AllDrawingsPublic extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      allDrawings: [],
      isLoading: true
    };
  }

  async componentDidMount() {
    const currentUser = auth.currentUser;
    const allDrawings = (await getAllDrawings()) || {};
    this.setState({
      allDrawings: allDrawings,
      isLoading: false
    });
  }

  filterCompleted(drawing) {
    const { head = {}, body = {}, legs = {} } = drawing.parts;
    return head.isFinished && body.isFinished && legs.isFinished;
  }

  render() {
    const { isLoading, allDrawings } = this.state;

    return isLoading ? (
      <View isVisible isVcentered>
        <Loader />
      </View>
    ) : (
      <View isVisible isVcentered isScrolling>
        <p>All Drawings!</p>
        {Object.keys(allDrawings)
          .filter(id => this.filterCompleted(allDrawings[id]))
          .map((id, index) => {
            return (
              <Link to={`/drawing/${id}`} key={id}>
                View Drawing {index + 1}: {id}
              </Link>
            );
          })}
      </View>
    );
  }
}

export default AllDrawingsPublic;
