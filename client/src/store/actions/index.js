import axios from 'axios';
import jwt from 'jsonwebtoken';

import { FETCH_RENTALS, FETCH_RENTAL, CURRENT_USER, ERRORS } from './types';

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

export const fetchRentals = () => {
    return dispatch => {
        axios.get('/api/v1/rentals')
            .then(rentals => dispatch(setRentals(rentals.data)))
            .catch(err => console.log('error getting rentals: ', err))
    }
}
export const fetchRental = id => {
    return dispatch => {
        axios.get(`/api/v1/rentals/${id}`)
            .then(rental => dispatch(setRental(rental.data)))
            .catch(err => console.log('error getting rental: ', err))
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
    localStorage.removeItem('hobov_token');
    return dispatch => {
        dispatch(setCurrentUser(null))
    }
}

export const checkAuthState = () => {
    let token = localStorage.getItem('hobov_token') || null;
    // check to make sure token has not expired, if it has make current_user null
    return dispatch => {
        token = token && new window.Date(jwt.decode(token).exp * 1000) > new window.Date() ? token : null;
        dispatch(setCurrentUser(jwt.decode(token)))
    }
}