import rentalData from '../reducers/rentalData';
import { FETCH_RENTALS, FETCH_RENTAL } from './types';

export const setRentals = (rentals) => {
    return {
        type: FETCH_RENTALS,
        rentals: rentalData.rentals
    }
}
export const fetchRentals = () => {
    return {
        type: FETCH_RENTALS,
        rentals: rentalData.rentals
    }
}

export const setRental = (rental) => {
    return {
        type: FETCH_RENTAL,
        rental: rental
    }
}
export const fetchRental = id => {
    const rental = rentalData.rentals.find((rental) => {
        return rental.id === Number(id)
    })
    return function(dispatch) {
        dispatch(setRental(rental))
    }
}