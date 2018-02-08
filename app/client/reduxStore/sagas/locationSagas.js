export const UPDATE_LOCATION_INFO = 'UPDATE_LOCATION_INFO';

export function updateLocationInfo(locationInfo = {}) {
    console.log('New location info data', locationInfo);
    return {type: UPDATE_LOCATION_INFO, payload: locationInfo};
}
