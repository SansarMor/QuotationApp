'use strict';

angular.module('QuotationApp.masters').controller('adminController',['$rootScope', '$http', '$state','$scope', function($rootScope, $http, $state, $scope){

    $scope.adminMenus = [
        {
            'title': 'Utilisateur',
            'state': 'utilisateur'
        },{
            'title': 'Roles',
            'state': 'roles'
        },{
            'title': 'Role Flux',
            'state': 'roleFlux'
        },{
            'title': 'Conditions',
            'state': 'conditions'
        },{
            'title': 'Regles dapprobation',
            'state': 'reglesDapprobation'
        },{
            'title': 'Parametres',
            'state': 'parametres'
        }
    ];

    $scope.showAdminSection=function(adminMenu){
        $scope.clientBodyURL='modules/admin/'+adminMenu.state+'/views/'+adminMenu.state+'.html';
    }

    $scope.modalShown=false;
    $scope.role={
        name:'',
        description:''
    }
    $scope.addRole=function(){
        $scope.role.name='';
        $scope.role.description='';
        $scope.modalShown=!$scope.modalShown;
    }

    $scope.roleFluxModalShown=false;
    $scope.addRoleFlux=function(){
        $http.get('crud/admin/fetchAllRoles/').success(function(allRoleData){
            $scope.allRolesList=allRoleData;
        });
        $http.get('crud/admin/role/roleFlux/fetchAllFlux/').success(function(allFluxData){
           $scope.allFluxData=allFluxData;
           $scope.roleFluxModalShown=!$scope.roleFluxModalShown;
        });
    }

    $scope.cancelRoleFlux=function(){
        $scope.allRolesList=[];
        $scope.allFluxData=[];
        $scope.roleFluxModalShown=!$scope.roleFluxModalShown;
    }

    $scope.cancelRole=function(){
        $scope.modalShown=!$scope.modalShown;
    }

    $scope.registerRole=function(role){
        console.dir(role);
        $http.post('crud/admin/registerRole/', role).success(function(data){
            console.log(data);
            $scope.modalShown=!$scope.modalShown;
        });
    }

    $scope.roleSelected=function(role){
        $("#selectedRoleId").text(role.Name);
        $scope.selectedRoleId=role.Role_id;
    }
    $scope.typeAgenceSelected=function(selectedAgence){
        $("#selectedTypeAgenceId").text(selectedAgence);
        $scope.selectedAgence=selectedAgence;
    }
    $scope.fluxDataSelected=function(fluxData){
        $("#selectedFluxId").text(fluxData.DL01);
        $scope.selectedFlux=fluxData.KY;
    }

    $scope.registerRoleFlux=function(){
        $http.post('crud/admin/role/roleFlux/registerRoleFlux/'+$scope.selectedRoleId+'/'+$scope.selectedAgence+'/'+$scope.selectedFlux).success(function(data){
            console.log(data);
            $scope.roleFluxModalShown=!$scope.roleFluxModalShown;
        });
    }

}]);