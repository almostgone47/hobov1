import { combineReducers } from 'redux';

import rentalReducer from './rentalReducer';

const rootReducer = combineReducers({
    rentalData: rentalReducer
});

export default rootReducer;