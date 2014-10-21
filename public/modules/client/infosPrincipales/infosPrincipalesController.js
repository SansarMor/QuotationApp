'use strict';

angular.module('QuotationApp.masters').controller('ClientInfoPController',['$scope','rechercheClientService', function($scope, rechercheClientService){
console.log('inside info Principales');
    $scope.clientDetails=rechercheClientService.getClientDetails();
}]);