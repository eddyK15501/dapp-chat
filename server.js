const express = require('express');
const app = express();

const { messages } = require('./utils/messages.js');

const PORT = process.env.PORT || 3003;

const server = app.listen(PORT, () => {
  console.log(`Express server listening on Port ${PORT}`);
});

const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3002',
  },
});

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('get messages', () => {
    io.emit('get messages', messages);
  });

  socket.on('new message', (msg) => {
    messages.push(msg);
    io.emit('new message', messages);
  });
});
