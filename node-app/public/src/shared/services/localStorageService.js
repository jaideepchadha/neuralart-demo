angular.module('shared.services').factory("localStorage", ['$window', '$rootScope', function ($window, $rootScope) {
    return {
        setData: function (key, val, isString) {
            val = isString ? val : JSON.stringify(val);
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function (key, isString) {
            var val = $window.localStorage && $window.localStorage.getItem(key);
            return isString ? val : JSON.parse(val);
        }
    };
}]);