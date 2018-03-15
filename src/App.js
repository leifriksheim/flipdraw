import React, { Component } from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
import autoBind from "react-autobind";
import { isAuthenticated } from "./firebase";

// Components
import View from "./components/View";
import Loader from "./components/Loader";
import AuthHOC from "./components/AuthHOC";

// Routes
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

  static contextTypes = {
    authLoading: PropTypes.bool.isRequired
  };

  render() {
    const { authLoading } = this.context;
    return (
      <main className="main">
        <Switch>
          <Route exact path="/" component={StartScreen} />
          <Route path="/drawing/:id" component={SingleDrawing} />
          <ProtectedRoute
            authLoading={authLoading}
            path="/draw/:id"
            component={DrawingScreen}
          />
          <ProtectedRoute
            authLoading={authLoading}
            path="/thank-you"
            component={ThankYouScreen}
          />
          <ProtectedRoute
            authLoading={authLoading}
            path="/all-drawings"
            component={AllDrawings}
          />
        </Switch>
      </main>
    );
  }
}

const ProtectedRoute = ({ component: Component, authLoading, ...rest }) => (
  <Route
    {...rest}
    render={renderProps => {
      // If loading, show loader
      if (authLoading) {
        return (
          <View isVisible isVcentered>
            <Loader />
          </View>
        );
      }

      // If user is authenticated, go to route
      if (isAuthenticated()) {
        return <Component {...renderProps} />;
      }

      // Otherwise, redirect to home
      return (
        <Redirect
          to={{
            pathname: "/",
            state: { from: renderProps.location }
          }}
        />
      );
    }}
  />
);

export default AuthHOC(App);
