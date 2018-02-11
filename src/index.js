import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'

import App from './App';
import './styles/sanitize.css';
import './index.css';

ReactDOM.render((
  <BrowserRouter>
    <App /> 
  </BrowserRouter>
), document.getElementById('root'));
registerServiceWorker();
