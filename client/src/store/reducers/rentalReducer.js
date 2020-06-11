import { FETCH_RENTALS, FETCH_RENTAL, FETCH_RENTAL_LOCATION, RESET_RENTAL, ERRORS } from '../actions/types';

const initialState = {
    rentals: [],
    rental: {},
    rentalLocation: '',
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
        case FETCH_RENTAL_LOCATION:
            return {
                ...state,
                rentalLocation: action.rentalLocation
            }
        case RESET_RENTAL:
            return {
                ...state,
                rentalLocation: action.rentalLocation
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