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
        <label htmlFor="category">Clean Rating</label>

        <select
          ref={register}
          name="cleanRating"
          className="form-control"
          id="cleanRating"
        >
          {reviewScores.map((num) => (
            <option key={num}> {num} </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="category">Cleanliness</label>

        <select
          ref={register}
          name="socialRating"
          className="form-control"
          id="socialRating"
        >
          {reviewScores.map((num) => (
            <option key={num}> {num} </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="category">Comfort</label>

        <select
          ref={register}
          name="comfortRating"
          className="form-control"
          id="comfortRating"
        >
          {reviewScores.map((num) => (
            <option key={num}> {num} </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="category">Location</label>

        <select
          ref={register}
          name="locationRating"
          className="form-control"
          id="locationRating"
        >
          {reviewScores.map((num) => (
            <option key={num}> {num} </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="category">Service</label>

        <select
          ref={register}
          name="serviceRating"
          className="form-control"
          id="serviceRating"
        >
          {reviewScores.map((num) => (
            <option key={num}> {num} </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="category">Sleep Quality</label>

        <select
          ref={register}
          name="sleepRating"
          className="form-control"
          id="sleepRating"
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
