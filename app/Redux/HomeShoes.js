import * as ActionTypes from './ActionTypes';

export const shoes = (state = {
    isLoading: true,
    errMess: null,
    shoes: []
}, action) => {
    switch(action.type){
        case ActionTypes.ADDHOME_SHOES:
            return {...state, isLoading: false, errMess: null, shoes: action.payload};
        case ActionTypes.HOMESHOES_LOADING:
            return {...state, isLoading: true, errMess: null, shoes:[] };
        case ActionTypes.HOMESHOES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, shoes: [] };
        default:
            return state;
    }
}