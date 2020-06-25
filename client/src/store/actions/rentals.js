import axios from 'axios';

import { getAuthConfig } from '../../helpers/AuthToken';

import {
  FETCH_RENTALS,
  FETCH_RENTAL,
  FETCH_RENTAL_LOCATION,
  REMOVE_RENTAL_FROM_STATE,
  RESET_RENTAL,
  RESET_RENTALS,
  SEARCH_RENTALS,
} from './types';
import { setErrors } from './errors';

export const setRentals = (rentals) => {
  return {
    type: FETCH_RENTALS,
    rentals,
  };
};

export const setRental = (rental) => {
  return {
    type: FETCH_RENTAL,
    rental,
  };
};

export const setRentalSearch = (searchInput) => {
  return {
    type: SEARCH_RENTALS,
    searchInput,
  };
};

export const setRentalLocation = (rentalLocation) => {
  return {
    type: FETCH_RENTAL_LOCATION,
    rentalLocation,
  };
};

export const removeRental = (rentalId) => {
  return {
    type: REMOVE_RENTAL_FROM_STATE,
    id: rentalId,
  };
};

export const resetRental = (id) => {
  return {
    type: RESET_RENTAL,
    rentalId: id,
  };
};

export const resetRentals = () => {
  return {
    type: RESET_RENTALS,
  };
};

export const newRental = (newRentalData) => {
  const config = getAuthConfig();

  return (dispatch) => {
    axios
      .post('/api/v1/rentals/new', newRentalData, config)
      .then((rental) => dispatch(setRental(rental.data)))
      .catch((err) => dispatch(setErrors(err.response.data.errors || [])));
  };
};

export const editRental = (rentalData, rentalId) => {
  const config = getAuthConfig();
  console.log('this is the edit data: ', rentalData, rentalId);
  return (dispatch) => {
    axios
      .post(`/api/v1/rentals/${rentalId}`, rentalData, config)
      .then((rental) => dispatch(setRental(rental.data)))
      .catch((err) => dispatch(setErrors(err.response.data.errors || [])));
  };
};

export const deleteRental = (rentalId) => {
  const config = getAuthConfig();

  return (dispatch) => {
    axios
      .delete(`/api/v1/rentals/${rentalId}`, config)
      .then((rental) => dispatch(removeRental(rental.data.id)))
      .catch((err) => dispatch(setErrors(err.response.data.errors || [])));
  };
};

export const fetchRentals = (searchInput) => {
  const query = searchInput ? `?city=${searchInput}` : '';

  return (dispatch) => {
    axios
      .get('/api/v1/rentals' + query)
      .then((rentals) => dispatch(setRentals(rentals.data)))
      .then(() => dispatch(setRentalSearch(searchInput)))
      .catch((err) => dispatch(setErrors(err.response.data.errors || [])));
  };
};

export const fetchRental = (id) => {
  return (dispatch) => {
    axios
      .get(`/api/v1/rentals/${id}`)
      .then((rental) => dispatch(setRental(rental.data)))
      .catch((err) => dispatch(setErrors(err.response.data.errors || [])));
  };
};

export const fetchRentalLocation = (inputAddress, apiKey) => {
  return (dispatch) => {
    axios
      .get(
        `https://api.tomtom.com/search/2/geocode/${inputAddress}.JSON?key=${apiKey}`
      )
      .then((res) => dispatch(setRentalLocation(res.data.results[0].position)))
      .catch((err) => dispatch(setErrors(err.response.data.errors || [])));
  };
};

export const fetchRentalsByOwner = () => {
  const config = getAuthConfig();

  return (dispatch) => {
    axios
      .get('/api/v1/rentals/user', config)
      .then((rentals) => dispatch(setRentals(rentals.data)))
      .catch((err) => dispatch(setErrors(err.response.data.errors || [])));
  };
};
