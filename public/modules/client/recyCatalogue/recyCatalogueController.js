'use strict';

angular.module('QuotationApp.masters').controller('clientQuoteRecyCatalogueController',['$rootScope','rechercheClientService', '$scope', '$http', function($rootScope, rechercheClientService, $scope, $http) {

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

        $rootScope.$broadcast('catalogueRecyItemsSelectedList', $scope.selectedRecyItemsList);
    }

}]);