const {UPCOMING_LINES_CHANNEL} = require('./../common/socketConstants');
const EDJournalReader = require('./scripts/EDJournalReader');
const nodeStatic = require('node-static');
const http = require('http');
const osInfo = require("os");

// Static server init
const fileServer = new nodeStatic.Server('app/server/public');
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
    filesWatcher.registerSocket(socket);
    socket.on('disconnect', () => {
        console.log(socket.id, 'disconnected');
        filesWatcher.unregisterSocket(socket);
    });
});

// Run server
mainServer.listen(3200, () => {
    console.log('EDMonitor server started at http://localhost:3200');
});
