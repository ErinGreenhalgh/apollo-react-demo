import React from 'react';

interface IAddress {
  name: string;
  streetAddress: string,
  postalCode: string;
  state: string;
  default: boolean;
}

const address: IAddress = {
  name: "Mr. Guy",
  streetAddress: '123 Great St.',
  postalCode: '11111',
  state: "Colorado",
  default: true,
}

export default class AddressBook extends React.Component {
  constructor() {
    super({});
    this.renderAddress = this.renderAddress.bind(this);
  }

  renderAddress(address: IAddress) {
    return (
      <React.Fragment>
        <div>{address.name}</div>
        <div>{address.streetAddress}</div>
        <div>{address.postalCode}</div>
        <div>{address.state}</div>
        <div>
          <label htmlFor="default">Default</label>
          <input id="default" type="checkbox" checked={true}></input>
        </div>
      </React.Fragment>
    )
  }
  render() {
    return (
      <React.Fragment>
        <header>My Address Book</header>
        {this.renderAddress(address)}
      </React.Fragment>
    
    )
  }
}