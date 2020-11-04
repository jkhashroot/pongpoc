import React, { Component } from 'react';
import Game from './Game';
import Header from './Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />

        <Game />
      </div>
    );
  }
}

export default App;
