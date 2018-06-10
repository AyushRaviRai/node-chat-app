var socket = io();

socket.on('connect', function() {
    console.log("connected to server");
});

socket.on('disconnect', function() {
    console.log("Disconnected from server");
});

socket.on('new_message', function (message) {
    console.log("New Message : ", message);
});
