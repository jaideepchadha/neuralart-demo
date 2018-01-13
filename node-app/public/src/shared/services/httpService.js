angular.module('shared.services').service("httpService", ['$rootScope', '$q', '$http', 'localStorage', httpService]);

function httpService($rootScope, $q, $http, localStorage) {
    var self = this;

    this.makeRequest = function (requestJSON, successCallback, errorCallback) {
        requestJSON.headers = requestJSON.headers || {};
        requestJSON.headers['Access-Token'] = localStorage.getData('accesstoken', true);
        $http(requestJSON).then(function (response) {
            successCallback(response);
        }, function (err) {
            errorCallback(err);
        });
    }

};