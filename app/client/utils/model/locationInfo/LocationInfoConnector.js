import {locationInfoPath} from "utils/model/locationInfo/locationInfoConstants";
import {appDataPath} from "appConstants";
import store from "reduxStore/store";
import {Map} from 'immutable';

export default class LocationInfoConnector {

    static get locationInfo() {
        return store.getState().getIn([appDataPath, locationInfoPath], new Map());
    }

    static get starSystem() {
        return store.getState().getIn([appDataPath, locationInfoPath, 'starSystem'], '');
    }
}

if (process.env.NODE_ENV === 'development') {
    window.LocationInfoConnector = LocationInfoConnector;
}
