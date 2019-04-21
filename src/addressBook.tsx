import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

interface IAddress {
  id: string;
  name: string;
  streetAddress: string,
  postalCode: string;
  state: string;
  primary: boolean;
}

const AddressBook = () => {
  function renderAddress(address: IAddress) {
    return (
      <div className="address-card" key={address.id}>
        <div>{address.name}</div>
        <div>{address.streetAddress}</div>
        <div>{address.postalCode}</div>
        <div>{address.state}</div>
        <div>
          <label htmlFor="default">Default</label>
          <input id="default" type="checkbox" checked={address.primary}></input>
        </div>
      </div>
    )
  }

  return (
    <Query 
    query = {
      gql`{
        addresses {
          streetAddress
          id
          primary
        }
      }
      `
    }
  >
    {
     ({loading, error, data}) => {
       return(
        <React.Fragment>
        {loading && <p>Loading...</p>}
        {error &&  <p>Error :(</p>}

        {!loading && !error && data.addresses.map((address: IAddress) => renderAddress(address))}
      </React.Fragment>
      );
     }
    }
  </ Query >
  )
}

export default AddressBook;