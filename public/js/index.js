var socket = io();

socket.on('connect', function() {
    console.log("connected to server");
});

socket.on('disconnect', function() {
    console.log("Disconnected from server");
});

socket.on('newEmail', function (email) {
    console.log(email.text);
    console.log("We have got new email for you");
});

socket.emit('createEmail', {
    to : "yourass",
    text : "this is your shit",
    createdAt : "time"
});