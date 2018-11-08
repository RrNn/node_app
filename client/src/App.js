import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo'
import './App.css';
import BookList from './components/BookList'
import AddBook from './components/AddBook'

const client = new ApolloClient({
  uri:'http://localhost:8000/graphql'
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
         <div className="conatiner row">
            <div className="col-md-6">
              <BookList />
            </div>
            <div className="col-md-6">
              <AddBook />
            </div>
         </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
