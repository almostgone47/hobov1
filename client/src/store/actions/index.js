import axios from 'axios';
import jwt from 'jsonwebtoken';

import { deleteAuthToken, getAuthToken } from '../../helpers/AuthToken';

import { FETCH_RENTALS, FETCH_RENTAL, FETCH_RENTAL_LOCATION, CURRENT_USER, RESET_RENTAL, ERRORS } from './types';

export const setErrors = (errors) => {
    return {
        type: ERRORS,
        errors
    }
}

export const setCurrentUser = (currentUser) => {
    return {
        type: CURRENT_USER,
        currentUser
    }
}

export const setRentals = (rentals) => {
    return {
        type: FETCH_RENTALS,
        rentals
    }
}

export const setRental = (rental) => {
    return {
        type: FETCH_RENTAL,
        rental
    }
}

export const setRentalLocation = (rentalLocation) => {
    return {
        type: FETCH_RENTAL_LOCATION,
        rentalLocation
    }
}

export const resetRental = () => {
    return {
        type: RESET_RENTAL,
        rentalLocation: {}
    }
}


export const fetchRentals = () => {
    return dispatch => {
        axios.get('/api/v1/rentals')
            .then(rentals => dispatch(setRentals(rentals.data)))
            .catch(err => console.log('error getting rentals: ', err))
    }
}
export const fetchRental = (id) => {
    return dispatch => {
        axios.get(`/api/v1/rentals/${id}`)
            .then(rental => dispatch(setRental(rental.data)))
            .catch(err => console.log('error getting rental: ', err))
    }
}
export const fetchRentalLocation = (inputAddress, apiKey) => {
    return dispatch => {
        axios.get(`https://api.tomtom.com/search/2/geocode/${inputAddress}.JSON?key=${apiKey}`)
            .then((res) => dispatch(setRentalLocation(res.data.results[0].position)))
            .catch(err => console.log('error getting rental geolocation: ', err))
    }
}

export const registerUser = (userData, history) => {
    return dispatch => {
        axios.post('/api/v1/users/register', userData)
            .then(user => dispatch(setCurrentUser(user)))
            .then(() => history.push('/'))
            .catch(err => dispatch(setErrors(err.response.data.errors)))
    }
}

export const loginUser = (userData, history) => {
    return dispatch => {
        let userStore = '';
        axios.post('/api/v1/users/login', userData)
            .then(user => userStore = user)
            .then(() => localStorage.setItem('hobov_token', userStore.data))
            .then(() => dispatch(setCurrentUser(jwt.decode(userStore.data))))
            .then(() => history.push('/'))
            .catch(err => dispatch(setErrors(err.response.data.errors)))
    }
}

export const logoutUser = () => {
    deleteAuthToken();
    return dispatch => {
        dispatch(setCurrentUser(null))
    }
}

export const checkAuthState = () => {
    let token = getAuthToken();
    return dispatch => {
        dispatch(setCurrentUser(jwt.decode(token)))
    }
}