(function () {

    angular
        .module('TL', ['ngMaterial', 'ngRoute', 'ui.bootstrap', 'ngSlider', 'util', 'home', 'shared'])
        .config(function ($mdThemingProvider, $mdIconProvider) {

            $mdIconProvider
                .icon("menu", "./assets/svg/menu.svg", 24)
                .icon("share", "./assets/svg/share.svg", 24)
                .icon("google_plus", "./assets/svg/google_plus.svg", 512)
                .icon("hangouts", "./assets/svg/hangouts.svg", 512)
                .icon("twitter", "./assets/svg/twitter.svg", 512)
                .icon("call", "./assets/svg/call.svg", 16)
                .icon("mail", "./assets/svg/e-mail.svg", 16)

            $mdThemingProvider.theme('default')
                .primaryPalette('indigo')
                .accentPalette('red');
        });


    angular.module('TL').config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "src/home/view/home.html"
        }).otherwise({
            redirectTo: '/'
        });
    });
})();
