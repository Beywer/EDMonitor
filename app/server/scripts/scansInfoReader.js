const {updateScansInfo} = require('./../redux/scansInfo/scansInfoActions');
const starBodyNames = require('./../../common/starBodyNames');
const {readdir} = require('./../utils/fsUtils');
const store = require('./../redux/store');
const fs = require('fs');

const SCAN_EVENT_NAME = 'Scan';
module.exports = {readFullScansHistory, SCAN_EVENT_NAME, parseScanEvent};

async function readFullScansHistory(journalsPath) {
    let {err, files} = await readdir(journalsPath);
    if (err) {
        console.error('Failed to get full Scans history', err);
        return;
    }

    files = files.sort().slice(0, -1); // latest log is current and will be parsed by watcher
    for (let i = 0; i < files.length; i++) {
        const filePath = `${journalsPath}\\${files[i]}`;
        const buffer = fs.readFileSync(filePath);
        const fileStr = buffer.toString();
        const logEvents = fileStr.split('\n').slice(0, -1); // nothing after last line \n
        logEvents.forEach(event => {
            event = JSON.parse(event);
            if (event.event !== SCAN_EVENT_NAME) return;
            const updateInfo = parseScanEvent(event);
            if (updateInfo) store.dispatch(updateScansInfo(updateInfo));
        });
    }
}


function parseScanEvent(event) {
    const starBodyClass = getStarBodyClass(event);
    if (!starBodyClass) return;
    return {starBodyClass, terraformState: event.TerraformState};
}

function getStarBodyClass(event) {
    if (event.PlanetClass) {
        switch (event.PlanetClass) {
            case 'Ammonia world':
                return starBodyNames.AmmoniaWorld;
            case 'Earthlike body':
                return starBodyNames.EarthLikeWorld;
            case 'Gas giant with ammonia based life':
                return starBodyNames.GasGiantAmmoniaLife;
            case 'Gas giant with water based life':
                return starBodyNames.GasGiantWaterLife;
            case 'High metal content body':
                return starBodyNames.HighMetal;
            case 'Icy body':
                return starBodyNames.IcyBody;
            case 'Metal rich body':
                return starBodyNames.MetalRichBody;
            case 'Rocky body':
                return starBodyNames.RockyBody;
            case 'Rocky ice body':
                return starBodyNames.IcyBody;
            case 'Sudarsky class I gas giant':
                return starBodyNames.GasGiantClassI;
            case 'Sudarsky class II gas giant':
                return starBodyNames.GasGiantClassII;
            case 'Sudarsky class III gas giant':
                return starBodyNames.GasGiantClassIII;
            case 'Sudarsky class IV gas giant':
                return starBodyNames.GasGiantClassIV;
            case 'Sudarsky class V gas giant':
                return starBodyNames.GasGiantClassV;
            case 'Water world':
                return starBodyNames.WaterWorld;

            default:
                console.log(JSON.stringify(event));
                return 'zzzz PlanetClass ' + event.PlanetClass;
        }
    }
    if (event.StarType) {
        switch (event.StarType) {
            case 'O':
                return starBodyNames.StarBlueWhiteO;
            case 'B':
                return starBodyNames.StarBlueWhiteB;
            case 'A':
                return starBodyNames.StarBlueWhiteA;
            case 'F':
                return starBodyNames.StarWhiteF;
            case 'G':
                return starBodyNames.StarWhiteYellowG;
            case 'K':
                return starBodyNames.StarBlueYellowOrangeK;
            case 'M':
                return starBodyNames.StarBlueRedDwarfM;
            case 'TTS':
                return starBodyNames.StarTauriT;
            case 'L':
                return starBodyNames.StarBrownDwarfL;
            case 'N':
                return starBodyNames.StarNeutronN;
            case 'Y':
                return starBodyNames.StarBrownDwarfY;

            default:
                console.log(event.StarType, JSON.stringify(event));
                return 'zzz Start ' + event.StarType;
        }
    }

    if (event.BodyName.indexOf('Belt Cluster') !== -1) {
        console.log('Ignored Belt cluster', event.BodyName, JSON.stringify(event));
        return;
    }

    console.log(JSON.stringify(event));
}
