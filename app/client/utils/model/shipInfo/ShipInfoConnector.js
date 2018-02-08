import {shipInfoPath} from "utils/model/shipInfo/shipInfoConstants";
import {appDataPath} from "appConstants";
import store from "reduxStore/store";
import {Map} from 'immutable';

export default class ShipInfoConnector {

    static get shipInfo() {
        return store.getState().getIn([appDataPath, shipInfoPath], new Map());
    }

    static get name() {
        return store.getState().getIn([appDataPath, shipInfoPath, 'name'], '');
    }
    static get shipId() {
        return store.getState().getIn([appDataPath, shipInfoPath, 'shipId'], '');
    }
    static get shipName() {
        return store.getState().getIn([appDataPath, shipInfoPath, 'shipName'], '');
    }
    static get shipIdent() {
        return store.getState().getIn([appDataPath, shipInfoPath, 'shipIdent'], '');
    }
}

if (process.env.NODE_ENV === 'development') {
    window.ShipInfoConnector = ShipInfoConnector;
}
