import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://api-useast.graphcms.com/v1/cjtd68sm976tp01dnyxcrrzq3/master',
})

// client.mutate({
//   mutation: gql`
//     mutation {
//       updateAddress(where: {id: "cjtd6ms9xkg7t0947kqtv9wwx"} data: {streetAddress: "123 SOMETHING St"}) {
//         streetAddress,
//         id
//       }
//     }
//   `
// }).then((result) => console.log("RESULT:", result));

const ApolloWrappedApp = () => (
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider>
);



ReactDOM.render(<ApolloWrappedApp />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
