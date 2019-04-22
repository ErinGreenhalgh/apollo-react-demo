import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import UpdateAddress from './updateAddress';

export interface IAddress {
  id: string;
  name: string;
  streetAddress: string,
  postalCode: string;
  state: string;
  primary: boolean;
}

const AddressBook = () => {
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
            {!loading && !error && <UpdateAddress addresses={data.addresses}/>}
          </React.Fragment>
        );
      }
      }
    </ Query >
  )
}

export default AddressBook;