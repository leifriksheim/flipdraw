import React from "react";
import Drawings from "../components/DrawArea/Drawing.js";
import autoBind from "react-autobind";
import { firebase, getAllDrawings } from "../firebase/";

class AllDrawings extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      allDrawings: []
    };
  }

  async componentDidMount() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        // User is signed in.
        const uid = user.uid;
        const allDrawings = await getAllDrawings(uid);
        const allDrawingsArray = Object.keys(allDrawings).map(drawingId => {
          return allDrawings[drawingId];
        });
        this.setState({
          allDrawings: allDrawingsArray
        });
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
  }

  render() {
    return (
      <div className="section --full-height --center-v --center-h">
        {this.state.allDrawings.map((drawing, index) => {
          return <div>Drawing {index + 1}</div>;
        })}
      </div>
    );
  }
}

export default AllDrawings;
