import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import reducer from './reducer';
import {Map} from 'immutable';

const initialState = new Map();
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;
