import {getIn} from "common/utils/commonJsUtils";

export default class SingletonStoreConnector {

    constructor(entityId) {
        if (!entityId) throw new Error('Cant create Store Connector without entity id ! ' + entityId);
        if (Array.isArray(entityId)) entityId = entityId.join('__');

        // Singleton
        this.constructor.__connectorsCache = this.constructor.__connectorsCache || {};
        if (!this.constructor.__connectorsCache[entityId]) this.constructor.__connectorsCache[entityId] = this;
        return this.constructor.__connectorsCache[entityId];
    }
}

SingletonStoreConnector.getId = function (value, idPath) {
    if (typeof value === 'string' || !value) return value;
    return getIn(value, idPath, null);
};
