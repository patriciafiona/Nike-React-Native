import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../../src/baseUrl';

// fetch shoes
export const fetchShoes = () => (dispatch) => {
    dispatch(shoesLoading());
    return fetch(baseUrl + 'home/shoes')
    .then(response => {
        if (response.ok){
            return response;
        }else{
            var error = new Error('Error '+ response.status + ': '+ response.statusText);
            error.response = response;
            throw error;

        }
        
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(shoes => dispatch(addShoes(shoes)))
    .catch(error => dispatch(shoesFailed(error.message)))
}

export const shoesLoading =() =>({
    type: ActionTypes.HOMESHOES_LOADING
});

export const shoesFailed = (errMess) => ({
    type:ActionTypes.HOMESHOES_FAILED,
    payload: errMess
});

export const addShoes = (shoes) => ({
    type:ActionTypes.ADDHOME_SHOES,
    payload: shoes
});

// fetch shorts
export const fetchShorts = () => (dispatch) => {
    dispatch(shortsLoading());
    return fetch(baseUrl + 'home/shorts')
    .then(response => {
        if (response.ok){
            return response;
        }else{
            var error = new Error('Error '+ response.status + ': '+ response.statusText);
            error.response = response;
            throw error;

        }
        
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(shorts => dispatch(addShorts(shorts)))
    .catch(error => dispatch(shortsFailed(error.message)))
}

export const shortsLoading =() =>({
    type: ActionTypes.HOMESHORTS_LOADING
});

export const shortsFailed = (errMess) => ({
    type:ActionTypes.HOMESHORTS_FAILED,
    payload: errMess
});

export const addShorts = (shorts) => ({
    type:ActionTypes.ADDHOME_SHORTS,
    payload: shorts
});

// fetch TT
export const fetchTT = () => (dispatch) => {
    dispatch(ttLoading());
    return fetch(baseUrl + 'home/touserTights')
    .then(response => {
        if (response.ok){
            return response;
        }else{
            var error = new Error('Error '+ response.status + ': '+ response.statusText);
            error.response = response;
            throw error;

        }
        
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(tt => dispatch(addTT(tt)))
    .catch(error => dispatch(ttFailed(error.message)))
}

export const ttLoading =() =>({
    type: ActionTypes.HOME_TT_LOADING
});

export const ttFailed = (errMess) => ({
    type:ActionTypes.HOME_TT_FAILED,
    payload: errMess
});

export const addTT = (tt) => ({
    type:ActionTypes.ADD_HOME_TT,
    payload: tt
});