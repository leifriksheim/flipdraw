import React from 'react';
import autoBind from 'react-autobind';
import { createUser, findDrawing } from '../firebase';

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

  async startGame() {
    const userKey = createUser(this.state.userName);
    const existingDrawing = await findDrawing();
    if(existingDrawing) {
      console.log('Start drawing in existing drawing', existingDrawing);
    } else {
      console.log('Create totally new drawing here');
    }
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
