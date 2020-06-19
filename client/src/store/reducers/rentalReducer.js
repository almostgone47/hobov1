import { FETCH_RENTALS, FETCH_RENTAL, FETCH_RENTAL_LOCATION, RESET_RENTAL, SEARCH_RENTALS } from '../actions/types';

const initialState = {
    rentals: [],
    rental: {},
    rentalLocation: '',
    searchInput: ''
}

const rentalReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_RENTALS:
            return {
                ...state,
                rentals: action.rentals
            }
        case SEARCH_RENTALS:
            return {
                ...state,
                searchInput: action.searchInput
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
                rentalLocation: {},
                rental: {}
            }
        default:
            return state
    }
}

export default rentalReducer;