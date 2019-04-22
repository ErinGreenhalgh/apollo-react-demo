import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { IAddress } from './addressBook';


const addressMutation = gql`
mutation($id: ID) {
  updateAddress(where: {id: $id} data: {primary: true}) {
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

function updateCache(cache:any, data: any, id: string) {
  const addressData = cache.readQuery({query: GET_ADDRESSES}); 
  const oldPrimary = addressData.addresses.find((address: IAddress) => (address.primary  && address.id !== id));
  const newPrimary = addressData.addresses.find((address: IAddress) => (address.id !== id));
  oldPrimary.primary = false;
  newPrimary.primary = true;

  cache.writeQuery({
    query: GET_ADDRESSES,
    data: {addresses: addressData.addresses}
  });
  // will get the new list of addresses, but 2 will be listed as default
}

function renderAddress(address: IAddress, onMakePrimary: (event:any) => void) {
  return (
    <div className="address-card" key={address.id}>
      <div>{address.name}</div>
      <div>{address.streetAddress}</div>
      <div>{address.postalCode}</div>
      <div>{address.state}</div>
      <div>
        <label htmlFor="primary">Primary</label>
        <input id={address.id} type="checkbox" defaultChecked={address.primary} onClick={onMakePrimary}></input>
      </div>
    </div>
  )
}

interface IProps {
  addresses: IAddress[];
}

interface IState {
  primaryId: string;
}

class UpdateAddress extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      primaryId: this.primaryAddressId,
    }
  }

  get primaryAddressId(): string {
   const primaryAddress =  this.props.addresses.find(address => (address.primary === true))
   if (primaryAddress) return primaryAddress.id;
   return '';
  }

  handleMakePrimary(event:any, updateAddress:any) {
    this.setState({ primaryId: event.target.id }, 
      () => (updateAddress({variables: {id: event.target.id}}))
    );
  }

  render() {
    console.log("ADDRESSES:", this.props.addresses)
    return (
      <Mutation
        mutation={addressMutation}
        update={(cache, data) => (updateCache(cache, data, this.state.primaryId))}
      >
        {
          (updateAddress,{ loading, error, data }) => {
            return(
              <React.Fragment>
                {loading && <p>LOADIN</p>}
                {error && <p>ERROR!</p>}
                {!loading && !error && this.props.addresses.map(address => (renderAddress(address, () => (this.handleMakePrimary(event, updateAddress)))))}
              </React.Fragment>
              )
          }
        }
      </Mutation>
    )
  }
  
}

export default UpdateAddress;