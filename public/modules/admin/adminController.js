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

    $scope.registerRole=function(role){
        console.dir(role);
        $http.post('crud/admin/registerRole/', role).success(function(data){
            console.log(data);
            $scope.modalShown=!$scope.modalShown;
        });
    }

}]);