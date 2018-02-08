const UPDATE_LOCATION_INFO = 'UPDATE_LOCATION_INFO';

module.exports = {UPDATE_LOCATION_INFO, updateLocationInfo};

function updateLocationInfo(locationInfo) {
    return {type: UPDATE_LOCATION_INFO, payload: locationInfo};
}