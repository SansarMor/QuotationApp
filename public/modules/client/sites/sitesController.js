'use strict';

angular.module('QuotationApp.masters').controller('clientSitesController',['$scope','$http', 'rechercheClientService', function($scope, $http, rechercheClientService){
    console.log('inside client sites section');
    $scope.siteDataDiv=true;
    $scope.clientDetails=rechercheClientService.getClientDetails();
    console.dir($scope.clientDetails);

    $http.get('crud/client/sites/'+$scope.clientDetails.id).success(function(data){
        console.log('client sites are : ');
        console.dir(data);
        $scope.clientSites=data;

    });

    $scope.clientSitesList=true;
    $scope.viewClientSites=false;
    $scope.sitesListButton=false;
    $scope.addSite1=false;
    $scope.addSiteButton=true;

    $scope.viewClientSite=function(){

        $scope.clientSitesList=false;
        $scope.viewClientSites=true;
        $scope.sitesListButton=true;
        $scope.addSite1=false;
        $scope.addSiteButton=true;
        $scope.clientSiteBodyURL='modules/client/sites/views/viewSite.html';

    };

    $scope.showSitesList=function(){
        console.log('inside show sites list');
        $scope.addSiteButton=true;
        $scope.clientSitesList=true;
        $scope.viewClientSites=false;
        $scope.sitesListButton=false;
        $scope.addSite1=false;

    };

    $scope.addSite=function(){
        console.log('inside add site function');
      $scope.addSite1=true;
      $scope.viewClientSites=false;
      $scope.clientSitesList=false;
      $scope.addSiteButton=false;
      $scope.sitesListButton=true;
      $scope.addSiteSaveButton=true;

        $scope.clientSiteBodyURL='modules/client/sites/views/addSite.html';

    };

    $scope.cancelSaveSiteSection=function(){
        $scope.clientSitesList=true;
        $scope.addSiteButton=true;
        $scope.sitesListButton=false;
        $scope.addSiteSaveButton=false;
        $scope.addSite1=false;
    };

    $scope.cancelSubSiteSection=function(){
        $scope.addSubSite=false;
    };

    $scope.addSubSite1=function(siteId){
        console.log('selected siteId is :'+siteId);
        $scope.subSiteParameters = {
            Site_Id : siteId,
            MLNM : ''
        };

        $scope.addSubSite=true;
    };

    $scope.saveClientSubSite=function(subSiteParameters){
      console.log('sub site parameters are : ');
      console.dir(subSiteParameters);
      $http.post('crud/client/site/subSite/', subSiteParameters).then(function () {

            console.log('inside save sub site method after saving data');
            $scope.addSubSite=false;

        });

    };

    $scope.addQuote=function(clientSite){
        console.log('inside add quote for client site');
        $scope.siteDataDiv=false;
        $scope.selectedSite=clientSite;
        $scope.clientSiteQuoteBodyURL='modules/client/devis/views/devis.html';
    }
}]);