import {
  FETCH_REVIEWS,
  RESET_REVIEWS,
  CLEAN_RATING,
  SOCIAL_RATING,
  COMFORT_RATING,
  LOCATION_RATING,
  SERVICE_RATING,
  SLEEP_RATING,
  TOTAL_RATING,
} from '../actions/types';

const initialState = {
  reviews: [],
  cleanRating: 0,
  socialRating: 0,
  comfortRating: 0,
  locationRating: 0,
  serviceRating: 0,
  sleepRating: 0,
  totalAveRating: 0,
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLEAN_RATING:
      return {
        ...state,
        cleanRating: action.cleanRating,
      };
    case SOCIAL_RATING:
      return {
        ...state,
        socialRating: action.socialRating,
      };
    case COMFORT_RATING:
      return {
        ...state,
        comfortRating: action.comfortRating,
      };
    case LOCATION_RATING:
      return {
        ...state,
        locationRating: action.locationRating,
      };
    case SERVICE_RATING:
      return {
        ...state,
        serviceRating: action.serviceRating,
      };
    case SLEEP_RATING:
      return {
        ...state,
        sleepRating: action.sleepRating,
      };
    case TOTAL_RATING:
      return {
        ...state,
        totalAveRating: action.totalAveRating,
      };
    case FETCH_REVIEWS:
      return {
        ...state,
        reviews: action.reviews,
      };
    case RESET_REVIEWS:
      return {
        ...state,
        reviews: [],
      };
    default:
      return state;
  }
};

export default reviewsReducer;
