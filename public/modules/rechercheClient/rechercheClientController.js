'use strict';

angular.module('QuotationApp.masters').controller('rechercheClientController', ['$rootScope','$scope','$http','rechercheClientService', function($rootScope, $scope, $http, rechercheClientService){

    $http.get('crud/clients').success(function(data){
        $scope.clientList=[];
        $scope.clientList=data;
    });

    $scope.clientDetails=function(client){

        rechercheClientService.setClientDetails(client);

        $rootScope.$broadcast('clientDetails',client);

    }
}]);