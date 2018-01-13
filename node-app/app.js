var express = require('express'),
    app = express(),
    fs = require('fs'),
    http = require('http').Server(app);

var port = 80,
    folderTobeWatched = "/TransformedImages/",
    socket = require("./helpers/socket"),
    fsWatcher = require("./helpers/fileWatcher");
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/TransformedImages'));


var testCode = function (index) {
    var img = index < 3 ? index + '.jpg' : 'finish.jpg';
    fs
        .createReadStream(__dirname + '/TestImages/' + img)
        .pipe(fs.createWriteStream(__dirname + '/TransformedImages/' + img));

    setTimeout(function () {
        fs.unlink(__dirname + '/TransformedImages/' + img);
        img != "finish.jpg" ? testCode(index + 1) : console.log(img);
    }, 1000);
}

app.get('/test', function (req, res) {
    testCode(0);
    res.send("Done");
});

socket.init(http, function (initiatedSocket) {
    fsWatcher.init(initiatedSocket, folderTobeWatched);
    http.listen(port, function () {
        console.log("GGN's UI manger is running on port " + port);
    });
});
