import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
//import Table from './components/Table';
//import Login from './components/Login';
import AppRouter from './components/AppRouter';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

/**
 * Change the uri to the server uri 
 */
const client = new ApolloClient({
  uri: 'https://14318ce9.ngrok.io/graphql',
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
