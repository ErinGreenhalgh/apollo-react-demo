import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { IAddress } from './addressBook';

const addressMutation = gql`
mutation {
  updateAddress(where: {id: "cjtd6ms9xkg7t0947kqtv9wwx"} data: {streetAddress: "123 ELSE St"}) {
    streetAddress,
    id
  }
}
`

const GET_ADDRESSES = gql`{
  addresses {
    streetAddress
    id
    primary
  }
}
`

function updateCache(cache:any, data: any) {
  const addressData = cache.readQuery({query: GET_ADDRESSES});
  cache.writeQuery({
    query: GET_ADDRESSES,
    data: {addresses: addressData.addresses}
  });
  // will get the new list of addresses, but 2 will be listed as default
}

function renderAddress(address: IAddress, updateAddress: () => void) {
  return (
    <div className="address-card" key={address.id}>
      <div>{address.name}</div>
      <div>{address.streetAddress}</div>
      <div>{address.postalCode}</div>
      <div>{address.state}</div>
      <div>
        <label htmlFor="primary">Primary</label>
        <input id={address.id} type="checkbox" checked={address.primary} onClick={updateAddress}></input>
      </div>
    </div>
  )
}

interface IProps {
  addresses: IAddress[];
}

const UpdateAddress = ({addresses}: IProps) => {
  return (
    <Mutation
      mutation={addressMutation}
      update={(cache, data) => (updateCache(cache, data))}
    >
      {
        (updateAddress,{ loading, error, data }) => {
          return(
            <React.Fragment>
              {loading && <p>LOADIN</p>}
              {error && <p>ERROR!</p>}
              {!loading && !error && addresses.map(address => (renderAddress(address, updateAddress)))}
            </React.Fragment>
            )
        }
      }
    </Mutation>
  )
}

export default UpdateAddress;