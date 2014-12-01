'use strict';

angular.module('QuotationApp.masters').controller('adminAddUserController',['$rootScope','$http','$scope', function($rootScope, $http, $scope) {

    $http.get('crud/admin/fetchAllEmployee/').success(function (data) {
        console.log('all employee list : ');
        console.dir(data);
        $scope.employeeList = data;
    });

    $scope.modalShown=false;
    $scope.showEmployeeDetails=function(employee){
        $scope.modalShown=!$scope.modalShown;
        $scope.selectedEmployee=employee;
    }
    $scope.registerEmployee=function(selectedEmployee){

        $http.post('crud/admin/registerEmployee/',selectedEmployee).success(function(data){
            console.log(data);
            $scope.modalShown=!$scope.modalShown;
        });

    }

    $scope.cancelEmployeeDetails=function(){
        $scope.modalShown=!$scope.modalShown;
    }
}]);