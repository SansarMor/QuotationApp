'use strict';

angular.module('QuotationApp.masters').factory('clientQuoteRecyCatalogueService', function($http, $rootScope) {

    var clientQuoteRecyCatalogueService= {
        saveRecySelectedItems:function(selectedRecyItemsList, selectedQuoteParagraphId, allItemsList){
        var checkingVariable='';
        var i=0;
        var itemListForQPP=[];
        var length=selectedRecyItemsList.length;
        saveRecyCatLoop(i, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
        return checkingVariable;
        }
    }
    function saveRecyCatLoop(i, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP){
        var indexNo=i;
        if (i < length) {

            var selectedRecyItem=selectedRecyItemsList[i];
            var quotePP={
                selectedQuoteParagraphId:selectedQuoteParagraphId,
                itemId:'',
                quantityT:'',
                quantityA:0,
                quantityR:'',
                statusFlag:1
            }

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
            if(itemListForQPP.length==0){
                allItemsList.forEach(function(item,index){
                    if(item.ITM == selectedRecyItem.recyItem.ITM){
                        quotePP.itemId=item.id;
                        quotePP.quantityT=1;
                        quotePP.quantityR=1;
                        itemListForQPP.push(quotePP);

                        $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/',quotePP).success(function (data) {
                            console.log('well done , initial data saved is : '+data[0]);

                            quotePPD.selectedQuoteParaProdId=data[0].QuotationParagraphProduct_id;

                            $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function(data){

                                $http.get('crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/'+selectedRecyItem.usual_Code).success(function(data){

                                    quotePP.itemId=data[0].id;
                                    quotePP.statusFlag=0;

                                    $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(QPPdata) {

                                        if(QPPdata.length == 0) {

                                            $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePP).success(function (data) {

                                                console.log('well done recycle item saved in QPP');

                                                $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedRecyItem.usual_Code).success(function (installItemdata1) {

                                                    quotePP.itemId=installItemdata1[0].id;
                                                    quotePP.statusFlag=0;
                                                    $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(instItemQPPdataInRec){

                                                        if(instItemQPPdataInRec.length == 0){

                                                            $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePP).success(function (data) {
                                                                console.log('well done install item saved in QPP');
                                                                if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                    checkingVariable='done';
                                                                    $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                }else{
                                                                    ++indexNo;
                                                                    saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                }
                                                            });
                                                        }
                                                        else{
                                                            var quotePP1= angular.copy(quotePP);
                                                            quotePP1.quantityT=parseInt(quotePP1.quantityT)+parseInt(instItemQPPdataInRec[0].Quantity_Total);
                                                            quotePP1.quantityA=parseInt(quotePP1.quantityA)+parseInt(instItemQPPdataInRec[0].Quantity_Additional);
                                                            quotePP1.quantityR=parseInt(quotePP1.quantityR)+parseInt(instItemQPPdataInRec[0].Quantity_Replaced);

                                                            $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP1).success(function (data) {
                                                                console.log('well done install item updated in QPP');
                                                                if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                    checkingVariable='done';
                                                                    $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                }else{
                                                                    ++indexNo;
                                                                    saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                }
                                                            });
                                                        }
                                                    });
                                                });

                                            });
                                        }else{
                                            var quotePP1= angular.copy(quotePP);
                                            quotePP1.quantityT=parseInt(quotePP1.quantityT)+parseInt(QPPdata[0].Quantity_Total);
                                            quotePP1.quantityA=parseInt(quotePP1.quantityA)+parseInt(QPPdata[0].Quantity_Additional);
                                            quotePP1.quantityR=parseInt(quotePP1.quantityR)+parseInt(QPPdata[0].Quantity_Replaced);

                                            $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP1).success(function (data) {
                                                console.log('well done recycle item updated in QPP');

                                                $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedRecyItem.usual_Code).success(function (installItemdata2) {

                                                    quotePP.itemId=installItemdata2[0].id;
                                                    quotePP.statusFlag=0;
                                                    $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(instItemQPPdataInRec){

                                                        if(instItemQPPdataInRec.length == 0){

                                                            $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePP).success(function (data) {
                                                                console.log('well done install item saved in QPP');
                                                                if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                    checkingVariable='done';
                                                                    $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                }else{
                                                                    ++indexNo;
                                                                    saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                }
                                                            });
                                                        }
                                                        else{
                                                            var quotePP1= angular.copy(quotePP);
                                                            quotePP1.quantityT=parseInt(quotePP1.quantityT)+parseInt(instItemQPPdataInRec[0].Quantity_Total);
                                                            quotePP1.quantityA=parseInt(quotePP1.quantityA)+parseInt(instItemQPPdataInRec[0].Quantity_Additional);
                                                            quotePP1.quantityR=parseInt(quotePP1.quantityR)+parseInt(instItemQPPdataInRec[0].Quantity_Replaced);

                                                            $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP1).success(function (data) {
                                                                console.log('well done install item updated in QPP');
                                                                if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                    checkingVariable='done';
                                                                    $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                }else{
                                                                    ++indexNo;
                                                                    saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                }
                                                            });
                                                        }
                                                    });
                                                });
                                            });
                                        }

                                    });

                                });

                            });

                        });
                    }
                });
            }
            else{

                allItemsList.forEach(function(item,index) {
                    if (item.ITM == selectedRecyItem.recyItem.ITM) {
                        var exists = _.where(itemListForQPP, {itemId: item.id});
                        console.log('checking exits ? : '+exists);
                        if(exists.length>0){

                            itemListForQPP.forEach(function(itemForQPP, index){
                                if(itemForQPP.itemId==item.id){
                                    itemListForQPP[index].quantityT += 1;
                                    itemListForQPP[index].quantityR +=1;
                                    console.log('need to update this QPP ');
                                    console.dir(itemListForQPP[index]);
                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/',itemListForQPP[index]).success(function(data){
                                        console.log('well done QPP updated here');

                                        quotePPD.selectedQuoteParaProdId=data[0].QuotationParagraphProduct_id;

                                        $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function(data){

                                            console.log('value saved in QuoteParagraphProductDetail');

                                            $http.get('crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/'+selectedRecyItem.usual_Code).success(function(data){
                                                quotePP.itemId=data[0].id;
                                                quotePP.statusFlag=0;
                                                /*quotePP.quantityT=itemListForQPP[index].quantityT;
                                                quotePP.quantityR=itemListForQPP[index].quantityR;*/

                                                $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(QPPdata1) {

                                                    var quotePP1= angular.copy(quotePP);
                                                    quotePP1.quantityT=parseInt(quotePP1.quantityT)+parseInt(QPPdata1[0].Quantity_Total);
                                                    quotePP1.quantityA=parseInt(quotePP1.quantityA)+parseInt(QPPdata1[0].Quantity_Additional);
                                                    quotePP1.quantityR=parseInt(quotePP1.quantityR)+parseInt(QPPdata1[0].Quantity_Replaced);

                                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP1).success(function (data) {
                                                        console.log('well done recycle item updated in QPP');

                                                        $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedRecyItem.usual_Code).success(function (installItemdata3) {

                                                            quotePP.itemId=installItemdata3[0].id;
                                                            quotePP.statusFlag=0;
                                                            $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(instItemQPPdataInRec){

                                                                if(instItemQPPdataInRec.length == 0){

                                                                    $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePP).success(function (data) {
                                                                        console.log('well done install item saved in QPP');
                                                                        if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                            checkingVariable='done';
                                                                            $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                        }else{
                                                                            ++indexNo;
                                                                            saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                        }

                                                                    });
                                                                }
                                                                else{
                                                                    var quotePP1= angular.copy(quotePP);
                                                                    quotePP1.quantityT=parseInt(quotePP1.quantityT)+parseInt(instItemQPPdataInRec[0].Quantity_Total);
                                                                    quotePP1.quantityA=parseInt(quotePP1.quantityA)+parseInt(instItemQPPdataInRec[0].Quantity_Additional);
                                                                    quotePP1.quantityR=parseInt(quotePP1.quantityR)+parseInt(instItemQPPdataInRec[0].Quantity_Replaced);

                                                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP1).success(function (data) {
                                                                        console.log('well done install item updated in QPP');
                                                                        if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                            checkingVariable='done';
                                                                            $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                        }else{
                                                                            ++indexNo;
                                                                            saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        });
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
                            itemListForQPP.push(quotePP);

                            $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/',quotePP).success(function (data) {
                                console.log('well done , data saved is : '+data[0]);

                                quotePPD.selectedQuoteParaProdId=data[0].QuotationParagraphProduct_id;

                                $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function(data){

                                    $http.get('crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/'+selectedRecyItem.usual_Code).success(function(data){

                                        quotePP.itemId=data[0].id;
                                        quotePP.statusFlag=0;

                                        $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(QPPdata2) {
                                            var quotePP1= angular.copy(quotePP);
                                            quotePP1.quantityT=parseInt(quotePP1.quantityT)+parseInt(QPPdata2[0].Quantity_Total);
                                            quotePP1.quantityA=parseInt(quotePP1.quantityA)+parseInt(QPPdata2[0].Quantity_Additional);
                                            quotePP1.quantityR=parseInt(quotePP1.quantityR)+parseInt(QPPdata2[0].Quantity_Replaced);

                                            $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP1).success(function (data) {
                                                console.log('well done recycle item updated in QPP');

                                                $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedRecyItem.usual_Code).success(function (installItemdata4) {

                                                    quotePP.itemId=installItemdata4[0].id;
                                                    quotePP.statusFlag=0;
                                                    $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(instItemQPPdataInRec){

                                                        if(instItemQPPdataInRec.length == 0){

                                                            $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePP).success(function (data) {
                                                                console.log('well done install item saved in QPP');
                                                                if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                    checkingVariable='done';
                                                                    $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                }else{
                                                                    ++indexNo;
                                                                    saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                }
                                                            });
                                                        }
                                                        else{
                                                            var quotePP1= angular.copy(quotePP);
                                                            quotePP1.quantityT=parseInt(quotePP1.quantityT)+parseInt(instItemQPPdataInRec[0].Quantity_Total);
                                                            quotePP1.quantityA=parseInt(quotePP1.quantityA)+parseInt(instItemQPPdataInRec[0].Quantity_Additional);
                                                            quotePP1.quantityR=parseInt(quotePP1.quantityR)+parseInt(instItemQPPdataInRec[0].Quantity_Replaced);

                                                            $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP1).success(function (data) {
                                                                console.log('well done install item updated in QPP');
                                                                if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                    checkingVariable='done';
                                                                    $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                }else{
                                                                    ++indexNo;
                                                                    saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                }
                                                            });
                                                        }
                                                    });
                                                });
                                            });

                                        });

                                    });



                                });

                            });
                        }
                    }
                });
            }

        }

    }
    return clientQuoteRecyCatalogueService;
});