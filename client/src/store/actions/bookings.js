import axios from 'axios';
import { getAuthConfig } from '../../helpers/AuthToken';
import { FETCH_BOOKING, FETCH_BOOKINGS, RESET_BOOKINGS } from '../actions/types';
import { setErrors } from './errors';

export const setBookings = bookings => {
    return {
        type: FETCH_BOOKINGS,
        bookings
    }
}

export const resetBookings = bookings => {
    return {
        type: RESET_BOOKINGS,
        bookings
    }
}

export const setBooking = booking => {
    return {
        type: FETCH_BOOKING,
        booking
    }
}

export const createBooking = booking => {
    const config = getAuthConfig()
    return dispatch => {
        axios.post('/api/v1/bookings/new', booking, config)
            .then(res => dispatch(setBookings(res.data.bookings)))
            .catch(err => dispatch(setErrors(err.response.data.errors)))
    }
}

export const getBookings = rentalId => {
    return dispatch => {
        axios.get(`/api/v1/bookings?rentalId=${rentalId}`)
            .then(res => dispatch(setBookings(res.data)))
            .catch(err => dispatch(setErrors(err.response.data.errors)))
    }
}

export const getBooking = bookingId => {
    return dispatch => {
        axios.get(`/api/v1/bookings?bookingId=${bookingId}`)
            .then(res => dispatch(setBooking(res.data)))
            .catch(err => dispatch(setErrors(err.response.data.errors)))
    }
}