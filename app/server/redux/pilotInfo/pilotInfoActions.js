const UPDATE_PILOT_INFO = 'UPDATE_PILOT_INFO';

module.exports = {UPDATE_PILOT_INFO, updatePilotInfo};

function updatePilotInfo(pilotInfo) {
    return {type: UPDATE_PILOT_INFO, payload: pilotInfo};
}