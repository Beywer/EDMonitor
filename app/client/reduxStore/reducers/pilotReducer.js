import {UPDATE_PILOT_INFO} from "reduxStore/sagas/pilotSagas";
import {Map} from 'immutable';

export function pilotInfoReducer(state = new Map(), action = {}) {
    switch (action.type) {
        case UPDATE_PILOT_INFO:
            return state.merge(action.payload);
        default:
            return state;
    }
}