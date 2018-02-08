import {locationInfoPath} from "utils/model/locationInfo/locationInfoConstants";
import {locationInfoReducer} from "reduxStore/reducers/locationReducer";
import {pilotInfoPath} from "utils/model/pilotInfo/pilotInfoConstants";
import {shipInfoPath} from "utils/model/shipInfo/shipInfoConstants";
import {pilotInfoReducer} from "reduxStore/reducers/pilotReducer";
import {scansInfoReducer} from "reduxStore/reducers/scansReducer";
import shipInfoReducer from "reduxStore/reducers/shipReducer";
import {scansInfoPath} from "server/redux/storeMainPaths";
import {appDataPath, appStatePath} from "appConstants";
import {combineReducers} from "redux-immutable";
import {Map} from 'immutable';

const reducer = combineReducers({
    [appDataPath]: combineReducers({
        [pilotInfoPath]: pilotInfoReducer,
        [shipInfoPath]: shipInfoReducer,
        [locationInfoPath]: locationInfoReducer,
        [scansInfoPath]: scansInfoReducer
    }),
    [appStatePath]: (state = new Map()) => state,
});

export default reducer;
