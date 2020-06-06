import { CURRENT_USER, ERRORS } from '../actions/types';

const initialState = {
    currentUser: null,
    errors: []
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            }
        case ERRORS:
                return {
                    ...state,
                    errors: action.errors
                }
        default:
            return state
    }
}

export default authReducer;