'use strict';

angular.module('QuotationApp.masters').controller('clientFacturationController',['$scope','rechercheClientService', function($scope, rechercheClientService){
    console.log('inside facturation controller');
    $scope.clientDetails=rechercheClientService.getClientDetails();
}]);