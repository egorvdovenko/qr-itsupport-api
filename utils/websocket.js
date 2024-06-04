const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8040 });

wss.on('connection', function connection(ws) {
  console.log('WebSocket client connected');

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });
});

module.exports = { wss };
