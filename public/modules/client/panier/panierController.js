'use strict';

angular.module('QuotationApp.masters').controller('ClientPanierController',['$rootScope','$scope', '$http', 'rechercheClientService', function($rootScope, $scope, $http, rechercheClientService){

    $scope.catalogueItemsList=[];

    $scope.initFunction=function(){

        console.log('inside init function');
        $http.get('crud/client/Quote/Panier/' + $scope.currentQuote.Quotation_id).success(function (panierData) {
            console.log('list of paragraphs :- '); console.dir(panierData);
            $scope.actualPanierList=[];

            $scope.panierList=panierData;
            $http.get('crud/client/Quote/paragraph/allQuoteParaProduct/').success(function(data) {
                $scope.fetchedCatalogueList = [];
                $scope.allQuoteParaProduct = data;
                $scope.panierList.forEach(function (panier, index) {

                    $scope.actualPanier = {
                        panier: panier,
                        Site_name: '',
                        SubSite_name: '',
                        catalogueList: ''
                    };


                    $scope.allQuoteParaProduct.forEach(function (quoteParaProduct, index) {

                        var itemInQuotePara = {
                            quoteParaProd: '',
                            item: ''
                        }

                        if (panier.QuotationParagraph_id == quoteParaProduct.QuotationParagraph_id) {

                            itemInQuotePara.quoteParaProd = quoteParaProduct;
                            $scope.allItemsList.forEach(function (item, index) {

                                if (quoteParaProduct.Item_id == item.id) {
                                    itemInQuotePara.item = item;
                                    $scope.fetchedCatalogueList.push(itemInQuotePara);
                                }
                            });

                        }
                    });

                    $scope.clientSites.forEach(function (clientSite, index) {
                        if (clientSite.id == panier.Site_id) {
                            $scope.actualPanier.Site_name = clientSite.MLNM;
                        }
                    });
                    $scope.clientSubSites.forEach(function (clientSubSite, index) {
                        if (clientSubSite.id == panier.SubSite_id) {
                            $scope.actualPanier.SubSite_name = clientSubSite.MLNM;
                        }
                    });

                    $scope.actualPanier.catalogueList = $scope.fetchedCatalogueList;
                    $scope.actualPanierList.push($scope.actualPanier);
                    console.log('after pushing data value of panier list is : ');
                    console.dir($scope.actualPanierList);
                    /*});*/

                });
            });
        });
    };

    $scope.divAddParagraph=false;
    $scope.divPanier=true;
    $scope.catalogueIncludeDiv=false;
    $scope.recycleCatIncludeDiv=false;
    $scope.editCatIncludeDiv=false;

    $scope.addParagraph=function(){
        $("#siteId").text('Nom du site');
        $("#subSiteId").text('Nom du sous-site');
        $("#paraDescriptionId").val('');
        $scope.paragraphDescription='';
        $scope.divAddParagraph=true;
        $scope.divPanier=false;
    }

    $scope.cancelParagraph=function(){
        $scope.divAddParagraph=false;
        $scope.divPanier=true;
    }

    $scope.fetchedSubSiteList=[];

    $scope.paragraphDescription='';
    $scope.fetchSubSites=function(site){
        $("#siteId").text(site.MLNM);

        $scope.selectedSite=site.id;

        $scope.clientSubSites.forEach(function(subSite, index){

            if(site.id==subSite.Site_Id){
                $scope.fetchedSubSiteList.push(subSite);
            }
        });
    }

    $scope.selectedSubSite='';
    $scope.subSiteSelected=function(subSite){
        $("#subSiteId").text(subSite.id);
        $scope.selectedSubSite=subSite.id;
    }

    $scope.registerParagraph=function(paragraphDescription){
        $scope.paragraphDescription=paragraphDescription;
        console.log('description is : '+$scope.paragraphDescription);
        console.log('current Quote id is : '+$scope.currentQuote.Quotation_id);
        if($scope.selectedSubSite==''){
            console.log('desc here is : '+$scope.paragraphDescription);
            $http.get('crud/client/Quote/saveQuoteParagraph/' + $scope.currentQuote.Quotation_id + '/' + $scope.selectedSite + '/null/' + $scope.paragraphDescription).success(function (data) {
                console.log('quote paragraph saved');
                console.dir(data);
                $scope.initFunction();
                $scope.divAddParagraph=false;
                $scope.divPanier=true;
            });
        }else {

            $http.get('crud/client/Quote/saveQuoteParagraph/' + $scope.currentQuote.Quotation_id + '/' + $scope.selectedSite + '/' + $scope.selectedSubSite + '/' + $scope.paragraphDescription).success(function (data) {
                $scope.divAddParagraph=false;
                $scope.divPanier=true;
                $scope.initFunction();
            });
        }

    }

    $scope.editQuoteParagraph = false;
    $scope.editQuoteDescription=function(actualPanier){
        console.log('checking in the edit quote desc ');
        console.dir(actualPanier.panier);
        $scope.selectedQPForUpdate=actualPanier.panier;
        $scope.editQuoteParagraph = !$scope.editQuoteParagraph;

    }

    $scope.updateQuoteDescription=function(selectedQPForUpdate){

        console.log('updated desc is : '+selectedQPForUpdate.Description);
        $http.post('crud/client/Quote/updateQuoteParaDescription/'+selectedQPForUpdate.QuotationParagraph_id+'/'+selectedQPForUpdate.Description).then(function(data){
            $scope.editQuoteParagraph = !$scope.editQuoteParagraph;
            $scope.initFunction();
        })
    }

    $scope.cancelQuoteDescription=function(){
        $scope.editQuoteParagraph = !$scope.editQuoteParagraph;
    }

    $scope.addCatalogue=function(actualPanier){
        console.log('inside add catalogue');
        console.dir(actualPanier);
        $scope.selectedQuoteParagraphId=actualPanier.panier.QuotationParagraph_id;
        $scope.divAddParagraph=false;
        $scope.divPanier=false;
        $scope.catalogueIncludeDiv=true;
        $scope.quoteCatalogueBodyURL='modules/client/catalogue/views/catalogue.html';
    }

    $rootScope.$on('reinitPanierAfterAddCatalogue', function(event){
        console.log('welcome back');
        $scope.quoteCatalogueBodyURL='';
        $scope.divAddParagraph=false;
        $scope.divPanier=true;
        $scope.catalogueIncludeDiv=false;
        $scope.recycleCatIncludeDiv=false;
        $scope.editCatIncludeDiv=false;
        $scope.initFunction();

    });

    $rootScope.$on('backToPanier', function(event){
        $scope.quoteCatalogueBodyURL='';
        $scope.quoteRecycleCatalogueBodyURL='';
        $scope.divAddParagraph=false;
        $scope.divPanier=true;
        $scope.catalogueIncludeDiv=false;
        $scope.recycleCatIncludeDiv=false;
        $scope.editCatIncludeDiv=false;
        $scope.initFunction();
    });

    $scope.ajouterRecycle=function(actualPanier){

        $scope.selectedQuoteParagraphId=actualPanier.panier.QuotationParagraph_id;
        $scope.divAddParagraph=false;
        $scope.divPanier=false;
        $scope.catalogueIncludeDiv=false;
        $scope.recycleCatIncludeDiv=true;
        $scope.quoteRecycleCatalogueBodyURL='modules/client/recyCatalogue/views/recyCatalogue.html';
    }

    $rootScope.$on('catalogueRecyItemsSelectedList', function(event) {

        console.log('welcome back');
        $scope.quoteRecycleCatalogueBodyURL='';
        $scope.divAddParagraph=false;
        $scope.divPanier=true;
        $scope.catalogueIncludeDiv=false;
        $scope.recycleCatIncludeDiv=false;
        $scope.editCatIncludeDiv=false;
        $scope.initFunction();

    });

    $scope.editQuoteCatalogue=function(catalogueSelectedItem){

        $scope.divAddParagraph=false;
        $scope.divPanier=false;
        $scope.catalogueIncludeDiv=false;
        $scope.recycleCatIncludeDiv=false;
        $scope.editCatIncludeDiv=true;
        $scope.selectedEditCatalogueItem =catalogueSelectedItem;
        /*$rootScope.$broadcast('initQPPD',$scope.selectedEditCatalogueItem);*/
        $scope.quoteEditCatalogueBodyURL='modules/client/updateCatalogue/views/updateCatalogue.html';

    }

    $rootScope.$on('catalogueUpdatedItemsSavedList', function(event){

        $scope.quoteEditCatalogueBodyURL='';
        console.log('welcome back');
        $scope.divAddParagraph=false;
        $scope.divPanier=true;
        $scope.catalogueIncludeDiv=false;
        $scope.recycleCatIncludeDiv=false;
        $scope.editCatIncludeDiv=false;
    });

    $scope.deleteQuoteCatalogue=function(catalogueSelectedItem){
        $http.get('crud/client/Quote/deleteQuoteParaProduct/'+catalogueSelectedItem.quoteParaProd.QuotationParagraphProduct_id+'/'+catalogueSelectedItem.quoteParaProd.QuotationParagraph_id+'/'+catalogueSelectedItem.item.usual_code).success(function(data){
            $scope.initFunction();
        });
    }

    $scope.deleteQuoteParagraph=function(actualPanier){
        console.log(actualPanier.panier.QuotationParagraph_id);
        $http.get('crud/client/Quote/deleteQuoteParagraph/'+actualPanier.panier.QuotationParagraph_id).success(function(data){
            $scope.initFunction();
        })
    }

    $scope.backToDevis=function(){
        $rootScope.$broadcast('backToDevis');
    }

}]);