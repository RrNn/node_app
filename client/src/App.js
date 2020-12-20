import React from 'react';
import './index.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Nav from 'components/nav';
import { GraphQLURL } from 'config';

const client = new ApolloClient({
  uri: GraphQLURL,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Nav />
    </ApolloProvider>
  );
}

export default App;
