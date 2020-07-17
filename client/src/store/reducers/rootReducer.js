import { combineReducers } from 'redux';

import rentalReducer from './rentalReducer';
import bookingReducer from './bookingReducer';
import reviewsReducer from './reviewsReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  errorData: errorReducer,
  rentalData: rentalReducer,
  reviewData: reviewsReducer,
  bookingData: bookingReducer,
});

export default rootReducer;
