/* eslint-disable */
import React from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, deleteAuthorMutation } from 'queries/queries';
import AddAuthor from 'components/addAuthor';
import Error from 'components/error';

const Authors = ({ getAuthorsQuery, deleteAuthorMutation }) => {
  const {
    loading,
    authors = [],
    error: { graphQLErrors } = {},
    refetch: refetchAuthors,
  } = getAuthorsQuery;

  const deleteAuthor = async (authorId) => {
    const results = await deleteAuthorMutation({
      variables: { id: authorId },
    });
    if (results) refetchAuthors();
  };
  return (
    <div className="author-list">
      {graphQLErrors ? <Error errors={graphQLErrors} /> : null}
      {loading ? <div>Loading...</div> : null}
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {authors.map(({ name, id, age }) => (
            <tr key={id}>
              <td>{name}</td>
              <td>{age}</td>
              <td>
                <button type="button" className="btn btn-primary">
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => deleteAuthor(id)}
                  type="button"
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddAuthor />
    </div>
  );
};
// export default graphql(getAuthorsQuery)(Authors);
export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(deleteAuthorMutation, { name: 'deleteAuthorMutation' })
)(Authors);
