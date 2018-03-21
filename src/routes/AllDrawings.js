import React from "react";
import autoBind from "react-autobind";
import { Link } from "react-router-dom";

import { auth } from "../firebase";
import { getUserDrawings } from "../firebase/drawings";

import View from "../components/View";
import Loader from "../components/Loader";
import Drawing from "../components/Drawing";

class AllDrawings extends React.Component {
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
    const allDrawings = (await getUserDrawings(currentUser.uid)) || {};
    this.setState({
      allDrawings: allDrawings,
      isLoading: false
    });
  }

  render() {
    const { isLoading, allDrawings } = this.state;

    return isLoading ? (
      <View isVisible isVcentered>
        <Loader />
      </View>
    ) : (
      <View isVisible isVcentered>
        <p>Drawings!</p>
        {Object.keys(allDrawings).map((id, index) => {
          return (
            <Link to={`/drawing/${id}`} key={id}>
              {/* <Drawing
                head={allDrawings[id].parts.head}
                body={allDrawings[id].parts.body}
                legs={allDrawings[id].parts.legs}
              /> */}
              View Drawing {index + 1}: {id}
            </Link>
          );
        })}
      </View>
    );
  }
}

export default AllDrawings;
