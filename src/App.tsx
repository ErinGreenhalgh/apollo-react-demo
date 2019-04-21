import React, { Component } from 'react';
import './App.css';
import AddressBook from './addressBook';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          My Address Book
          <AddressBook />
        </header>
      </div>
    );
  }
}

export default App;
