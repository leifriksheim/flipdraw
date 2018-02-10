import React, { Component } from "react";
// TODO: Add router here with the screens
import "./App.css";
import StartScreen from './routes/StartScreen.js';
import DrawingScreen from './routes/DrawingScreen.js';
import DrawArea from './components/DrawArea'

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
