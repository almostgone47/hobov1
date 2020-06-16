import axios from 'axios';
import { getAuthConfig } from '../../helpers/AuthToken';

export const createBooking = booking => {
    const config = getAuthConfig()
    return axios.post('/api/v1/bookings/new', booking, config)
        .then(res => res.data)
        .catch(err => console.log('Error creating new booking: ', err))
}

export const getBookings = rentalId => {
    console.log('getBookings ACTION: ', rentalId)
    return axios.get(`/api/v1/bookings?${rentalId}`)
        .then(res => res.data)
        .catch(err => console.log('Error getting bookings: ', err))
}