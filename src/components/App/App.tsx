import './App.css';

import { ipcRenderer } from 'electron';
import React from 'react';

import { INITIALISE_TIMER } from '../../electron/channel';
import logo from './logo.svg';

class App extends React.PureComponent {
  componentDidMount() {
    ipcRenderer.send(INITIALISE_TIMER);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
