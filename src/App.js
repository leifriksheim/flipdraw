import React, { Component } from "react";
import "./App.css";
import DrawArea from "./components/DrawArea";

class App extends Component {
  render() {
    return (
      <div className="container">
        <DrawArea />
      </div>
    );
  }
}

export default App;
