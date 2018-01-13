(function () {

    angular
        .module('home')
        .controller('HomeController', ['$scope', '$location', '$interval', HomeController]);

    function HomeController($scope, $location, $interval) {
        var hc = this,
            myloop = undefined,
            loopindex = 0;
        hc.imageurl = "/assets/img/aws.gif";
        hc.images = [];
        hc.isFirst = true;
        var socket = io();
        socket.on('newfile', function (msg) {
            var files = msg.split("/"),
                len = files.length;
            if (files && len > 1) {
                $scope.$apply(function () {
                    var imageName = files[len - 1];
                    hc.imageurl = imageName;
                    if (imageName.indexOf("finish") >= 0 || hc.images.length > 10) {
                        hc.isFirst = true;
                        hc.images.push(imageName);
                    } else {
                        if (hc.isFirst) hc.images = [];
                        hc.images.push(imageName);
                        hc.isFirst = false;

                    }
                });
                console.log(hc.imageurl);
            }
        });
        hc.loadThisImage = function (newurl) {
            hc.stopLoop()
            hc.imageurl = newurl;
        }
        hc.startLoop = function (newurl) {
            myloop = $interval(function () {
                hc.imageurl = hc.images[loopindex % (hc.images.length - 1)]
                loopindex++;
            }, 500);
        }
        hc.stopLoop = function () {
            if (angular.isDefined(myloop)) {
                $interval.cancel(myloop);
                myloop = undefined;
                loopindex = 0;
            }
        }
        hc.toogleLoop = function () {
            angular.isDefined(myloop) ? hc.stopLoop() : hc.startLoop();
        }
        return hc;
    };
})();
