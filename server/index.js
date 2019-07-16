// Import packages
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Import routes
const index = require('./routes/index');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = process.env.PORT || 4000;

io.on('connection', function (socket) {
   console.log('New client connected');

   socket.on('sendMessage', (message) => {
      console.log(`New message: "${message}"`);
      io.emit('sendMessage', message);
   });

   socket.on('disconnect', () => {
       console.log('A client disconnected');
   })
});

// Use routes/middlewares
app.use(index);

server.listen(port, () => {
   console.log(`Listening on ${port}`);
});