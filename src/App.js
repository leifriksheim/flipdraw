import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import autoBind from "react-autobind";
import "./App.css";
import StartScreen from "./routes/StartScreen.js";
import DrawingScreen from "./routes/DrawingScreen.js";
import ThankYouScreen from "./routes/ThankYouScreen.js";
import AllDrawings from "./routes/AllDrawings.js";

class App extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }

  render() {
    return (
      <main className="main">
        <Switch>
          <Route exact path="/" component={StartScreen} />
          <Route path="/draw/:id" component={DrawingScreen} />
          <Route path="/thank-you" component={ThankYouScreen} />
          <Route path="/all-drawings" component={AllDrawings} />
        </Switch>
      </main>
    );
  }
}

export default App;
