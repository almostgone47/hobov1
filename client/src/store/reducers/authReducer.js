import { CURRENT_USER } from '../actions/types';

const initialState = {
    currentUser: null,
}

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser
            }
        default:
            return state
    }
}

export default authReducer;