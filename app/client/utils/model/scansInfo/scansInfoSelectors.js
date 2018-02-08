import {getIn} from "common/utils/commonJsUtils";
import {scansInfoPath, planetPrices} from "utils/model/scansInfo/scansInfoConstants";
import {appDataPath} from "appConstants";
import {createSelector} from 'reselect';
import store from "reduxStore/store";
import {Map} from 'immutable';

const scansInfoSelector = (state) => store.getState().getIn([appDataPath, scansInfoPath], new Map());

export const scansTotalIncomeSelector = createSelector([scansInfoSelector], (scansInfo) => {
    let totalIncome = 0;
    scansInfo.forEach((value, planetClass) => {
        const count = value.get('count', 0), terrCount = value.get('terraformCount', 0);
        totalIncome += getIn(planetPrices, [planetClass, 'direct'], 0) * (count - terrCount);
        totalIncome += getIn(planetPrices, [planetClass, 'terr'], 0) * terrCount
    });
    return totalIncome;
});
