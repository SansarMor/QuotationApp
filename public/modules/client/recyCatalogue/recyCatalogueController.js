'use strict';

angular.module('QuotationApp.masters').controller('clientQuoteRecyCatalogueController',['$rootScope','rechercheClientService', '$scope', '$http', function($rootScope, rechercheClientService, $scope, $http) {

    console.log('selected quotepara is : '+$scope.selectedQuoteParagraphId);

    $scope.clientDetails=rechercheClientService.getClientDetails();

    if($scope.clientDetails.type=='CC'){
        $scope.LANOValue=$scope.clientDetails.AN8;
    }
    else{
        $scope.LANOValue=$scope.selectedSite.AN8;
    }

    /*get recycle Items list from Customer_Installed_Base table*/
    $http.get('crud/client/Quote/recyCatalogue/items/'+$scope.LANOValue).success(function (data) {
        console.log('Recycle Items list : ');
        $scope.recyItemsList=data;
        $scope.actualRecyItemList=[];

        /*fetch all itemlist*/
        $http.get('crud/client/Quote/Catalogue/allItems/').success(function (data) {
            $scope.allItemsList=data;
            $scope.recyItemsList.forEach(function(recyItem, index){
                $scope.actualRecyItem={
                    recyItem: recyItem,
                    usual_Code:'',
                    description_1:''
                }
                $scope.allItemsList.forEach(function(item, index){

                    if(recyItem.ITM == item.ITM){

                        $scope.actualRecyItem.usual_Code=item.usual_code;
                        $scope.actualRecyItem.description_1=item.description_1;
                    }
                });
                $scope.actualRecyItemList.push($scope.actualRecyItem);
            });
            console.dir($scope.actualRecyItemList);
        });

    });

    $scope.recyItemModelCheckbox=false;
    $scope.selectedRecyItemsList=[];
    $scope.recyItemSelected=function(actualRecyItem, recyItemModelCheckbox){

        if(recyItemModelCheckbox){

            $scope.selectedRecyItemsList.splice($scope.selectedRecyItemsList.indexOf(actualRecyItem), 1);
        }
        else{
            $scope.selectedRecyItemsList.push(actualRecyItem);
        }
        console.dir($scope.selectedRecyItemsList);
    }

    $scope.saveRecySelectedItems=function(){

        $scope.itemListForQPP=[];

        console.log($scope.selectedRecyItemsList);

        var indexNo=0;
        _.each($scope.selectedRecyItemsList, function(selectedRecyItem) {
        /*$scope.selectedRecyItemsList.forEach(function(selectedRecyItem, index){*/

            var quotePP={
                selectedQuoteParagraphId:$scope.selectedQuoteParagraphId,
                itemId:'',
                quantityT:'',
                quantityA:0,
                quantityR:'',
                statusFlag:1
            }

            console.log('itemListForQPP is : '+$scope.itemListForQPP.length);

            var quotePPD={
                selectedQuoteParaProdId:'',
                building:selectedRecyItem.recyItem.Y56INDLA,
                floor:selectedRecyItem.recyItem.Y56ETAG,
                location:selectedRecyItem.recyItem.Y56EMPLA,
                install:1,
                recycle:1,
                isReplacement:0,
                statusFlag:0
            }

            if($scope.itemListForQPP.length==0){
                $scope.allItemsList.forEach(function(item,index){
                   if(item.ITM == selectedRecyItem.recyItem.ITM){
                       quotePP.itemId=item.id;
                       quotePP.quantityT=1;
                       quotePP.quantityR=1;
                       $scope.itemListForQPP.push(quotePP);

                       $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/',quotePP).success(function (data) {
                                console.log('well done , initial data saved is : '+data[0]);

                           quotePPD.selectedQuoteParaProdId=data[0].QuotationParagraphProduct_id;

                           $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function(data){

                               $http.get('crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/'+selectedRecyItem.usual_Code).success(function(data){

                                   quotePP.itemId=data[0].id;
                                   quotePP.statusFlag=0;

                                   $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+$scope.selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(QPPdata) {

                                       if(QPPdata.length == 0) {

                                           $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePP).success(function (data) {
                                               console.log('well done recycle item saved in QPP');
                                               if (indexNo + 1 == $scope.selectedRecyItemsList.length) {
                                                   $rootScope.$broadcast('catalogueRecyItemsSelectedList', $scope.selectedRecyItemsList);
                                               }else{
                                                   ++indexNo;
                                               }
                                           });
                                       }else{

                                           quotePP.quantityT=parseInt(quotePP.quantityT)+parseInt(QPPdata[0].Quantity_Total);
                                           quotePP.quantityA=parseInt(quotePP.quantityA)+parseInt(QPPdata[0].Quantity_Additional);
                                           quotePP.quantityR=parseInt(quotePP.quantityR)+parseInt(QPPdata[0].Quantity_Replaced);

                                           $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP).success(function (data) {
                                               console.log('well done recycle item updated in QPP');
                                               if (indexNo + 1 == $scope.selectedRecyItemsList.length) {
                                                   $rootScope.$broadcast('catalogueRecyItemsSelectedList', $scope.selectedRecyItemsList);
                                               }else{
                                                   ++indexNo;
                                               }
                                           });
                                       }

                                   });

                               });
                               /*$http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedRecyItem.usual_code).success(function (installItemdata) {

                                   quotePP.itemId=installItemdata[0].id;
                                   quotePP.statusFlag=0;
                                   $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+$scope.selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(instItemQPPdataInRec){

                                       if(instItemQPPdataInRec.length == 0){

                                           $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePP).success(function (data) {
                                               console.log('well done install item saved in QPP');
                                               $scope.modalShown = !$scope.modalShown;
                                               $rootScope.$broadcast('reinitPanierAfterAddCatalogue');
                                           });
                                       }else{

                                           quotePP.quantityT=parseInt(quotePP.quantityT)+parseInt(instItemQPPdataInRec[0].Quantity_Total);
                                           quotePP.quantityA=parseInt(quotePP.quantityA)+parseInt(instItemQPPdataInRec[0].Quantity_Additional);
                                           quotePP.quantityR=parseInt(quotePP.quantityR)+parseInt(instItemQPPdataInRec[0].Quantity_Replaced);

                                           $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP).success(function (data) {
                                               console.log('well done install item updated in QPP');
                                               if (indexNo + 1 == $scope.selectedRecyItemsList.length) {
                                                   $rootScope.$broadcast('catalogueRecyItemsSelectedList', $scope.selectedRecyItemsList);
                                               }else{
                                                   ++indexNo;
                                               }
                                           });
                                       }
                                   });
                               });*/

                           });

                       });
                   }
                });
            }
            else{

                $scope.allItemsList.forEach(function(item,index) {
                    if (item.ITM == selectedRecyItem.recyItem.ITM) {
                        var exists = _.where($scope.itemListForQPP, {itemId: item.id});
                        console.log('checking exits ? : '+exists);
                        if(exists.length>0){

                            $scope.itemListForQPP.forEach(function(itemForQPP, index){
                                if(itemForQPP.itemId==item.id){
                                    $scope.itemListForQPP[index].quantityT += 1;
                                    $scope.itemListForQPP[index].quantityR +=1;
                                    console.log('need to update this QPP ');
                                    console.dir($scope.itemListForQPP[index]);
                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/',$scope.itemListForQPP[index]).success(function(data){
                                        console.log('well done QPP updated here');

                                        quotePPD.selectedQuoteParaProdId=data[0].QuotationParagraphProduct_id;

                                        $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function(data){

                                            console.log('value saved in QuoteParagraphProductDetail');

                                            $http.get('crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/'+selectedRecyItem.usual_Code).success(function(data){
                                                quotePP.itemId=data[0].id;
                                                quotePP.statusFlag=0;
                                                quotePP.quantityT=$scope.itemListForQPP[index].quantityT;
                                                quotePP.quantityR=$scope.itemListForQPP[index].quantityR;

                                                $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+$scope.selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(QPPdata1) {

                                                    $rootScope.$broadcast('catalogueRecyItemsSelectedList', $scope.selectedRecyItemsList);
                                                    quotePP.quantityT=parseInt(quotePP.quantityT)+parseInt(QPPdata1[0].Quantity_Total);
                                                    quotePP.quantityA=parseInt(quotePP.quantityA)+parseInt(QPPdata1[0].Quantity_Additional);
                                                    quotePP.quantityR=parseInt(quotePP.quantityR)+parseInt(QPPdata1[0].Quantity_Replaced);

                                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP).success(function (data) {
                                                        console.log('well done recycle item updated in QPP');
                                                        if (indexNo + 1 == $scope.selectedRecyItemsList.length) {
                                                            $rootScope.$broadcast('catalogueRecyItemsSelectedList', $scope.selectedRecyItemsList);
                                                        }
                                                        else{
                                                            ++indexNo;
                                                        }
                                                    });

                                                });
                                            });

                                        });

                                    });
                                }
                            });
                        }
                        else{
                            quotePP.itemId=item.id;
                            quotePP.quantityT=1;
                            quotePP.quantityR=1;
                            $scope.itemListForQPP.push(quotePP);

                            $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/',quotePP).success(function (data) {
                                console.log('well done , data saved is : '+data[0]);

                                quotePPD.selectedQuoteParaProdId=data[0].QuotationParagraphProduct_id;

                                $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function(data){

                                    $http.get('crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/'+selectedRecyItem.usual_Code).success(function(data){

                                        quotePP.itemId=data[0].id;
                                        quotePP.statusFlag=0;

                                        $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+$scope.selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(QPPdata2) {
                                                quotePP.quantityT=parseInt(quotePP.quantityT)+parseInt(QPPdata2[0].Quantity_Total);
                                                quotePP.quantityA=parseInt(quotePP.quantityA)+parseInt(QPPdata2[0].Quantity_Additional);
                                                quotePP.quantityR=parseInt(quotePP.quantityR)+parseInt(QPPdata2[0].Quantity_Replaced);

                                                $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP).success(function (data) {
                                                    console.log('well done recycle item updated in QPP');
                                                    if (indexNo + 1 == $scope.selectedRecyItemsList.length) {
                                                        $rootScope.$broadcast('catalogueRecyItemsSelectedList', $scope.selectedRecyItemsList);
                                                    }
                                                    else{
                                                        ++indexNo;
                                                    }
                                                });

                                        });

                                    });

                                });

                            });
                        }
                    }
                });
            }

        });

    }

}]);