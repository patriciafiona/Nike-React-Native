import {createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore, persistCombineReducers} from 'redux-persist';
import storage from 'redux-persist/es/storage';

import {shoes} from './HomeShoes';
import {shorts} from './HomeShorts';
import {tt} from './HomeTT';

export const ConfigureStore = () => {

    const config={
        key: 'root',
        storage,
        debug: true
    };

    const store = createStore(
        persistCombineReducers( config, {
            shoes,
            shorts,
            tt,
            
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return {persistor, store};
}