(function (fileWatcher) {
    'use strict';
    fileWatcher.init = function (socket, folderName) {
        var chokidar = require('chokidar'),
            path = require('path');
        var folder = path.join(__dirname, "..", folderName);
        console.log(folder);
        var watcher = chokidar.watch(folder, {
            ignored: /(^|[\/\\])\../,
            persistent: true
        });
        watcher
            .on('change', function (path) {
                socket.broadcast('newfile', path);
            }).on('add', function (path) {
                socket.broadcast('newfile', path);
            })
            .on('unlink', function (path) {
                console.log("unlink" + path)
            })
            .on('addDir', function (path) {
                console.log("adddir" + path)
            })
            .on('unlinkDir', function (path) {
                console.log("unlinkDir" + path)
            })
            .on('error', function (error) {
                console.log("error" + path)
            })
            .on('ready', function () {
                console.log("ready")
            })
            .on('raw', function (event, path, details) {
                console.log("raw" + event + path + details);
            });
    }
})(module.exports);
