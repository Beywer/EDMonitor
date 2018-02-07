import {INIT_DATA, PILOT_INFO_UPDATE, SHIP_INFO_UPDATE} from 'common/socketConstants';
import {updatePilotInfo} from "reduxStore/sagas/pilotSagas";
import {updateShipInfo} from "reduxStore/sagas/shipSagas";
import store from 'reduxStore/store';
import socket from './socketInit';

socket.on(INIT_DATA, (data = {}) => {
    store.dispatch(updatePilotInfo(data.pilotInfo || {}));
    store.dispatch(updateShipInfo(data.shipInfo || {}));
});

socket.on(PILOT_INFO_UPDATE, (data = {}) => {
    store.dispatch(updatePilotInfo(data));
});

socket.on(SHIP_INFO_UPDATE, (data = {}) => {
    store.dispatch(updateShipInfo(data));
});
