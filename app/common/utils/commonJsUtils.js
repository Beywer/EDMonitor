module.export = {isNumeric, isObject, getIn, setIn, hasIn, toArray};

/**
 * Number check
 * @param n
 * @returns {boolean}
 */
function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

/**
 * Object check
 * @param o
 * @returns {boolean}
 */
function isObject(o) {
    return o !== null && typeof o === 'object';
}

/**
 * Set value into object under path. Object[path[0]][path[1]][path[2]]... = value
 * If object doesn't contains some parts of set path them will be created
 * @param object
 * @param path
 * @param value
 * @returns {*}
 */
export function setIn(object, path, value) {
    path = toArray(path);
    // if (object instanceof Map) return object.setIn(path, fromJS(value));

    let obj = object;
    for (let i = 0; i < path.length - 1; i++) {
        if (isObject(obj)) {
            if (!(path[i] in obj)) {
                obj[path[i]] = {};
            }
            obj = obj[path[i]];
        }
        else return;
    }
    if (typeof obj === 'object') obj[path[path.length - 1]] = value;
    return object;
}

/**
 * Return value from object under path. Object[path[0]][path[1]][path[2]]...
 * If object doesn't contains some parts of set path default value will be returned
 * @param object
 * @param path
 * @param defaultValue
 * @returns {*}
 */
export function getIn(object, path, defaultValue = null) {
    path = toArray(path);
    // if (object instanceof Map) return object.getIn(path, defaultValue);

    if (!isObject(object)) return defaultValue;
    let obj = object;
    for (let i = 0; i < path.length; i++) {
        if ((isObject(obj) || Array.isArray(obj)) && path[i] in obj) obj = obj[path[i]];
        else return defaultValue;
    }
    return obj;
}

/**
 * Check existanse of the path in the object. Object[path[0]][path[1]][path[2]]...
 * If object doesn't contains some parts of set path false will be returned
 * @param object
 * @param path
 * @returns {*}
 */
export function hasIn(object, path) {
    path = toArray(path);
    // if (object instanceof Map) return object.hasIn(path);

    if (!isObject(object)) return false;
    let obj = object;
    for (let i = 0; i < path.length; i++) {
        if ((isObject(obj) || Array.isArray(obj)) && path[i] in obj) obj = obj[path[i]];
        else return false;
    }
    return true;
}


/**
 * Cast value to Array
 * @param value
 * @returns {*}
 */
export function toArray(value) {
    return Array.isArray(value) ? value : [value];
}
