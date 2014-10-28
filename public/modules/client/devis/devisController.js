'use strict';

angular.module('QuotationApp.masters').controller('clientDevisController',['$scope','$http','rechercheClientService', function($scope, $http, rechercheClientService){

    console.log('inside devis controller');

    $scope.devisListDiv=true;
    $scope.addDevisDiv=false;

    $scope.clientDetails=rechercheClientService.getClientDetails();

    $scope.addDevis=function(){
        $scope.devisListDiv=false;
        $scope.addDevisDiv=true;
        console.log('inside add Devis function');

    }

    $scope.cancel=function(){
        $scope.devisListDiv=true;
        $scope.addDevisDiv=false;
    }
}]);