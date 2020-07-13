import React from 'react';
import { useForm } from 'react-hook-form';

const reviewScores = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const NewReview = ({ createNewReview }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(createNewReview)}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          ref={register}
          name="title"
          type="text"
          className="form-control"
          id="title"
        />
      </div>

      <div className="form-group">
        <label htmlFor="body">Body</label>
        <input
          ref={register}
          name="body"
          type="text"
          className="form-control"
          id="body"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Rating</label>

        <select
          ref={register}
          name="rating"
          className="form-control"
          id="rating"
        >
          {reviewScores.map((num) => (
            <option key={num}> {num} </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-main">
        Submit
      </button>
    </form>
  );
};

export default NewReview;
