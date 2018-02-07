export const UPDATE_PILOT_INFO = 'UPDATE_PILOT_INFO';

export function updatePilotInfo(pilotInfo = {}) {
    return {type: UPDATE_PILOT_INFO, payload: pilotInfo};
}
