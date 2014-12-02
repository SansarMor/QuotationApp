'use strict';

angular.module('QuotationApp.masters').controller('clientDevisController',['$rootScope','$scope','$http','rechercheClientService', function($rootScope, $scope, $http, rechercheClientService){

    console.log('inside devis controller');

    if($scope.selectedSite==undefined){
        console.log('direct from devis section');
        $scope.devisListDiv=true;
        $scope.addDevisDiv=false;
    }else{
        console.log('from site section');
        $scope.devisListDiv=false;
        $scope.addDevisDiv=true;
    }

    $scope.clientDetails=rechercheClientService.getClientDetails();

    $scope.initializeQuote=function() {
        $http.get('crud/client/devis/' + $scope.clientDetails.id).success(function (data) {
            console.log('client quotes are');
            console.dir(data);
            $scope.clientQuotes = data;
        });
    }

    $scope.showSelectedClientQuoteDetails=function(clientQuote){
        console.log('selected client quote is : ');
        $scope.selectedDevisType='SICLI001';
        console.dir(clientQuote);
        $scope.devisListDiv=false;
        $scope.addDevisDiv=false;

        $scope.devisParams.customer_id=$scope.clientDetails.id;
        $scope.devisParams.devisType=$scope.selectedDevisType;
        $scope.currentQuote=clientQuote;
        $scope.devisPanierBodyURL='modules/client/panier/views/panier.html';
    }


    /*Fetch site list by client Id*/
    $http.get('crud/client/sites/'+$scope.clientDetails.id).success(function(data){
        console.log('client sites are');
        console.dir(data);
        $scope.clientSites=data;
    });

    /*Fetch all sub_site list*/
    $http.get('crud/client/site/sub_sites/').success(function(data){
        console.log('client sub_sites are');
        console.dir(data);
        $scope.clientSubSites=data;
    });


    /*fetch Quote type */
    $http.get('crud/clients/chapter').success(function(data){
        console.log('devis type data is : ');
        console.dir(data);
        $scope.devisTypeList=[];
        $scope.devisTypeList=data;
    });

    $http.get('crud/client/Quote/Catalogue/allItems/').success(function (data) {
        $scope.allItemsList=data;
    });

    $http.get('crud/client/Quote/paragraph/allQuoteParaProduct/').success(function(data) {
        $scope.allQuoteParaProduct = data;
    });

    $scope.addDevis=function(){
        /*$scope.devisListDiv=false;*/
        $scope.addDevisDiv=true;
        console.log('inside add Devis function');

    }

    $scope.cancelDevis=function(){
        console.log('inside cancel devis funciton');
        $scope.devisListDiv=true;
        $scope.addDevisDiv=false;
    }

    $scope.devisSelected=function(devisName){
        $("#devis").text(devisName);
    }

    $scope.venteProductTypeSelected=function(venteProduct){
        $("#devis_type").text(venteProduct);
    }

    $scope.devisTypeSelected=function(devisType){
        $("#type_de_devis").text(devisType.name);
        $scope.selectedDevisType=devisType.name;
    }

    $scope.devisParams={
        customer_id : $scope.clientDetails.id,
        devisType : ''
    };

    $scope.registerDevis=function(){

        $scope.devisListDiv=false;
        $scope.addDevisDiv=false;

        $scope.devisParams.customer_id=$scope.clientDetails.id;
        $scope.devisParams.devisType=$scope.selectedDevisType;

        $http.get('crud/client/saveDevis/'+$scope.devisParams.customer_id+'/'+$scope.devisParams.devisType).success(function(data){

            $scope.currentQuote=data[0];
            if($scope.selectedSite==undefined){
                console.log('direct from devis section');
                $scope.devisPanierBodyURL='modules/client/panier/views/panier.html';
            }else{
                console.log('from site section');
                /*---------------*/
                $http.get('crud/client/Quote/saveQuoteParagraph/' + $scope.currentQuote.Quotation_id + '/' + $scope.selectedSite.id + '/null/null').success(function (data) {
                $scope.devisPanierBodyURL='modules/client/panier/views/panier.html';
                });
                /*---------------*/
            }

        });
    }

    $rootScope.$on('backToDevis', function(event){
        $scope.devisListDiv=true;
        $scope.addDevisDiv=false;
        $scope.devisPanierBodyURL='';
        $scope.initializeQuote();
    });

}]);