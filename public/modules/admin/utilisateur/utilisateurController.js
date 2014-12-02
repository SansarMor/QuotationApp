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
            $scope.allRolesList=[];
            $http.get('crud/admin/fetchUserRolesByUserId/'+selectedUser.user.User_id).success(function(userRolesData){
               if(userRolesData.length == '0'){
                   $scope.userRolesList=[];
                   $scope.allRolesList=allRoleData;
                   $scope.selectedUser=selectedUser;
                   $scope.modalShown=!$scope.modalShown;
               } else{
                   var i=0;
                   allRoleData.forEach(function(role, index){
                       var existingRole = _.where(userRolesData, {Role_id: role.Role_id});
                          if(existingRole.length>0){
                              $scope.userRolesList.push(role);
                              if(i+1 == allRoleData.length){
                                  $scope.selectedUser=selectedUser;
                                  $scope.modalShown=!$scope.modalShown;
                              }else{
                                  i++;
                              }
                          }else{
                              $scope.allRolesList.push(role);
                              if(i+1 == allRoleData.length){
                                  $scope.selectedUser=selectedUser;
                                  $scope.modalShown=!$scope.modalShown;
                              }else{
                                  i++;
                              }
                          }
                   });
               }
            });

        });
    }

    $scope.cancelUserDetails=function(){
        $scope.userRolesList=[];
        $scope.allRolesList=[];
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
            $scope.userRolesList=[];
            $scope.allRolesList=[];
            $scope.modalShown=!$scope.modalShown;
        });
    }

}]);