import React from 'react';
import autoBind from 'react-autobind';
import { createUser } from '../firebase';

class StartScreen extends React.Component {
  constructor() {
    super();
    autoBind(this);
    this.state = {
      userName: '',
    };
  }

  updateUsername(e) {
    const userName = e.target.value;
    this.setState({
      userName: userName
    });
  }

  startGame() {
    const userKey = createUser(this.state.userName);
    console.log(userKey);
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.userName} onChange={this.updateUsername} />
        <button onClick={this.startGame}>Start Drawing!</button>
      </div>
    )
  }
}

export default StartScreen;
