
'use strict';

//Setting up route
angular.module('QuotationApp').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
	
      // For unmatched routes:
      $urlRouterProvider.otherwise('/login');

      // states for my app
      $stateProvider.state('PRODUCT-LIST', {
          url: '/products',
          templateUrl: 'modules/products/views/productList.html'
      }).state('DASHBOARD', {
          url: '/dashboard',
          views: {
              '@': {
                  templateUrl: 'modules/dashboard/views/dashboard.html'
              },
              'sidebar@DASHBOARD': {
                  templateUrl: 'modules/productSelector/views/productSelector.html'
              }
          }
      }).state('HOME', {
          url: '/home',
          templateUrl: 'modules/home/views/home.html'
      }).state('MYPROFILE',{
          url: '/myProfile',
          templateUrl: 'modules/myProfile/views/myProfile.html'
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
