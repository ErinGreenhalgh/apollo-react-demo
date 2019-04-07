import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import AddressBook from './addressBook';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <AddressBook />
        </header>
      </div>
    );
  }
}

export default App;
