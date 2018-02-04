const {watchJournalChanges} = require('../utils/logsReadUtils');
const fs = require('fs');

const path = 'C:\\Users\\{username}\\Saved Games\\Frontier Developments\\Elite Dangerous';

class EDJournalReader {

    constructor(userName = null, options = {}) {
        if (!userName) throw new Error('Cant start Elite logs watch without user name.');
        this._userName = userName;
        this._path = path.replace('{username}', userName);
        this._options = Object.assign({}, options);

        this._listeners = [];
        this._lines = [];

        watchJournalChanges(this._path, (lines = []) => this._handleReadLogLines(lines));
    }

    addLogsChangeListener(listener) {
        if (typeof listener !== 'function' || this._listeners.indexOf(listener) !== -1) return;
        this._listeners.push(listener);
    }
    removeLogsChangeListener(listener) {
        const idx = this._listeners.indexOf(listener);
        if (idx !== -1) this._listeners.splice(idx, 1);
    }

    get allRadLines() {
        return this._lines;
    }

    _handleReadLogLines(newLines) {
        this._listeners.forEach(l => l(newLines));
        this._lines = this._lines.concat(newLines)
    }
}

module.exports = EDJournalReader;
