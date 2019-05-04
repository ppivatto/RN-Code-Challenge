// DEPENDENCIES
import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import reduxReset from 'redux-reset'
import thunk from 'redux-thunk';
import AppReducer from './rootReducer';
import logger from 'redux-logger'

const reducer = combineReducers(AppReducer);

export default function configureStore () {
    const enhancer = compose(
        applyMiddleware(thunk),
        //applyMiddleware(logger), //This comment prevent FPS drop on animations. Uncomment if you need log reducer actions in development
        reduxReset(),
    );

    return createStore(
        reducer,
        enhancer,
    );
}

export {}
