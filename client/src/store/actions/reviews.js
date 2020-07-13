import axios from 'axios';
import { getAuthConfig } from '../../helpers/AuthToken';
import { RESET_REVIEWS, FETCH_REVIEWS } from '../actions/types';
import { setErrors } from './errors';

export const setReviews = (reviews) => {
  return {
    type: FETCH_REVIEWS,
    reviews,
  };
};

export const resetReviews = () => {
  return {
    type: RESET_REVIEWS,
  };
};

export const getRentalReviews = () => {
  const config = getAuthConfig();

  return (dispatch) => {
    axios
      .get('/api/v1/reviews/rental', config)
      .then((res) => dispatch(setReviews(res.data.reviews)))
      .catch((err) => Promise.reject(err.response.data.errors) || []);
  };
};

export const getUserReviews = () => {
  const config = getAuthConfig();

  return (dispatch) => {
    axios
      .get('/api/v1/reviews/user', config)
      .then((res) => dispatch(setReviews(res.data.reviews)))
      .catch((err) => Promise.reject(err.response.data.errors) || []);
  };
};

export const createReview = (review, bookingId) => {
  const config = getAuthConfig();
  review.booking = bookingId;
  console.log('CREATE REVIEW ACTION: ', review);
  // NEED TO CONCAT NEW REVIEW TO OLD REVIEWS TO UPDATE WHEN REVIEW IS SUBMITTED
  return (dispatch) => {
    axios
      .post('/api/v1/reviews/new', review, config)
      .then((res) => dispatch(setReviews(res.data.review)))
      .catch((err) => dispatch(setErrors(err.response.data.errors)));
  };
};
