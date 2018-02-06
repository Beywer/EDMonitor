const {createStore, combineReducers} = require('redux');
const {pilotInfoReducer} = require('./pilotInfo/pilotInfoReducer');
const {shipInfoReducer} = require('./shipInfo/shipInfoReducer');
const mainPaths = require('./storeMainPaths');

const store = createStore(
    combineReducers({
        [mainPaths.clientDataPath]: combineReducers({
            [mainPaths.pilotInfoPath]: pilotInfoReducer,
            [mainPaths.shipInfoPath]: shipInfoReducer
        })
    }),
    {
        [mainPaths.clientDataPath]: {
            [mainPaths.pilotInfoPath]: {},
            [mainPaths.shipInfoPath]: {}
        }
    }
);

module.exports = store;
