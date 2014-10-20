'use strict';

angular.module('QuotationApp.masters').controller('clientSitesController',['$scope','$http', 'rechercheClientService', function($scope, $http, rechercheClientService){
    console.log('inside client sites section');
    $scope.clientDetails=rechercheClientService.getClientDetails();

    $http.get('crud/client/sites/'+$scope.clientDetails.AN8).success(function(data){
        console.log('client sites are : ');
        console.dir(data);
        $scope.clientSites=data;

    });

    $scope.clientSitesList=true;
    $scope.viewClientSites=false;
    $scope.sitesListButton=false;
    $scope.addSite=false;
    $scope.addSiteButton=true;



    $scope.viewClientSite=function(){

        $scope.clientSitesList=false;
        $scope.viewClientSites=true;
        $scope.sitesListButton=true;
        $scope.addSite=false;
        $scope.addSiteButton=true;

        $scope.clientSiteInfos = [
            {
                'title': 'Infos principales du site',
                'state': 'infosPrincipalesDuSite'
            },{
                'title': 'Adresse',
                'state': 'adresse'
            },{
                'title': 'Complements',
                'state': 'complements'
            }
        ];

    };

    $scope.showSitesList=function(){
        console.log('inside show sites list');
        $scope.addSiteButton=true;
        $scope.clientSitesList=true;
        $scope.viewClientSites=false;
        $scope.sitesListButton=false;
        $scope.addSite=false;

    };

    $scope.addSite=function(){
        console.log('inside add site function');
      $scope.addSite=true;
      $scope.clientSitesList=false;
      $scope.addSiteButton=false;
      $scope.sitesListButton=true;
      $scope.addSiteSaveButton=true;

        $scope.clientSiteInfos = [
            {
                'title': 'Infos principales du site',
                'state': 'addInfosPrincipalesDuSite'
            },{
                'title': 'Adresse',
                'state': 'addAdresse'
            },{
                'title': 'Complements',
                'state': 'addComplements'
            }
        ];
    };

    $scope.cancel=function(){
        $scope.clientSitesList=true;
        $scope.addSiteButton=true;
        $scope.sitesListButton=false;
        $scope.addSiteSaveButton=false;
        $scope.addSite=false;
    };

    $scope.showClientSiteSection=function(clientSiteInfo){
        $scope.clientSiteBodyURL='modules/client/sites/views/'+clientSiteInfo.state+'.html';
    };
}]);