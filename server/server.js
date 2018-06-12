const express = require('express');
const path = require('path');
const http = require('http');
const  socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// set up static web pages
var publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected ');

    socket.emit('newMessage', generateMessage("Admin",`welcome ${socket.id}`));

    socket.broadcast.emit('newMessage', generateMessage("Admin", `${socket.id} has joined the chat , fuck him up`));

    // received new chat message from any user !!
    socket.on('createMessage', (message, callback) => {
        console.log("server : ", message);
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback("This is ACK from server");
    });

    socket.on('createLocationMessage', (position, callback) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', position.latitude, position.longitude));
        callback();
    });
 

    socket.on('disconnect', (socket) => {
        console.log("Client disconnected");
    });
});

server.listen(port , () => {
    console.log("Server is up and running ====> ")
});