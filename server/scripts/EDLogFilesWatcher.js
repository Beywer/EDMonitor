const {watchJournalChanges} = require('../utils/logsReadUtils');
const fs = require('fs');

const path = 'C:\\Users\\{username}\\Saved Games\\Frontier Developments\\Elite Dangerous';

class EDLogFilesWatcher {

    constructor(userName = null, options = {}) {
        if (!userName) throw new Error('Cant start Elite logs watch without user name.');
        this._userName = userName;
        this._path = path.replace('{username}', userName);
        this._options = Object.assign({}, options);

        watchJournalChanges(this._path, (lines = []) => this._handleReadLogLines(lines));
    }

    _handleReadLogLines(lines) {
        console.log(lines);
    }
}

module.exports = EDLogFilesWatcher;
