import axios from 'axios';
import { getAuthConfig } from '../../helpers/AuthToken';
import {
  RESET_REVIEWS,
  FETCH_REVIEWS,
  CLEAN_RATING,
  SOCIAL_RATING,
  COMFORT_RATING,
  LOCATION_RATING,
  SERVICE_RATING,
  SLEEP_RATING,
  TOTAL_RATING,
} from '../actions/types';
import { setErrors } from './errors';

export const setClean = (cleanRating) => {
  return {
    type: CLEAN_RATING,
    cleanRating,
  };
};

export const setSocial = (socialRating) => {
  return {
    type: SOCIAL_RATING,
    socialRating,
  };
};

export const setComfort = (comfortRating) => {
  return {
    type: COMFORT_RATING,
    comfortRating,
  };
};

export const setLocation = (locationRating) => {
  return {
    type: LOCATION_RATING,
    locationRating,
  };
};

export const setService = (serviceRating) => {
  return {
    type: SERVICE_RATING,
    serviceRating,
  };
};

export const setSleep = (sleepRating) => {
  return {
    type: SLEEP_RATING,
    sleepRating,
  };
};

export const setTotalAve = (totalAveRating) => {
  return {
    type: TOTAL_RATING,
    totalAveRating,
  };
};

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

export const fetchRentalReviews = (rentalId) => {
  return (dispatch) => {
    axios
      .get(`/api/v1/reviews/rental/${rentalId}`)
      .then((res) => dispatch(setReviews(res.data)))
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
