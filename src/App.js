import React, { Component } from "react";
import "./App.css";
import DrawArea from "./components/DrawArea";

class App extends Component {
  render() {
    return (
      <div className="section --full-height --center-v --center-h">
        <DrawArea />
      </div>
    );
  }
}

export default App;
