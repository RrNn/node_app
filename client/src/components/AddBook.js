import React, { useState } from 'react';
// import { useQuery, gql } from '@apollo/client';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
import Error from 'components/error';
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from '../queries/queries';

const AddBook = ({ getAuthorsQuery, addBookMutation }) => {
  const [state, setState] = useState({ name: '', genre: '', authorId: '' });

  const submitForm = (event) => {
    event.preventDefault();
    addBookMutation({
      variables: state,
      refetchQueries: [{ query: getBooksQuery }],
    });
  };
  const { authors = [], error: { graphQLErrors } = {} } = getAuthorsQuery || {};
  return (
    <>
      {graphQLErrors ? <Error errors={graphQLErrors} /> : null}
      <form onSubmit={submitForm} className="add-book-form">
        <input
          type="text"
          name="name"
          className="form-control m-2"
          placeholder="Book Name"
          autoComplete="off"
          onChange={(e) => setState({ ...state, name: e.target.value })}
        />
        <input
          type="text"
          name="genre"
          className="form-control m-2"
          placeholder="Book Genre"
          autoComplete="off"
          onChange={(e) => setState({ ...state, genre: e.target.value })}
        />
        <select
          name="author"
          className="custom-select custom-select-lg m-2"
          onChange={(e) => setState({ ...state, authorId: e.target.value })}
        >
          <option value="">Select author...</option>
          {authors.map((author) => {
            {
              return (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              );
            }
          })}
        </select>
        <button
          type="submit"
          className="btn btn-secondary btn-lg btn-block m-2"
        >
          add book
        </button>
      </form>
    </>
  );
};
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
