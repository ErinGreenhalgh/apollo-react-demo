import React, { Component } from 'react';
import './App.css';
import AddressBook from './addressBook';

class App extends Component {
  render() {
    return (
      <div className="App App-header">
        <header>My Address Book</header>
        <AddressBook />
      </div>
    );
  }
}

export default App;
