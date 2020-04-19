import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
//import Table from './components/Table';
//import Login from './components/Login';
import AppRouter from './components/AppRouter';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import Settings from './settings';
import {onError} from 'apollo-link-error';
import {HttpLink} from 'apollo-link-http';
import {ApolloLink, split} from 'apollo-link';
import { setContext } from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {AUTH_TOKEN} from './constants';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
/**
 * Change the uri to the server uri 
 */

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log(`GraphQLErrors:`, graphQLErrors);
    }

    if (networkError) {
        console.log(`NetworkErrors: `, networkError);
    }
});

const httpLink = new HttpLink({
    uri: Settings.ngrok_uri
});

const wsLink = new WebSocketLink({
  uri: Settings.socket_uri,
  options: {
    reconnect: true
  }
});


const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem(AUTH_TOKEN);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const httpAndSubscriptionLink = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink),
);


const link: ApolloLink = ApolloLink.from([errorLink, httpAndSubscriptionLink]);

const cache = new InMemoryCache();

const client = new ApolloClient({
    link,
    cache,
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  </ApolloProvider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
