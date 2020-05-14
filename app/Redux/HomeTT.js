import * as ActionTypes from './ActionTypes';

export const tt = (state = {
    isLoading: true,
    errMess: null,
    tt: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADD_HOME_TT:
            return {...state, isLoading: false, errMess: null, tt: action.payload};
        case ActionTypes.HOME_TT_LOADING:
            return {...state, isLoading: true, errMess: null, tt:[] };
        case ActionTypes.HOME_TT_FAILED:
            return {...state, isLoading: false, errMess: action.payload, tt: [] };
        default:
            return state;
    }
}