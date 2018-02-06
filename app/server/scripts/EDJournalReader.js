const {watchJournalChanges} = require('../utils/logsReadUtils');
const logEventParsers = require('./logEventParsers');
const socketChannels = require('./../../common/socketConstants');
const mainPaths = require('./../redux/storeMainPaths');
const store = require('./../redux/store');
const fs = require('fs');

const path = 'C:\\Users\\{username}\\Saved Games\\Frontier Developments\\Elite Dangerous';

let pilotInfo = {}, shipInfo = {};

class EDJournalReader {

    constructor(userName = null, options = {}) {
        if (!userName) throw new Error('Cant start Elite logs watch without user name.');
        this._userName = userName;
        this._path = path.replace('{username}', userName);
        this._options = Object.assign({}, options);

        this._listeningSockets = [];

        watchJournalChanges(this._path, (lines = []) => this._handleReadLogLines(lines));
        store.subscribe(this._handleStoreChanges.bind(this));
    }

    registerSocket(socket) {
        if (this._listeningSockets.indexOf(socket) === -1) {
            this._listeningSockets.push(socket);
            console.log(socket.id, 'send all known data');
            socket.emit(socketChannels.INIT_DATA, store.getState()[mainPaths.clientDataPath]);
        }
    }
    unregisterSocket(socket) {
        const idx = this._listeningSockets.indexOf(socket);
        if (idx !== -1) this._listeningSockets.splice(idx, 1);
    }

    _handleReadLogLines(newLines = []) {
        newLines.forEach(line => {
            try {
                const event = JSON.parse(line);
                for (let i = 0; i < logEventParsers.length; i++) {
                    if (logEventParsers[i](event)) return;
                }
                console.log('unhandled event line', line);
            } catch (err) {
                console.error(err);
            }
        });
    }

    _handleStoreChanges() {
        const currState = store.getState();
        const newPilotInfo = currState[mainPaths.clientDataPath][mainPaths.pilotInfoPath];
        const newShipInfo = currState[mainPaths.clientDataPath][mainPaths.shipInfoPath];

        if (pilotInfo !== newPilotInfo) {
            pilotInfo = newPilotInfo;
            this._sendData('pilot info', socketChannels.PILOT_INFO_UPDATE, newPilotInfo);
        }

        if (shipInfo !== newShipInfo) {
            shipInfo = newShipInfo;
            this._sendData('ship info', socketChannels.SHIP_INFO_UPDATE, newShipInfo);
        }
    }

    _sendData(dataName, chanelName, data) {
        if (this._listeningSockets.length === 0) return;
        console.log('Send updated', dataName);
        this._listeningSockets.forEach(socket => socket.emit(chanelName, data));
    }
}

module.exports = EDJournalReader;
