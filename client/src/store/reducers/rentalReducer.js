import {
  FETCH_RENTALS,
  FETCH_RENTAL,
  FETCH_RENTAL_LOCATION,
  REMOVE_RENTAL_FROM_STATE,
  RESET_RENTAL,
  RESET_RENTALS,
  SEARCH_RENTALS,
} from '../actions/types';

const initialState = {
  rentals: [],
  rental: {},
  rentalLocation: '',
  searchInput: '',
};

const rentalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RENTALS:
      return {
        ...state,
        rentals: action.rentals,
      };
    case SEARCH_RENTALS:
      return {
        ...state,
        searchInput: action.searchInput,
      };
    case FETCH_RENTAL:
      return {
        ...state,
        rental: action.rental,
      };
    case FETCH_RENTAL_LOCATION:
      return {
        ...state,
        rentalLocation: action.rentalLocation,
      };
    case REMOVE_RENTAL_FROM_STATE:
      const index = state.findIndex((rental) => rental._id === action.id);
      const newRentalsState = state.splice(index, 1);
      return {
        ...state,
        rentals: newRentalsState,
      };
    case RESET_RENTAL:
      return {
        ...state,
        rentalLocation: {},
        rental: {},
      };
    case RESET_RENTALS:
      return {
        ...state,
        rentals: [],
      };
    default:
      return state;
  }
};

export default rentalReducer;
