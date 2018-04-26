const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;


const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

const server = http.createServer(app);

const io = socketIO(server);
io.set('transports', ['polling', 'websocket']);
let totalUsers = 0;
io.on('connection', (socket) => {
  console.log('New User Connected');

  io.emit('newUserAdded', { count: ++totalUsers});
  socket.on('disconnect', () => {
    --totalUsers;
    console.log('User disconnected');
  });
});

server.listen(port);