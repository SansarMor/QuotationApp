'use strict';

angular.module('QuotationApp.masters').controller('clientAdresseComplController',['$scope','rechercheClientService', function($scope, rechercheClientService){
    console.log('inside adresse Compl controller');
    $scope.clientDetails=rechercheClientService.getClientDetails();
}]);