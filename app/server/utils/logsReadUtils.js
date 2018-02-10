const {readdir} = require('./fsUtils');
const path = require('path');
const fs = require('fs');

const JOURNAL_FILE_NAME_REGEXP = /^Journal\.[0-9]{12}\.[0-9]{2,}\.log$/; //Journal.[timestamp].01.log

module.exports = {watchJournalChanges};

/**
 * Monitor latest ED journal log file in the folder and call callback when detects a new portion of log lines
 * @param folder
 * @param callback
 * @returns {Promise<void>}
 */
async function watchJournalChanges(folder, callback) {

    // Get last log file in journals folder. Allow read changes from already run Elite
    const {err, files} = await readdir(folder);
    if (err) throw err;
    let lastFileName = getLatestFileName(files),
        lastReadLine = 0;

    // Watch file changes. New file has created on 'rename' event so we can read logs from newly ran Elite
    const filesWatcher = fs.watch(folder);
    filesWatcher.on('change', (changeEvt, fileName) => {
        if (changeEvt !== 'rename' || fileName.search(JOURNAL_FILE_NAME_REGEXP) === -1) return;
        lastFileName = fileName;
        lastReadLine = 0;
    });

    // Repeated new lines read
    (function startLinesRead() {
        readNewLines(path.join(folder, lastFileName), lastReadLine)
            .then(newLines => {
                if (newLines.length === 0) return;
                lastReadLine += newLines.length;
                callback(newLines);
            })
            .catch(err => console.error(err));
        setTimeout(startLinesRead, 1000);
    })();
}

function readNewLines(file, lastReadLine = 0) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, buffer) => {
            if (err) return reject(err);
            const lines = buffer.toString()
                .split('\n')
                .slice(lastReadLine)
                .filter(l => l !== '')
                .map(l => l.trim());
            resolve(lines);
        });
    });
}

function getLatestFileName(files = []) {
    files = files.filter(f => f.search(JOURNAL_FILE_NAME_REGEXP) === 0);

    let lastFileName = null, lastFileTimeStamp = null;
    files.forEach(fileName => {
        const timeStamp = +fileName.split('.')[1];
        if (!lastFileName || timeStamp > lastFileTimeStamp) {
            lastFileName = fileName;
            lastFileTimeStamp = timeStamp;
        }
    });

    return lastFileName;
}
