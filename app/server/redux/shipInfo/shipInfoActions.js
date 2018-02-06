const UPDATE_SHIP_INFO = 'UPDATE_SHIP_INFO';

module.exports = {UPDATE_SHIP_INFO, updateShipInfo};

function updateShipInfo(shipInfo) {
    return {type: UPDATE_SHIP_INFO, payload: shipInfo};
}