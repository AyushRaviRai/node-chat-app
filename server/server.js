const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// set up static web pages
var publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected ');

    socket.emit('new_message', {
        from : "Tera Baap",
        text : `welcome ${socket.id}`,
        timestamp : new Date().getTime()
    });

    socket.broadcast.emit('new_message', {
        from : "Tera Baap",
        text : `${socket.id} has joined the chat , fuck him up`,
        timestamp : new Date().getTime()
    });

    // received new chat message from any user !!
    socket.on('create_message', (message) => {
        console.log("server : ", message);
        io.emit('new_message', {message : message});
    });
 

    socket.on('disconnect', (socket) => {
        console.log("Client disconnected");
    });
});

server.listen(port , () => {
    console.log("Server is up and running ====> ")
});