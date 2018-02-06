// http://edcodex.info/?m=doc

const {updatePilotInfo} = require('./../redux/pilotInfo/pilotInfoActions');
const {updateShipInfo} = require('./../redux/shipInfo/shipInfoActions');
const store = require('./../redux/store');

module.exports = [gameStartParser, loadGameParser, idleParser];


function gameStartParser(event) {
    if (event.event !== 'ClearSavedGame') return false;
    store.dispatch(updatePilotInfo({name: event.Name}));
}

function loadGameParser(event) {
    if (event.event !== 'LoadGame') return false;
    console.log(event.event);
    store.dispatch(updatePilotInfo({
        name: event.Commander,
        gameMode: event.GameMode,
        group: event.Group,
        credits: event.Credits,
        loan: event.Loan,
    }));
    store.dispatch(updateShipInfo({name: event.Ship, shipId: event.ShipID}))
}

// Last parser. Returns true will mean all events was handled, just ignored
function idleParser(event) {
    return true;
}