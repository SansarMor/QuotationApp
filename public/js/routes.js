
'use strict';

//Setting up route
angular.module('QuotationApp').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
	
      // For unmatched routes:
      $urlRouterProvider.otherwise('/');

      // states for my app
      $stateProvider.state('tableauDeBord', {
          url: '/TableauDeBord',
          templateUrl: 'modules/tableauDeBord/views/tableauDeBord.html'
      }).state('rechercheClient',{
          url: '/RechercheClient',
          templateUrl: 'modules/rechercheClient/views/rechercheClient.html'
      }).state('mesdevis',{
          url: '/Mesdevis',
          templateUrl: 'modules/mesdevis/views/mesdevis.html'
      }).state('delegation',{
          url: '/Delegation',
          templateUrl: 'modules/delegation/views/delegation.html'
      }).state('mesApprobations',{
          url: '/MesApprobations',
          templateUrl: 'modules/mesApprobations/views/mesApprobations.html'
      }).state('clientDetails', {
          url: '/clientDetails',
          templateUrl: 'modules/client/views/client.html'
      }).state('admin',{
          url:'/admin',
          templateUrl:'modules/admin/views/admin.html'
      }).state('addUser',{
          url:'/addUser',
          templateUrl:'modules/admin/addUser/views/addUser.html'
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
