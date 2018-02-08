import {UPDATE_SCANS_INFO} from "reduxStore/sagas/scanSagas";
import {Map} from 'immutable';

export function scansInfoReducer(state = new Map(), action = {}) {
    switch (action.type) {
        case UPDATE_SCANS_INFO:
            return state.merge(action.payload);
        default:
            return state;
    }
}