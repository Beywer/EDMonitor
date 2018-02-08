export const UPDATE_SCANS_INFO = 'UPDATE_SCANS_INFO';

export function updateScansInfo(scansInfo = {}) {
    console.log('New scans info data', scansInfo);
    return {type: UPDATE_SCANS_INFO, payload: scansInfo};
}
