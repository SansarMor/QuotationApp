'use strict';

angular.module('QuotationApp.masters').controller('adminRoleFluxController',['$rootScope','$scope','$http', function($rootScope, $scope, $http) {

    $http.get('crud/admin/role/roleFlux/fetchAllRoleFlows/').success(function(roleFlowData){
        /*$scope.roleFlowList=roleFlowData;*/
        $http.get('crud/admin/fetchAllRoles/').success(function(allRoleData){
          /*  $scope.allRolesList=allRoleData;*/
            $http.get('crud/admin/role/roleFlux/fetchAllFlux/').success(function(allFluxData) {
                $scope.allFluxData = allFluxData;
                $scope.roleFlowList=[];
                roleFlowData.forEach(function(roleFlow, index){
                    var newRoleFlow={
                        'roleFlow':roleFlow,
                        'roleName':'',
                        'fluxName':''
                    }
                    var existingRole = _.where(allRoleData, {Role_id: roleFlow.Role_id});
                    newRoleFlow.roleName=existingRole[0].Name;
                    var existingFlux = _.where(allFluxData, {KY: roleFlow.Flow});
                    newRoleFlow.fluxName=existingFlux[0].DL01;
                    $scope.roleFlowList.push(newRoleFlow);
                })
            });
        });
    });
}]);