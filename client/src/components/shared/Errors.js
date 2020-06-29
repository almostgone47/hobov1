import React from 'react';

const Errors = ({ errors }) => {
  if (errors && errors.length > 0) {
    return (
      <div className="alert alert-danger">
        {errors.map((error) => (
          <p key={error.title}>{error.details}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default Errors;
