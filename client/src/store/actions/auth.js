import axios from 'axios';
import jwt from 'jsonwebtoken';

import { deleteAuthToken, getAuthToken } from '../../helpers/AuthToken';

import { CURRENT_USER } from './types';
import { setErrors } from './errors';

export const setCurrentUser = currentUser => {
    return {
        type: CURRENT_USER,
        currentUser
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