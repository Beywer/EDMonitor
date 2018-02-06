const {UPDATE_SHIP_INFO} = require('./shipInfoActions');

module.exports = {shipInfoReducer};

function shipInfoReducer(state = {}, action = {}) {
    switch (action.type) {
        case UPDATE_SHIP_INFO:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}