'use strict';

angular.module('QuotationApp.masters').controller('adminRolesController',['$rootScope','$scope','$http', function($rootScope, $scope, $http) {

    $http.get('crud/admin/fetchAllRoles/').success(function(data){
        $scope.roleList=data;
    });
}]);