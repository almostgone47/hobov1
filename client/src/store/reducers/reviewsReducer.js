import { FETCH_REVIEWS, RESET_REVIEWS } from '../actions/types';

const initialState = {
  reviews: [],
};

const reviewsReducer = (state = initialState, action) => {
  switch (action.type) {
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
