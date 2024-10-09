const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();

app.use(express.static('public'));

const server = http.createServer(app);

const wsServer = new WebSocket.Server( { server } );

wsServer.on('connection', (ws) => {
  console.log('WebSocket client connected.');

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    console.log(data);

    wsServer.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });

  ws.on('close', () => {
    console.log('WebSocket client disconnected.');
  });
});

server.listen(3000, () => {
  console.log('Server is running');
});