import {UPDATE_LOCATION_INFO} from "reduxStore/sagas/locationSagas";
import {Map} from 'immutable';

export function locationInfoReducer(state = new Map(), action = {}) {
    switch (action.type) {
        case UPDATE_LOCATION_INFO:
            return state.merge(action.payload);
        default:
            return state;
    }
}