import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import "./App.css";
import StartScreen from './routes/StartScreen.js';
import DrawingScreen from './routes/DrawingScreen.js';

class App extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={StartScreen}/>
          <Route path='/draw' component={DrawingScreen}/>
        </Switch>
      </main>
    );
  }
}

export default App;
