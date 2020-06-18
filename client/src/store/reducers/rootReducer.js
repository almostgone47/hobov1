import { combineReducers } from 'redux';

import rentalReducer from './rentalReducer';
import bookingReducer from './bookingReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    errorData: errorReducer,
    rentalData: rentalReducer,
    bookingData: bookingReducer
});

export default rootReducer;