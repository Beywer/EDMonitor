export const UPDATE_SHIP_INFO = 'UPDATE_SHIP_INFO';

export function updateShipInfo(shipInfo = {}) {
    console.log('New ship info data', shipInfo);
    return {type: UPDATE_SHIP_INFO, payload: shipInfo};
}
