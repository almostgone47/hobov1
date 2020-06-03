import axios from 'axios';

import { FETCH_RENTALS, FETCH_RENTAL } from './types';

export const setRentals = (rentals) => {
    return {
        type: FETCH_RENTALS,
        rentals
    }
}
export const fetchRentals = () => {
    return dispatch => {
        axios.get('/api/v1/rentals')
            .then(rentals => {
                console.log(rentals.data)
                dispatch(setRentals(rentals.data))
            })
            .catch(err => {
                console.log('error getting rentals: ', err)
            })
    }
}

export const setRental = (rental) => {
    return {
        type: FETCH_RENTAL,
        rental
    }
}
export const fetchRental = id => {
    console.log('REDUCER fetchRental() ', id)
    return dispatch => {
        axios.get(`/api/v1/rentals/${id}`)
            .then(rental => {
                dispatch(setRental(rental.data))
            })
            .catch(err => {
                console.log('error getting rental: ', err)
            })
    }
}