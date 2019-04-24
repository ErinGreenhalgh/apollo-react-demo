import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

interface IAddress {
  id: string;
  streetAddress: string,
  city: string;
  state: string;
  postalCode: string;
}

const AddressBook = () => {
  function renderAddress(address: IAddress) {
    return (
      <div className="address-card" key={address.id}>
        <div>{address.streetAddress}</div>
        <div>{address.city}, {address.state} {address.postalCode}</div>
      </div>
    )
  }

  return (
    <Query
    query = {
      gql`{
        addresses {
          id
          streetAddress
          city
          state
          postalCode
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
