'use strict';

angular.module('QuotationApp.masters').controller('ClientController',['$rootScope','$state','$scope', 'rechercheClientService', function($rootScope, $state, $scope, rechercheClientService){

    $scope.userMenus = [
        {
            'title': 'Infos principales',
            'state': 'infosPrincipales'
        },{
            'title': 'Sites',
            'state': 'sites'
        },{
            'title': 'Facturation',
            'state': 'facturation'
        },{
            'title': 'Contacts',
            'state': 'contacts'
        },{
            'title': 'Adresse compl',
            'state': 'adresseCompl'
        },{
            'title': 'Devis',
            'state': 'devis'
        },{
            'title': 'Commandes',
            'state': 'commandes'
        }
    ];

    $scope.showClientSection=function(userMenu){
        $scope.clientBodyURL='modules/client/'+userMenu.state+'/views/'+userMenu.state+'.html';
    }

    $scope.clientDetails=rechercheClientService.getClientDetails();
    console.log(rechercheClientService.getClientDetails());

}]);