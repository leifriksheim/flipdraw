import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import StartScreen from "./routes/StartScreen.js";
import DrawingScreen from "./routes/DrawingScreen.js";
import ThankYouScreen from "./routes/ThankYouScreen.js";

class App extends Component {
  render() {
    return (
      <main className="main">
        <Switch>
          <Route exact path="/" component={StartScreen} />
          <Route path="/draw/:id" component={DrawingScreen} />
          <Route path="/thank-you" component={ThankYouScreen} />
        </Switch>
      </main>
    );
  }
}

export default App;
