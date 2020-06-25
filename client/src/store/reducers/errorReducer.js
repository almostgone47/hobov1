import { ERRORS, RESET_ERRORS } from '../actions/types';

const initialState = {
  errors: [],
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ERRORS:
      return {
        errors: action.errors,
      };
    case RESET_ERRORS:
      return {
        errors: [],
      };
    default:
      return state;
  }
};

export default errorReducer;
