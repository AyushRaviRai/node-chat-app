$(document).ready(function () {

    var socket = io();
    socket.on('connect', function() {
        console.log("connected to server");
    });

    socket.on('disconnect', function() {
        console.log("Disconnected from server");
    });

    socket.on('new_message', function (message) {
        console.log("New Message : ", message);
        var nayaMessage = $('<li></li>');
        nayaMessage.text(`${message.from} : ${message.text}`);
        $("#messages").append(nayaMessage);
    });

    $('#message-form').on('submit', function (e) {
        e.preventDefault();
        socket.emit('create_message', {
            from : socket.id,
            text : jQuery('[name=message]').val()
        }, function (ackData) {
            console.log(ackData);
        });
    });
});



