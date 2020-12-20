import React from 'react';

const Error = ({ errors = [] }) => (
  <div className="alert alert-danger">
    <ul className="list-unstyled">
      {errors.map(({ message }, i) => (
        <li key={i}>{message}</li>
      ))}
    </ul>
  </div>
);

export default Error;
