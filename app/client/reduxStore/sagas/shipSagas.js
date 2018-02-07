export const UPDATE_SHIP_INFO = 'UPDATE_SHIP_INFO';

export function updateShipInfo(shipInfo = {}) {
    return {type: UPDATE_SHIP_INFO, payload: shipInfo};
}
