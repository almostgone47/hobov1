import { FETCH_BOOKINGS, FETCH_BOOKING, RESET_BOOKINGS } from '../actions/types';

const initialState = {
    bookings: [],
    booking: {},
}

const bookingReducer = (state = initialState, action) => {
    switch(action.type) {
        case FETCH_BOOKINGS:
            return {
                ...state,
                bookings: action.bookings
            }
        case FETCH_BOOKING:
            return {
                ...state,
                booking: action.booking
            }
        case RESET_BOOKINGS:
            return {
                ...state,
                bookings: [],
            }
        default:
            return state
    }
}

export default bookingReducer;