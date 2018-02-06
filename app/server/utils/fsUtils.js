const fs = require('fs'),
    path = require('path');

const REL_DIR = process.cwd();

module.exports = {readdir, getPath, REL_DIR};

function getPath(localModulePath) {
    return path.join(REL_DIR, 'app', localModulePath);
}

function readdir(...args) {
    return new Promise(resolve => {
        fs.readdir(...args.slice(0, 2), (err, files) => {
            resolve({err, files})
        });
    });
}
