// http://edcodex.info/?m=doc
const {updateLocationInfo} = require('./../redux/locationInfo/locationInfoActions');
const {updateScansInfo} = require('./../redux/scansInfo/scansInfoActions');
const {updatePilotInfo} = require('./../redux/pilotInfo/pilotInfoActions');
const {updateShipInfo} = require('./../redux/shipInfo/shipInfoActions');
const {SCAN_EVENT_NAME, parseScanEvent} = require('./scansInfoReader');
const store = require('./../redux/store');

const parsers = [];
module.exports = parsers;

parsers.push(event => {
    delete event.timestamp;
    // console.log(JSON.stringify(event));
    return false
});

parsers.push(createParser('ClearSavedGame', event => {
    store.dispatch(updatePilotInfo({name: event.Name}));
}));

parsers.push(createParser('LoadGame', event => {
    store.dispatch(updatePilotInfo({
        name: event.Commander,
        gameMode: event.GameMode,
        group: event.Group,
        credits: event.Credits,
        loan: event.Loan,
    }));
    store.dispatch(updateShipInfo({name: event.Ship, shipId: event.ShipID}))
}));

parsers.push(createParser('Loadout', event => {
    // console.log(JSON.stringify(event));
    store.dispatch(updateShipInfo({
        name: event.Ship,
        shipId: event.ShipID,
        shipName: event.ShipName,
        shipIdent: event.ShipIdent,
        modules: event.Modules,
    }))
}));

parsers.push(createParser('Location', event => {
    // console.log(event);
    store.dispatch(updateLocationInfo({
        docked: event.Docked,
        starSystem: event.StarSystem,
        starPos: event.StarPos,
        systemAllegiance: event.SystemAllegiance,
        systemEconomy: event.SystemEconomy,
        systemEconomy_Localised: event.SystemEconomy_Localised,
        systemGovernment: event.SystemGovernment,
        systemGovernment_Localised: event.SystemGovernment_Localised,
        systemSecurity: event.SystemSecurity,
        systemSecurity_Localised: event.SystemSecurity_Localised,
        population: event.Population,
        body: event.Body,
        bodyType: event.BodyType,
    }));
}));

parsers.push(createParser('FSDJump', event => {
    store.dispatch(updateLocationInfo({
        docked: false,
        starSystem: event.StarSystem,
        starPos: event.StarPos,
        systemAllegiance: event.SystemAllegiance,
        systemEconomy: event.SystemEconomy,
        systemEconomy_Localised: event.SystemEconomy_Localised,
        systemGovernment: event.SystemGovernment,
        systemGovernment_Localised: event.SystemGovernment_Localised,
        systemSecurity: event.SystemSecurity,
        systemSecurity_Localised: event.SystemSecurity_Localised,
        population: event.Population,
        body: '',
        bodyType: '',
    }));
}));

parsers.push(createParser(SCAN_EVENT_NAME, event => {
    store.dispatch(updateScansInfo(parseScanEvent(event)));
}));

// Last parser. Returns true will mean all events was handled, just ignored
parsers.push(event => {
    delete event.timestamp;
    // console.log(JSON.stringify(event));
    return true;
});

function createParser(eventName, parseFunction) {
    return function (event) {
        if (event.event !== eventName) return false;
        parseFunction(event);
        return true;
    }
}
