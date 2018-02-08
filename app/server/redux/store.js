const {locationInfoReducer} = require('./locationInfo/locationInfoReducer');
const {scansInfoReducer} = require('./scansInfo/scansInfoReducer');
const {pilotInfoReducer} = require('./pilotInfo/pilotInfoReducer');
const {shipInfoReducer} = require('./shipInfo/shipInfoReducer');
const {createStore, combineReducers} = require('redux');
const mainPaths = require('./storeMainPaths');

const store = createStore(
    combineReducers({
        [mainPaths.clientDataPath]: combineReducers({
            [mainPaths.locationInfoPath]: locationInfoReducer,
            [mainPaths.scansInfoPath]: scansInfoReducer,
            [mainPaths.pilotInfoPath]: pilotInfoReducer,
            [mainPaths.shipInfoPath]: shipInfoReducer,
        })
    }),
    {
        [mainPaths.clientDataPath]: {
            [mainPaths.locationInfoPath]: {},
            [mainPaths.scansInfoPath]: {},
            [mainPaths.pilotInfoPath]: {},
            [mainPaths.shipInfoPath]: {},
        }
    }
);

module.exports = store;
