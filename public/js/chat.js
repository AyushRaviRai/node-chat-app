$(document).ready(function () {

    /**
     * [
     *     Bada Sexy logic hain iske peeche :) :)
     *     Maza aaya samajh ke
     * ]
     * @return {[type]} [description]
     */
    function scrollToBottom() {
        var messages = $('#messages');
        var latestMessage = messages.children('li:last-child');

        var clientHeight = messages.prop('clientHeight');
        var scrollTop = messages.prop('scrollTop');
        var scrollHeight = messages.prop('scrollHeight');
        var latestMessageHeight = latestMessage.innerHeight();

        // Yeh pata nahi kyu kiya hain 
        // may be buffer not sure have to confirm
        var secondLastMessageHeight = latestMessage.prev().innerHeight();

        if (clientHeight + scrollTop + latestMessageHeight + secondLastMessageHeight >= scrollHeight) {
            messages.prop('scrollTop', scrollHeight);
        }
    }

    var socket = io();
    socket.on('connect', function() {
        console.log("connected to server");
    });

    socket.on('disconnect', function() {
        console.log("Disconnected from server");
    });

    socket.on('newMessage', function (message) {
        var formattedTime = moment(message.createdAt).format('h:mm:ss a');
        var template = $('#message-template').html();
        console.log(template);
        var html = Mustache.render(template, {
            from : message.from,
            text : message.text,
            createdAt : formattedTime
        });

        $('#messages').append(html);
        scrollToBottom();
    });

    socket.on('newLocationMessage', function (message) {
        var formattedTime = moment(message.createdAt).format('h:mm:ss a');
        var formattedTime = moment(message.createdAt).format('h:mm:ss a');
        var template = $('#location-message-template').html();
        var html = Mustache.render(template, {
            from : message.from,
            createdAt : formattedTime,
            url : message.url
        });

        $('#messages').append(html);
        scrollToBottom();
    });

    $('#message-form').on('submit', function (e) {
        e.preventDefault();
        var message = $('[name=message]');
        // if (message.val()) {
            socket.emit('createMessage', {
                from : new URLSearchParams(window.location.search).get('name'),
                text : message.val()
            }, function (ackData) {
                console.log(ackData);
                message.val('');
            });
        // }
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



