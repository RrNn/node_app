import React, { useState } from 'react';
import { flowRight as compose } from 'lodash';
import { graphql } from '@apollo/client/react/hoc';
import { addAuthorMutation, getAuthorsQuery } from 'queries/queries';

const AddAuthor = ({ addAuthorMutation }) => {
  const [form, setForm] = useState({ name: '', age: '' });
  const onSubmit = async (event) => {
    event.preventDefault();
    const result = await addAuthorMutation({
      variables: form,
      refetchQueries: [{ query: getAuthorsQuery }],
    });
    if (result) setForm({ ...form, name: '', age: '' });
  };
  return (
    <form onSubmit={onSubmit}>
      <legend>Form title</legend>

      <div className="form-group">
        <input
          type="text"
          className="form-control"
          value={form.name}
          placeholder="Name"
          onChange={({ target: { value } }) =>
            setForm({ ...form, name: value })
          }
        />
      </div>
      <div className="form-group">
        <input
          type="number"
          className="form-control"
          value={form.age}
          placeholder="Age"
          onChange={({ target: { value } }) =>
            setForm({ ...form, age: parseInt(value) })
          }
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Create Author
      </button>
    </form>
  );
};

export default compose(
  graphql(addAuthorMutation, { name: 'addAuthorMutation' })
)(AddAuthor);
