const {UPDATE_LOCATION_INFO} = require('./locationInfoActions');

module.exports = {locationInfoReducer};

function locationInfoReducer(state = {}, action = {}) {
    switch (action.type) {
        case UPDATE_LOCATION_INFO:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}