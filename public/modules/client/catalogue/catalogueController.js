'use strict';

angular.module('QuotationApp.masters').controller('clientQuoteCatalogueController',['$rootScope','$scope', '$http', function($rootScope, $scope, $http){

    $scope.showMainItemTagDiv=false;
    $scope.actualItemsList=[];
    $scope.filteredItemList=[];
    $scope.componentsItemList=[];

    console.dir('selected quote Paragraph id is : ' + $scope.selectedQuoteParagraphId);

//    fetch categories
    $http.get('crud/client/Quote/Catalogue/Category/'+$scope.selectedDevisType).success(function (data) {
        console.log('category list : ');
        console.dir(data);
        $scope.categoriesList=data;
    });

//    fetch famillies
    $http.get('crud/client/Quote/Catalogue/family/'+$scope.selectedDevisType).success(function (data) {
        console.log('family list : ');
        console.dir(data);
        $scope.familliesList=data;
    });

//    fetch subFamillies
    $http.get('crud/client/Quote/Catalogue/subFamily/'+$scope.selectedDevisType).success(function (data) {
        console.log('sub-family list : ');
        console.dir(data);
        $scope.subFamilliesList=data;
    });

    /*fetch all itemlist*/
    $http.get('crud/client/Quote/Catalogue/items/').success(function (data) {
        console.log('item list : ');
        console.dir(data);
        $scope.allItemsList=data;
    });

    $scope.fetchItemsByCateogy=function(category){
        $scope.filteredItemList=[];
        $scope.allItemsList.forEach(function(item, index){
           if(item.SRP0 == category.KY){
               $scope.filteredItemList.push(item);
           }
        });
        $("#categoryId").text(category.DL01);
        $("#familyId").text('Selection famille');
        $("#subFamilyId").text('Selection sous-famille');
        $scope.actualItemsList=$scope.filteredItemList;
    }

    $scope.fetchItemsByFamily=function(family){

        console.log('selected family KY is : '+family.KY);
        $("#familyId").text(family.DL01);
        $("#subFamilyId").text('Selection sous-famille');
        $scope.familyKY=family.KY;

        $http.get('crud/client/Quote/Catalogue/Items/byFamily/'+$scope.familyKY).success(function(data){
            console.log('selected category is : ');
            console.dir(data[0]);


            $scope.categoriesList.forEach(function(category, index){
               if(category.KY == data[0].family){
                   $("#categoryId").text(category.DL01);
               }
            });

            console.log('selected category is : '+ data[0].family);
            console.log('selected family is : '+ family.KY);

            $scope.filteredItemList=[];
            $scope.allItemsList.forEach(function(item, index){
                if(item.SRP0 == data[0].family && item.SRP1 == family.KY){
                    $scope.filteredItemList.push(item);
                }

            });

            $scope.actualItemsList=$scope.filteredItemList;

        });


    }

    $scope.fetchItemsBySubFamily=function(subFamily){

        console.log(subFamily.KY);
        $("#subFamilyId").text(subFamily.DL01);

        $http.get('crud/client/Quote/Catalogue/Items/Family/bySubFamily/'+subFamily.KY).success(function(data){
            console.log('selected family is : ');
            console.dir(data[0]);
            $scope.selectedFamily=data[0];

            $http.get('crud/client/Quote/Catalogue/Items/byFamily/'+$scope.selectedFamily.family).success(function(data){
                console.log('selected category is : ');
                console.dir(data[0]);
                $scope.selectedCategory=data[0];

                $scope.familliesList.forEach(function(family, index){
                    if(family.KY == $scope.selectedFamily.family){
                        $("#familyId").text(family.DL01);
                    }
                });

                $scope.categoriesList.forEach(function(category, index){
                    if(category.KY == $scope.selectedCategory.family){
                        $("#categoryId").text(category.DL01);
                    }
                });

                console.log('selected category is : '+ $scope.selectedCategory.family);
                console.log('selected family is : '+ $scope.selectedFamily.family);
                console.log('selected sub_family is : '+ subFamily.KY);

                $scope.filteredItemList=[];
                $scope.allItemsList.forEach(function(item, index){
                    if(item.SRP0 == $scope.selectedCategory.family && item.SRP1 == $scope.selectedFamily.family && item.SRP2 == subFamily.KY){
                        $scope.filteredItemList.push(item);
                    }

                });
                $scope.actualItemsList=$scope.filteredItemList;

            });
        });

    }

    $scope.fetchComponentItems=function(item){

        $http.get('crud/client/Quote/Catalogue/Items/componentItems/'+item.usual_code).success(function(data){
            console.log('fetched component item is: ');
            console.dir(data);
            $("#codeArtId").val(item.usual_code);
            $scope.showMainItemTagDiv=true;
            $scope.componentsItemList=data;
            $scope.actualItemsList=$scope.componentsItemList;
        });
    }

    $scope.showAllFilterdItems=function(){
        $scope.showMainItemTagDiv=false;
        $scope.actualItemsList=$scope.filteredItemList;
    }

    $scope.modalShown = false;

    $scope.addItemToCart=function(item){
        $scope.selectedItem=item;
        $scope.catalogueQuant='';
        $scope.modalShown = !$scope.modalShown;
    }

    $scope.cancelCatalogueQuant=function(){
        $scope.modalShown = !$scope.modalShown;
    }

    $scope.registerCatalogueQuant=function(selectedItem, quantity){

        var quotePP={
            selectedQuoteParagraphId:$scope.selectedQuoteParagraphId,
            itemId:selectedItem.id,
            quantityT: quantity,
            quantityA: quantity,
            quantityR: 0,
            statusFlag:1
        }

        /*------ get QuotationParagraphProduct by item-id and QuotationParagraph-id---- */
        $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+$scope.selectedQuoteParagraphId+'/'+selectedItem.id).success(function(data){
            console.log('fetched QPP Data is : ');
            console.dir(data);

            if(data.length == 0) {// add new quoteParagraphProduct

                $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePP).success(function (data) {

                    for (var i = 0; i < data[0].Quantity_Total; i++) {
                        var quotePPD = {
                            selectedQuoteParaProdId: data[0].QuotationParagraphProduct_id,
                            building: '',
                            floor: '',
                            location: '',
                            install: 1,
                            recycle: 0,
                            isReplacement: 0,
                            statusFlag: 0
                        }

                        $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function (data) {
                            console.log('QPPD also saved');
                        });

                    }

                    $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedItem.usual_code).success(function (data) {

                        quotePP.itemId = data[0].id;
                        quotePP.statusFlag = 0;

                        $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+$scope.selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(QPPdata){

                            if(QPPdata.length == 0){

                                $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePP).success(function (data) {
                                    console.log('well done install item saved in QPP');
                                    $scope.modalShown = !$scope.modalShown;
                                    $rootScope.$broadcast('reinitPanierAfterAddCatalogue');
                                });
                            }else{

                                quotePP.quantityT=parseInt(quotePP.quantityT)+parseInt(QPPdata[0].Quantity_Total);
                                quotePP.quantityA=parseInt(quotePP.quantityA)+parseInt(QPPdata[0].Quantity_Additional);
                                quotePP.quantityR=parseInt(quotePP.quantityR)+parseInt(QPPdata[0].Quantity_Replaced);

                                $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP).success(function (data) {
                                    console.log('well done install item updated in QPP');
                                    $scope.modalShown = !$scope.modalShown;
                                    $rootScope.$broadcast('reinitPanierAfterAddCatalogue');
                                });
                            }
                        })

                    });

                });
            }
            else{ // update existing quoteParagraphProduct

                quotePP.quantityT=parseInt(quotePP.quantityT)+parseInt(data[0].Quantity_Total);
                quotePP.quantityA=parseInt(quotePP.quantityA)+parseInt(data[0].Quantity_Additional);
                quotePP.quantityR=parseInt(quotePP.quantityR)+parseInt(data[0].Quantity_Replaced);

                $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP).success(function(data){

                    for (var i = 0; i < quantity; i++) {
                        var quotePPD = {
                            selectedQuoteParaProdId: data[0].QuotationParagraphProduct_id,
                            building: '',
                            floor: '',
                            location: '',
                            install: 1,
                            recycle: 0,
                            isReplacement: 0,
                            statusFlag: 0
                        }

                        $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function (data) {
                            console.log('QPPD also saved');
                        });

                    }

                    $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedItem.usual_code).success(function (data) {

                        quotePP.itemId = data[0].id;
                        quotePP.statusFlag = 0;

                        $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP).success(function (data) {
                            console.log('well done install item updated in QPP');
                            $scope.modalShown = !$scope.modalShown;
                            $rootScope.$broadcast('reinitPanierAfterAddCatalogue');
                        });
                    });

                });
            }

        });
    }

}]);
