'use strict';

angular.module('QuotationApp.masters').controller('rechercheClientController', ['$scope','$http', function($scope, $http){

    $http.get('crud/clients').success(function(data){
        $scope.clientList=[];
        $scope.clientList=data;
    });
}]);