const {UPDATE_SCANS_INFO} = require('./scansInfoActions');

module.exports = {scansInfoReducer};

function scansInfoReducer(state = {}, action = {}) {
    switch (action.type) {
        case UPDATE_SCANS_INFO:
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
}