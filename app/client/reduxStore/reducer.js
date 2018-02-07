import {pilotInfoPath} from "utils/model/pilotInfo/pilotInfoConstants";
import {shipInfoPath} from "utils/model/shipInfo/shipInfoConstants";
import {pilotInfoReducer} from "reduxStore/reducers/pilotReducer";
import shipInfoReducer from "reduxStore/reducers/shipReducer";
import {appDataPath, appStatePath} from "appConstants";
import {combineReducers} from "redux-immutable";
import {Map} from 'immutable';

const reducer = combineReducers({
    [appDataPath]: combineReducers({
        [pilotInfoPath]: pilotInfoReducer,
        [shipInfoPath]: shipInfoReducer
    }),
    [appStatePath]: (state = new Map()) => state,
});

export default reducer;
