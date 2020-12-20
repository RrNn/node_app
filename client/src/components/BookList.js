/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './bookDetails';
import Error from 'components/error';

const BookList = ({ data }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const {
    loading,
    books = [],
    error: { graphQLErrors } = {},
    startPolling,
  } = data;
  useEffect(() => {
    startPolling(2000);
  }, []);
  return (
    <div className="book-list-and-details">
      <ul className="book-list">
        {graphQLErrors ? <Error errors={graphQLErrors} /> : null}
        {loading ? (
          <div>Loading...</div>
        ) : (
          books.map((book) => {
            return (
              <li
                className="single-book"
                key={book.id}
                onClick={(e) => {
                  setSelectedBook(book.id);
                }}
              >
                {book.name}
              </li>
            );
          })
        )}
      </ul>
      <BookDetails bookId={selectedBook} />
    </div>
  );
};

export default graphql(getBooksQuery)(BookList);
