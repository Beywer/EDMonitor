const fs = require('fs');

module.exports = {readdir};

function readdir(...args) {
    return new Promise(resolve => {
        fs.readdir(...args.slice(0, 2), (err, files) => {
            resolve({err, files})
        });
    });
}
