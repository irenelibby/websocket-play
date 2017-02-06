var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({port: 8181}),
    CLIENTS=[];

wss.on('connection', function(ws) {
    CLIENTS.push(ws);
    ws.on('message', function(message) {
        sendAll(message);
    });
});

function sendAll (message) {
    for (var i=0; i<CLIENTS.length; i++) {
        CLIENTS[i].send("Bixby says: " + message + " too");
    }
}