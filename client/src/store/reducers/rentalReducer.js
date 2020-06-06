import { FETCH_RENTALS, FETCH_RENTAL, ERRORS } from '../actions/types';

const initialState = {
    rentals: [],
    rental: {},
    errors: []
}

const rentalReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_RENTALS:
            return {
                ...state,
                rentals: action.rentals
            }
        case FETCH_RENTAL:
            return {
                ...state,
                rental: action.rental
            }
        case ERRORS:
                return {
                    ...state,
                    errors: action.errors
                }
        default:
            return state
    }
}

export default rentalReducer;