import { ERRORS, RESET_ERRORS } from './types';

export const setErrors = (errors) => {
  return {
    type: ERRORS,
    errors,
  };
};

export const resetErrors = () => {
  return {
    type: RESET_ERRORS,
  };
};
