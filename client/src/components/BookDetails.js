import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getBookQuery } from 'queries/queries';
import Error from 'components/error';

const BookDetails = ({ data }) => {
  const { loading, book, error: { graphQLErrors } = {} } = data;
  return (
    <div id="book-details">
      <p>Book Details</p>
      {graphQLErrors ? <Error errors={graphQLErrors} /> : null}
      {loading ? 'Loading...' : null}
      {book ? (
        <>
          <h3>{`${book.name} by ${book.author.name}`}</h3>
          <p>Other books by {book.author.name} are:</p>
          <ul>
            {book.author.books.map((book) => (
              <li key={book.id}>{book.name}</li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default graphql(getBookQuery, {
  options: (props) => ({
    variables: {
      id: props.bookId,
    },
  }),
})(BookDetails);
