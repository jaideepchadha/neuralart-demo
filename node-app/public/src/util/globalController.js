(function () {
    angular
        .module('util')
        .controller('globalController', ['$rootScope', '$routeParams', '$mdSidenav', '$mdBottomSheet', '$log', '$q', '$scope', '$window', 'localStorage', 'httpService', globalController]);

    function globalController($rootScope, $routeParams, $mdSidenav, $mdBottomSheet, $log, $q, $scope, $window, localStorage, httpService) {
        var self = this;
        self.user = {
            Name: "Guest"
        };

        var setUser = function (userDetail) {
            self.user = {
                Name: userDetail.name,
                isAuthenticated: true
            };

            var reqObj = {
                method: "post",
                data: userDetail,
                url: GLOBALCONFIG.ServiceManager.getUrls('registerUser')
            };

            httpService.makeRequest(reqObj, function (res) {
                console.log("User Registered!");

            }, function (err) {
                debugger;
            });
        };

        $window.fbAsyncInit = function () {
            FB.init({
                appId: '681826728631616',
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.4'
            });
        };

        var checkLoginStatus = function () {
            facebookService.getLoginStatus(function (response) {
                if (response.status != "connected") {
                    return alert("Unable to login to facebook, Please check your credentials");
                }
                facebookService.getMyDetails(function (err, user) {
                    if (err) {
                        return alert("Unable to login to facebook, Please try again later");
                    }
                    setUser(user);
                    saveToken(response);
                });
            });
        }

        var saveToken = function (token) {
            var accessToken = {
                tokenValidator: 'facebook',
                token: token.authResponse
            }
            localStorage.setData('accesstoken', accessToken);
        };

        $rootScope.$on('FBUserLoggedIn', function () {
            checkLoginStatus();
        });
    }

    function facebookLoginService($q) {
        return {
            getMyDetails: function (callback) {
                FB.api('/me', {
                        fields: 'name,email,birthday,hometown,location'
                    },
                    function (response) {
                        if (!response || response.error) {
                            callback('Error occured', null);
                        } else {
                            callback(null, response);
                        }
                    });
            },
            getLoginStatus: function (callback) {
                FB.getLoginStatus(function (response) {
                    callback(response);
                });
            }
        }
    }

})();
