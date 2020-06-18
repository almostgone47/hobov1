import { ERRORS, RESET_ERRORS } from './types';

export const setErrors = errors => {
    return {
        type: ERRORS,
        errors
    }
}

export const resetErrors = errors => {
    return {
        type: RESET_ERRORS,
        errors
    }
}