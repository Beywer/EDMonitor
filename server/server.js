const {UPCOMING_LINES_CHANNEL} = require("../model/socketConstants");
const EDJournalReader = require('./scripts/EDJournalReader');
const nodeStatic = require('node-static');
const http = require('http');
const osInfo = require("os");

const Pilot = require('../model/Pilot');
console.log(new Pilot());

// Static server init
const fileServer = new nodeStatic.Server('server/public');
const mainServer = http.createServer();
mainServer.on('request', (req, resp) => {
    req.addListener('end', () => {
        fileServer.serve(req, resp)
    }).resume();
});

// Init JournalReader
const filesWatcher = new EDJournalReader(osInfo.userInfo().username);

// Socket connection init
const io = require('socket.io')(mainServer);
io.on('connection', function (socket) {
    console.log(socket.id, 'connected');
    filesWatcher.addLogsChangeListener(logChangeListener);
    socket.on('disconnect', () => {
        console.log(socket.id, 'disconnected');
        filesWatcher.removeLogsChangeListener(logChangeListener)
    });

    console.log(socket.id, 'send read lines');
    logChangeListener(filesWatcher.allRadLines);

    function logChangeListener(newLines) {
        console.log(socket.id, 'send receive new lines');
        socket.emit(UPCOMING_LINES_CHANNEL, newLines);
    }
});

mainServer.listen(3200, () => {
    console.log('EDMonitor server started at http://localhost:3200');
});
