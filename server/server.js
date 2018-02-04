const EDLogFilesWatcher = require('./scripts/EDLogFilesWatcher');
const nodeStatic = require('node-static');
const http = require('http');
const osInfo = require("os");

const userName = osInfo.userInfo().username;

const filesWatcher = new EDLogFilesWatcher(userName);


const fileServer = new nodeStatic.Server('server/public');
const mainServer = http.createServer();

mainServer.on('request', (req, resp) => {
    req.addListener('end', () => {
        fileServer.serve(req, resp)
    }).resume();
});

mainServer.listen(3200, () => {
    console.log('EDMonitor server started at localhost:3200');
});
