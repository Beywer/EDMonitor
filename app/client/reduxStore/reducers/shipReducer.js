import {Map} from 'immutable';
import {UPDATE_SHIP_INFO} from "reduxStore/sagas/shipSagas";

export default function shipInfoReducer(state = new Map(), action = {}) {
    switch (action.type) {
        case UPDATE_SHIP_INFO:
            return state.merge(action.payload);
        default:
            return state;
    }
}
