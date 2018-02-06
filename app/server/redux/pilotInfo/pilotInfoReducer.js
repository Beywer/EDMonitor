const {UPDATE_PILOT_INFO} = require('./pilotInfoActions');

module.exports = {pilotInfoReducer};

function pilotInfoReducer(state = {}, action = {}) {
    switch (action.type) {
        case UPDATE_PILOT_INFO:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}