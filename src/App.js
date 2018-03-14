import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import autoBind from "react-autobind";
import { isAuthenticated } from "./firebase";

import AuthHOC from "./components/AuthHOC";
import StartScreen from "./routes/StartScreen";
import DrawingScreen from "./routes/DrawingScreen";
import ThankYouScreen from "./routes/ThankYouScreen";
import AllDrawings from "./routes/AllDrawings";
import SingleDrawing from "./routes/SingleDrawing";

import "./App.css";

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
          <ProtectedRoute path="/draw/:id" component={DrawingScreen} />
          <ProtectedRoute path="/drawing/:id" component={SingleDrawing} />
          <ProtectedRoute path="/thank-you" component={ThankYouScreen} />
          <ProtectedRoute path="/all-drawings" component={AllDrawings} />
        </Switch>
      </main>
    );
  }
}

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={renderProps =>
      isAuthenticated() ? (
        <Component {...renderProps} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: renderProps.location }
          }}
        />
      )
    }
  />
);

export default AuthHOC(App);
