const UPDATE_SCANS_INFO = 'UPDATE_SCANS_INFO';
module.exports = {UPDATE_SCANS_INFO, updateScansInfo};


function updateScansInfo(newScanInfo) {
    const store = require('./../store');
    const mainPaths = require('./../storeMainPaths');
    const scansInfo = store.getState()[mainPaths.clientDataPath][mainPaths.scansInfoPath];

    if (!scansInfo[newScanInfo.starBodyClass]) scansInfo[newScanInfo.starBodyClass] = {count: 0, terraformCount: 0};
    scansInfo[newScanInfo.starBodyClass].count++;
    if (newScanInfo.terraformState) scansInfo[newScanInfo.starBodyClass].terraformCount++;

    return {type: UPDATE_SCANS_INFO, payload: scansInfo};
}