
'use strict';

//Setting up route
angular.module('QuotationApp.masters').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes:
        $urlRouterProvider.otherwise('/');

        // states for my app
        $stateProvider.state('infosPrincipales', {
            url: '/clientDetails/infosPrincipales',
            templateUrl: 'modules/client/infosPrincipales/views/infosPrincipales.html'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('QuotationApp.masters').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);
