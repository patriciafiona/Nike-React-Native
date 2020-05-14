import * as ActionTypes from './ActionTypes';

export const shorts = (state = {
    isLoading: true,
    errMess: null,
    shorts: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADDHOME_SHORTS:
            return {...state, isLoading: false, errMess: null, shorts: action.payload};
        case ActionTypes.HOMESHORTS_LOADING:
            return {...state, isLoading: true, errMess: null, shorts:[] };
        case ActionTypes.HOMESHORTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, shorts: [] };
        default:
            return state;
    }
}