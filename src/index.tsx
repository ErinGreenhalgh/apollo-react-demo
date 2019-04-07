import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

const client = new ApolloClient({
  uri: 'https://api-useast.graphcms.com/v1/cjtd68sm976tp01dnyxcrrzq3/master',
})

// what is different about this request than the one gaphCMS is making?
// how to pass variables into this query?
client.query({
  query: gql`
  {
    content {
      addresses {
        edges {
          node {
            id
          }
        }
      }
    }
  }
  `
}).then( result => { console.log("RESULT:", result)})



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
