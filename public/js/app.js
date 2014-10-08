'use strict';

angular.module('QuotationApp', ['ngCookies', 'ngResource', 'ui.bootstrap', 'ui.router', 'QuotationApp.system', 'QuotationApp.dash', 'QuotationApp.masters']);

angular.module('QuotationApp.system', []);
angular.module('QuotationApp.dash', []);
angular.module('QuotationApp.masters', []);

angular.module('QuotationApp').factory('lodash', ['$window',
    function($window) {
        return $window._;
    }
]);
