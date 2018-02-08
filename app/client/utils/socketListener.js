import {
    INIT_DATA,
    PILOT_INFO_UPDATE,
    SHIP_INFO_UPDATE,
    LOCATION_INFO_UPDATE,
    SCANS_INFO_UPDATE
} from 'common/socketConstants';
import {updateLocationInfo} from "reduxStore/sagas/locationSagas";
import {updatePilotInfo} from "reduxStore/sagas/pilotSagas";
import {updateScansInfo} from "reduxStore/sagas/scanSagas";
import {updateShipInfo} from "reduxStore/sagas/shipSagas";
import store from 'reduxStore/store';
import socket from './socketInit';

socket.on(INIT_DATA, (data = {}) => {
    store.dispatch(updatePilotInfo(data.pilotInfo || {}));
    store.dispatch(updateShipInfo(data.shipInfo || {}));
    store.dispatch(updateLocationInfo(data.locationInfo || {}));
    store.dispatch(updateScansInfo(data.scansInfo || {}));
});

socket.on(PILOT_INFO_UPDATE, (data = {}) => {
    store.dispatch(updatePilotInfo(data));
});

socket.on(SHIP_INFO_UPDATE, (data = {}) => {
    store.dispatch(updateShipInfo(data));
});

socket.on(LOCATION_INFO_UPDATE, (data = {}) => {
    store.dispatch(updateLocationInfo(data));
});

socket.on(SCANS_INFO_UPDATE, (data = {}) => {
    store.dispatch(updateScansInfo(data));
});
