import React, { Component } from "react";
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import "./App.css";
import StartScreen from './routes/StartScreen.js';
import DrawingScreen from './routes/DrawingScreen.js';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={StartScreen} />
        <Route path='/draw' component={DrawingScreen} />
      </Router>
    );
  }
}

export default App;
