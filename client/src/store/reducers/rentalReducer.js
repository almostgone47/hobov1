import { FETCH_RENTALS, FETCH_RENTAL } from '../actions/types';

const initialState = {
    rentals: [],
    rental: {}
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
        default:
            return state
    }
}

export default rentalReducer;