const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
const port = process.env.PORT || 3000;


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connect('mongodb://sockettestuser:sockettestuser!@ds259119.mlab.com:59119/sockettestapp')
.catch(err => {
  console.log(err);
});

require('./models/Task');
const Task = mongoose.model('task');

app.use(express.static(path.join(__dirname, 'dist')));

app.post('/tasks', (req, res) => {
  console.log('req', req);
  new Task({
    name: req.body.taskName
  })
  .save()
  .then(task => {
    io.emit('newTaskAdded', { 'newTask': task});
    res.end();
  })
  .catch(err => {
    console.log(err);
    res.end();
  })
});

/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
}); */

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