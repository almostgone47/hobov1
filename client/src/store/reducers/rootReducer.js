import { combineReducers } from 'redux';

import rentalReducer from './rentalReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    rentalData: rentalReducer
});

export default rootReducer;