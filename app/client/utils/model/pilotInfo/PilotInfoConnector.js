import {namePath, pilotInfoPath} from "utils/model/pilotInfo/pilotInfoConstants";
import ShipInfoConnector from "utils/model/shipInfo/ShipInfoConnector";
import {appDataPath} from "appConstants";
import store from "reduxStore/store";
import {Map} from 'immutable';

export default class PilotInfoConnector {

    static get pilotInfo() {
        return store.getState().getIn([appDataPath, pilotInfoPath], new Map());
    }

    static get name() {
        return store.getState().getIn([appDataPath, pilotInfoPath, namePath], '');
    }
    static get ship() {
        return ShipInfoConnector;
    }
}

if (process.env.NODE_ENV === 'development') {
    window.PilotInfoConnector = PilotInfoConnector;
}
