import LocationInfoConnector from "utils/model/locationInfo/LocationInfoConnector";
import {namePath, pilotInfoPath} from "utils/model/pilotInfo/pilotInfoConstants";
import ShipInfoConnector from "utils/model/shipInfo/ShipInfoConnector";
import {appDataPath} from "appConstants";
import store from "reduxStore/store";
import {Map} from 'immutable';

export default class PilotInfoConnector {

    static get pilotInfo() {
        return store.getState().getIn([appDataPath, pilotInfoPath], new Map());
    }


    static get ship() {
        return ShipInfoConnector;
    }
    static get location() {
        return LocationInfoConnector;
    }

    static get name() {
        return store.getState().getIn([appDataPath, pilotInfoPath, namePath], '');
    }
    static get currentSystem() {
        return store.getState().getIn([appDataPath, pilotInfoPath, 'currentSystem'], '');
    }
    static get credits() {
        return store.getState().getIn([appDataPath, pilotInfoPath, 'credits'], 0);
    }
}

if (process.env.NODE_ENV === 'development') {
    window.PilotInfoConnector = PilotInfoConnector;
}
