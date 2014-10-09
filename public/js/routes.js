
'use strict';

//Setting up route
angular.module('QuotationApp').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
	
      // For unmatched routes:
      $urlRouterProvider.otherwise('/');

      // states for my app
      $stateProvider.state('HOME', {
          url: '/home',
          templateUrl: 'modules/home/views/home.html'
      }).state('rechercheClient',{
          url: '/RechercheClient',
          templateUrl: 'modules/rechercheClient/views/rechercheClient.html'
      }).state('index',{
          url: '/index',
          templateUrl: 'views/index.html'
      }).state('LOGOUT', {
          url: '/logout',
          templateUrl: 'views/login.html'
      });
  }
]);

//Setting HTML5 Location Mode
angular.module('QuotationApp').config(['$locationProvider',
  function($locationProvider) {
      $locationProvider.hashPrefix('!');
  }
]);
