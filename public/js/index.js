$(document).ready(function () {

    var socket = io();
    socket.on('connect', function() {
        console.log("connected to server");
    });

    socket.on('disconnect', function() {
        console.log("Disconnected from server");
    });

    socket.on('newMessage', function (message) {
        var formattedTime = moment(message.createdAt).format('h:mm:ss a');
        console.log("New Message : ", message);
        var nayaMessage = $('<li></li>');
        nayaMessage.text(`${message.from} ${formattedTime}: ${message.text}`);
        $("#messages").append(nayaMessage);
    });

    socket.on('newLocationMessage', function (message) {
        var formattedTime = moment(message.createdAt).format('h:mm:ss a');
        console.log("New Location Message : ", message);
        var nayaMessage = $(`<li>Admin ${formattedTime} : </li>`);
        var anchor = $('<a target="_blank">My Current Location</a>');
        anchor.attr('href', message.url);
        nayaMessage.append(anchor);
        $("#messages").append(nayaMessage);
    });

    $('#message-form').on('submit', function (e) {
        e.preventDefault();
        var message = $('[name=message]');
        if (message.val()) {
            socket.emit('createMessage', {
                from : socket.id,
                text : message.val()
            }, function (ackData) {
                console.log(ackData);
                message.val('');
            });
        }
    });

    var locationButton = $("#send-location");
    locationButton.on('click', function (event) {
        console.log(navigator.geolocation);
        // Geolocation api is not there in fucking browser
        if (!navigator.geolocation) {
            return alert('geolocation not supported by your browser');
        }

        locationButton.attr('disabled', 'disabled').text('Sending Location ...');

        // Geolocation take success and error callbacks
        navigator.geolocation.getCurrentPosition(function (position) {
            socket.emit('createLocationMessage', {
                latitude : position.coords.latitude,
                longitude : position.coords.longitude
            }, function (data) {
                locationButton.removeAttr('disabled').text('Send Location');
            });
        }, function (error) {
            alert("Unable to fetch the location");
            locationButton.removeAttr('disabled').text('Send Location');
        });
    });
});



