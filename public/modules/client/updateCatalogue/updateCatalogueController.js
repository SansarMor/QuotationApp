'use strict';

angular.module('QuotationApp.masters').controller('clientQuoteEditCatalogueController',['$rootScope','rechercheClientService', '$scope', '$http', function($rootScope, rechercheClientService, $scope, $http) {

    /* -- fetch values from QuotationParagraphProductDetail by QuotationParagraphProduct_id ---*/

    $http.get('crud/client/Quote/Catalogue/QuoteParagraphProductDetail/fetchValuesFromQPPDByQuotePPId/'+$scope.selectedEditCatalogueItem.quoteParaProd.QuotationParagraphProduct_id).success(function(data){
        console.log('QPPD list is : ');
        console.dir(data);

        $scope.editItemsList=[];

        var detailListCount='';
        if(data.length!=0){
            detailListCount=$scope.selectedEditCatalogueItem.quoteParaProd.Quantity_Total - data.length;

            data.forEach(function(quotePPDItem, index){

                var editItem={
                    quotePPDId:quotePPDItem.QuotationParagraphProductDetail_id,
                    selectedQuoteParaProdId:$scope.selectedEditCatalogueItem.quoteParaProd.QuotationParagraphProduct_id,
                    building:quotePPDItem.Building,
                    floor:quotePPDItem.Floor,
                    location:quotePPDItem.Location,
                    install:quotePPDItem.Install,
                    recycle:quotePPDItem.Recycle,
                    isReplacement:quotePPDItem.Is_Replacement,
                    statusFlag:quotePPDItem.StatusFlag
                }
                $scope.editItemsList.push(editItem);
            });
        }
        else{
            detailListCount=$scope.selectedEditCatalogueItem.quoteParaProd.Quantity_Total;
        }

        for(var i=0;i< detailListCount;i++){

            var editItem={
                quotePPDId:'',
                selectedQuoteParaProdId:$scope.selectedEditCatalogueItem.quoteParaProd.QuotationParagraphProduct_id,
                building:'',
                floor:'',
                location:'',
                install:0,
                recycle:0,
                isReplacement:0,
                statusFlag:0
            }
            $scope.editItemsList.push(editItem);
        }
    });

    $scope.updateSelectedItems=function(editItemsList){

        console.log('updated QPPD list is : ');
        console.dir(editItemsList);
        editItemsList.forEach(function(editQPPDItem, index){

            if(editQPPDItem.install) editQPPDItem.install=1;
            else editQPPDItem.install=0;

            if(editQPPDItem.recycle) editQPPDItem.recycle=1;
            else editQPPDItem.recycle=0;

            if(editQPPDItem.isReplacement) editQPPDItem.isReplacement=1;
            else editQPPDItem.isReplacement=0;

            if(editQPPDItem.statusFlag) editQPPDItem.statusFlag=1;
            else editQPPDItem.statusFlag=0;

           if(editQPPDItem.quotePPDId == ''){

               $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', editQPPDItem).success(function(data){
                   console.log('saved QPPD item is : ');
                   console.dir(data);
               });
           } else{
               console.log('we want to update QPPD ');
               console.dir(editQPPDItem);
               $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/updateQuoteParagraphProductDetail/', editQPPDItem).then(function(){
                   console.log('updated QPPD item is : ');
               });
           }
        });

        $rootScope.$broadcast('catalogueUpdatedItemsSavedList', $scope.selectedEditCatalogueItem);
    }

}]);