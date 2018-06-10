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
    socket.on('disconnect', (socket) => {
        console.log("Client disconnected");
    });
});



server.listen(port , () => {
    console.log("Server is up and running ====> ")
});