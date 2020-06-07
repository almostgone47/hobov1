import jwt from 'jsonwebtoken';

export const getAuthToken = () => {
    let token = localStorage.getItem('hobov_token') || null;
    console.log('this is from getAuthToken: ', token)
    token = token && new window.Date(jwt.decode(token).exp * 1000) > new window.Date() ? token : null;
    return token;
}

export const deleteAuthToken = () => {
    localStorage.removeItem('hobov_token');
}