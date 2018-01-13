(function (socket) {
    'use strict';

    socket.init = function (http, callback) {
        var io = require('socket.io')(http);
        io.on('connection', function (socket) {
            console.log('a user connected');
            socket.on('disconnect', function () {
                console.log('user disconnected');
            })
        });
        socket.broadcast = function (topic, msg) {
            io.emit(topic, msg)
        }
        callback(socket);
    }
})(module.exports);
