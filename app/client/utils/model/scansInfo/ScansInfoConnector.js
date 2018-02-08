import {scansInfoPath} from "utils/model/scansInfo/scansInfoConstants";
import {scansTotalIncomeSelector} from "utils/model/scansInfo/scansInfoSelectors";
import {appDataPath} from "appConstants";
import store from "reduxStore/store";
import {Map} from 'immutable';

export default class ScansInfoConnector {

    static get scansInfo() {
        return store.getState().getIn([appDataPath, scansInfoPath], new Map());
    }

    static get totalIncome() {
        return scansTotalIncomeSelector(store.getState());
    }

}

if (process.env.NODE_ENV === 'development') {
    window.ScansInfoConnector = ScansInfoConnector;
}
