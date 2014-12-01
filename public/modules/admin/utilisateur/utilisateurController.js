'use strict';

angular.module('QuotationApp.masters').controller('adminUtilisateurController',['$rootScope','$scope','$http', function($rootScope, $scope, $http) {

    $http.get('crud/admin/fetchAllEmployee/').success(function (empData) {
        $scope.employeeList = empData;
        $http.get('crud/admin/fetchAllUsers/').success(function(userData){
            $scope.usersList=userData;
            console.log('user list is ; ');
            console.dir($scope.usersList);
            $scope.selectedUsersList=[];

            $scope.usersList.forEach(function(user, index){
               var selectedUser={
                    'user':user,
                    'employee':''
                }

                $scope.employeeList.forEach(function(employee, index){

                    if(user.User_Employee_AN8 == employee.AN8){
                        selectedUser.employee=employee;
                        $scope.selectedUsersList.push(selectedUser);
                        console.dir($scope.selectedUsersList);
                    }
                });
            });
        });
    });


    $scope.userRolesList=[];

    $scope.modalShown=false;
    $scope.showSelectedUserDetails=function(selectedUser){
        $http.get('crud/admin/fetchAllRoles/').success(function(allRoleData){
            $scope.allRolesList=allRoleData;
            $scope.userRolesList=[];
            $scope.selectedUser=selectedUser;
            $scope.modalShown=!$scope.modalShown;
        });
    }

    $scope.cancelUserDetails=function(){
        $scope.modalShown=!$scope.modalShown;
    }

    $scope.addRoleToUserRolesList=function(role){
        $scope.userRolesList.push(role);
        $scope.allRolesList.splice($scope.allRolesList.indexOf(role), 1);
    }

    $scope.removeRoleToUserRolesList=function(userRole){
        $scope.allRolesList.push(userRole);
        $scope.userRolesList.splice($scope.userRolesList.indexOf(userRole), 1);
    }

    $scope.registerUserRoles=function(){
        $http.post('crud/admin/roles/userRoles/saveUserRoles/'+$scope.selectedUser.user.User_id, $scope.userRolesList).success(function(data){
            console.log(data);
            $scope.modalShown=!$scope.modalShown;
        });
    }

}]);