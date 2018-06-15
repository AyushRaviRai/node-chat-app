const express = require('express');
const path = require('path');
const http = require('http');
const  socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations.js');
const {Users} = require('./utils/users.js');

const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

// set up static web pages
var publicPath = path.join(__dirname, '/../public');
app.use(express.static(publicPath));


var connectedUsers = new Users();
io.on('connection', (socket) => {
    console.log('new user connected ');
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            callback('Room name and Room name is required');
        }

        socket.join(params.room);

        // Remove user from any existing room !!
        connectedUsers.removeUser(socket.id);
        connectedUsers.addUser(socket.id, params.name, params.room);

        socket.emit('newMessage', generateMessage("Admin",`Hey ${params.name} welcome to the ${params.room} room`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage("Admin", `${params.name} has joined`));

        io.to(params.room).emit('updateUserList', connectedUsers.getUserList(params.room));
        callback();
    })  

    // received new chat message from any user !!
    socket.on('createMessage', (message, callback) => {
        console.log("server : ", message);
        io.to(connectedUsers.getUser(socket.id).room).emit('newMessage', generateMessage(message.from, message.text));
        callback("This is ACK from server");
    });

    socket.on('createLocationMessage', (position, callback) => {
        io.to(connectedUsers.getUser(socket.id).room).emit('newLocationMessage', generateLocationMessage('Admin', position.latitude, position.longitude));
        callback();
    });
 

    socket.on('disconnect', () => {
        var removedUser = connectedUsers.removeUser(socket.id);
        if (removedUser) {
            io.to(removedUser.room).emit('updateUserList', connectedUsers.getUserList(removedUser.room));
            io.to(removedUser.room).emit('newMessage', generateMessage('Admin', `${removedUser.name} has left the Nukkad`));
            console.log("Client disconnected");
        }
    });
});


server.listen(port , () => {
    console.log("Server is up and running ====> ")
});