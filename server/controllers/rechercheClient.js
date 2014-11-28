'use strict';

/**
 * Module dependencies.
 */
var mssql=require('./mssql');

exports.createDatabaseConnection=function(req, res){
    new mssql.getSqlConnection(function(data){

        res.jsonp(data);
    });
}

exports.all = function(req, res) {

    var sqlQuery='SELECT * from customer';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });

};

exports.getAllClientQuotes=function(req, res){

    var sqlQuery='select * from Quotation where Customer_id='+req.params.clientId;
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });

}

/*Load client all sites*/
exports.clientSites= function(req, res){

    var sqlQuery='select * from site where Customer_Id='+req.params.clientId;
    new mssql.SqlConnection(sqlQuery, function(data){
       res.jsonp(data);
    });
};

exports.clientSubSites=function(req, res){
    var sqlQuery='select * from sub_site';

    new mssql.SqlConnection(sqlQuery, function(data){
        res.jsonp(data);
    });
}

/*Load client all contacts*/
exports.clientContacts= function(req, res){
    var sqlQuery='select * from contact';

    new mssql.SqlConnection(sqlQuery, function(data){
        var sqlQuery1='select * from media where ';
        res.jsonp(data);
    });
};

exports.saveSubSite=function(req, res){

    console.log('site id is : '+req.body.Site_Id);
    console.log('sub site name is : '+req.body.MLNM);

    var mlnmValue=req.body.MLNM;

    var sqlQuery='INSERT INTO sub_site (Site_Id, MLNM) VALUES ('+req.body.Site_Id+' , 12345)';

    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('inside sub site query success function : ');
        res.jsonp();
    });
};

/*Load client all chapters*/
exports.clientChapter= function(req, res){
    var sqlQuery='select distinct name from Chapter';

    new mssql.SqlConnection(sqlQuery, function(data){
        res.jsonp(data);
    });
};

/*save quote*/
exports.saveQuote=function(req, res){

    var currentDate=new Date();
    var sqlQuery="insert into Quotation (Customer_id, Type, Status, Employee_id, Flow, Date_Created) VALUES ("+ req.params.custmerId+", 1, 1, 1, 1,'"+currentDate+"')";
    new mssql.SqlConnection(sqlQuery, function(data){
        var sqlQuery1='select TOP 1 * from Quotation ORDER BY Quotation_id DESC';
        new mssql.SqlConnection(sqlQuery1, function(data){
            console.log('fetched data is : '+data);
            res.jsonp(data);
        });
    });
};

exports.saveQuoteParagraph=function(req, res){


    console.log('sub site in server side is : '+ req.params.selectedSubSite);
    var sqlQuery="";
    if(req.params.selectedSubSite == 'null'){

        sqlQuery="insert into QuotationParagraph (Quotation_id, Site_id, Description) VALUES ("+ req.params.selectedQuote+","+req.params.selectedSite+",'"+req.params.paragraphDes+"')";

    }else{

        sqlQuery="insert into QuotationParagraph (Quotation_id, Site_id, SubSite_id, Description) VALUES ("+ req.params.selectedQuote+","+req.params.selectedSite+","+req.params.selectedSubSite+",'"+req.params.paragraphDes+"')";
    }
    new mssql.SqlConnection(sqlQuery, function(data){

        var sqlQuery1='select TOP 1 * from QuotationParagraph ORDER BY QuotationParagraph_id DESC';
        new mssql.SqlConnection(sqlQuery1, function(data){
            console.log('fetched data is : '+data);
            res.jsonp(data);
        });
    });
}

exports.updateQuoteParaDescription=function(req, res){

    console.log("update QuotationParagraph SET Description='"+req.params.quoteParaDesc+"' where QuotationParagraph_id="+req.params.quoteParaId+"");
    var sqlQuery="update QuotationParagraph SET Description='"+req.params.quoteParaDesc+"' where QuotationParagraph_id="+req.params.quoteParaId+"";
    new mssql.SqlConnection(sqlQuery, function(data){
      res.send('quote para desc updated');
    })
}

exports.fetchPanier=function(req, res){
    var sqlQuery='select * from QuotationParagraph where Quotation_id='+req.params.selectedQuote;
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('fetched data is : '+data);
        res.jsonp(data);
    });
}

exports.deleteQuoteParagraph=function(req, res){

    var sqlQuery="delete from QuotationParagraph where QuotationParagraph_id=" + req.params.selectedQuotePara;
    new mssql.SqlConnection(sqlQuery, function(data) {

        var sqlQuery1 = "select * from QuotationParagraphProduct where QuotationParagraph_id=" + req.params.selectedQuotePara;
        new mssql.SqlConnection(sqlQuery1, function (quotePPDataList) {
            var i=0;
            quotePPDataList.forEach(function (quotePPData, index) {

                var sqlQuery2 = "delete from QuotationParagraphProductDetail where QuotationParagraphProduct_id=" + quotePPData.QuotationParagraphProduct_id;
                new mssql.SqlConnection(sqlQuery2, function (data) {
                    var sqlQuery3 = "delete from QuotationParagraphProduct where QuotationParagraphProduct_id=" + quotePPData.QuotationParagraphProduct_id;
                    new mssql.SqlConnection(sqlQuery3, function (data) {
                        if(i+1==quotePPDataList.length) {
                            res.send('Data deleted successfully');
                        }else{
                            i++;
                        }
                    })
                });

            });
        });

    });
}

exports.getCategories=function(req, res){
    var activeChapter=req.params.selectedDevisType;
    var sqlQuery="select * from UDC where SY='41' and RT='10' and KY in (select distinct family from Item_Family_Hierarchy where sub_family in (select activity from Chapter where name ='"+activeChapter+"') and family_level= 'SRP0')";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('fetched data for category is : '+data);
        res.jsonp(data);
    });
}

exports.getFamilies=function(req, res){
    var activeChapter=req.params.selectedDevisType;
    var sqlQuery="select * from UDC where SY='41' and RT='S1' and KY in (select activity from Chapter where name='"+activeChapter+"')";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('fetched data for family is : '+data);
        res.jsonp(data);
    });
}

exports.getSubFamilies=function(req, res){
    var activeChapter=req.params.selectedDevisType;
    var sqlQuery="select * from UDC where SY='41' and RT='S2' and KY in (select sub_family from Item_Family_Hierarchy where family in (select activity from Chapter where name='"+activeChapter+"') and family_level='SRP1')";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('fetched data for sub family is : '+data);
        res.jsonp(data);
    });
}

exports.getItemList=function(req, res){
    var sqlQuery="select * from ITEM where PRP0='P' ";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('Items list : '+data);
        res.jsonp(data);
    });
}

exports.getAllItemsList=function(req, res){
    var sqlQuery="select * from ITEM";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('all Items list : '+data);
        res.jsonp(data);
    });
}

exports.getCategoryByFamily=function(req, res){

    var sqlQuery="select * from Item_Family_Hierarchy where sub_family = '" + req.params.familyKY + "'  and family_level = 'SRP0'";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('selected category is : '+data);
        res.jsonp(data);
    });
}

exports.getFamilyBySubFamily=function(req, res){

    var sqlQuery="select * from Item_Family_Hierarchy where sub_family = '" + req.params.subFamilyXY + "'  and family_level = 'SRP1'";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('selected family is : '+data);
        res.jsonp(data);
    });
}

exports.getComponentItems=function(req, res){

    var sqlQuery="select * FROM ITEM where ITM in (select component_ITM from Item_Composition where compound_ITM = (select ITM from Item where usual_code = '"+req.params.item_usual_code+"') and option_type in(0,1)) and PRP0 = 'P'";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('fetched component item is : '+data);
        res.jsonp(data);
    });
}

/*fetch installed item*/
exports.fetchInstalledComponentItem=function(req, res){

    var sqlQuery="select * FROM ITEM where ITM in (select component_ITM from Item_Composition where compound_ITM = (select ITM from Item where usual_code = '"+req.params.item_usual_code+"') and option_type='2')";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('fetched install item is : '+data);
        res.jsonp(data);
    });
}

/*fetch recycle item*/
exports.fetchRecycleComponentItem=function(req, res){

    var sqlQuery="select * FROM ITEM where ITM in (select component_ITM from Item_Composition where compound_ITM = (select ITM from Item where usual_code = '"+req.params.item_usual_code+"') and option_type='3')";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('fetched install item is : '+data);
        res.jsonp(data);
    });
}

exports.fetchRecycleItemsList=function(req, res){

    var sqlQuery="select * FROM Customer_Installed_Base where LANO='"+req.params.LANOValue+"' ";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('fetched recycle items are : '+data);
        res.jsonp(data);
    });
}

/*------ get QuotationParagraphProduct by item-id and QuotationParagraph-id---- */

exports.getQPPByItemIdAndQPId=function(req, res){

    var sqlQuery="select * from QuotationParagraphProduct where QuotationParagraph_id="+req.params.selectedQPId+" and Item_id="+req.params.selectedItemId+"";
    new mssql.SqlConnection(sqlQuery, function(data){
        res.jsonp(data);
    });
}

exports.saveQuotationParagraphProduct=function(req, res){

    var quotePPBody=req.body;
    var sqlQuery="insert into QuotationParagraphProduct (QuotationParagraph_id, Item_id, Quantity_Total, Quantity_Additional, Quantity_Replaced, StatusFlag) VALUES ("+ quotePPBody.selectedQuoteParagraphId+","+quotePPBody.itemId+","+quotePPBody.quantityT+","+quotePPBody.quantityA+","+quotePPBody.quantityR+","+quotePPBody.statusFlag+")";
    new mssql.SqlConnection(sqlQuery, function(data){

        var sqlQuery1='select TOP 1 * from QuotationParagraphProduct ORDER BY QuotationParagraphProduct_id DESC';
        new mssql.SqlConnection(sqlQuery1, function(data1){
            console.log('fetched LAST QPP data is : ');
            console.dir(data1);
            res.jsonp(data1);
        });
    });
}

exports.updateQuotationParagraphProduct=function(req, res){

    var quotePPBody=req.body;
    console.log('updating the QPP here');
    var sqlQuery="update QuotationParagraphProduct SET Quantity_Total="+quotePPBody.quantityT+", Quantity_Additional="+quotePPBody.quantityA+", Quantity_Replaced="+quotePPBody.quantityR+" where QuotationParagraph_id="+quotePPBody.selectedQuoteParagraphId+" and Item_id="+quotePPBody.itemId+"";
    new mssql.SqlConnection(sqlQuery, function(data){

        console.log('fetching saved QPP here');
       var sqlQuery1="select * from QuotationParagraphProduct where QuotationParagraph_id="+quotePPBody.selectedQuoteParagraphId+" and Item_id="+quotePPBody.itemId+"";
        new mssql.SqlConnection(sqlQuery1, function(data){
           res.jsonp(data);
        });
    });
}

exports.deleteQuoteParaProduct=function(req, res){

    var sqlQuery="select * from QuotationParagraphProduct where QuotationParagraphProduct_id="+req.params.selectedQPPId;
    new mssql.SqlConnection(sqlQuery, function(selectedQPPItemData){
        var selectedQPPItem=selectedQPPItemData[0];
        var sqlQuery1="select * FROM ITEM where ITM in (select component_ITM from Item_Composition where compound_ITM = (select ITM from Item where usual_code = '"+req.params.selectedQPPItemUsualCode+"') and option_type='2')";
        new mssql.SqlConnection(sqlQuery1, function(installItemData){

            var sqlQuery2="select * from QuotationParagraphProduct where Item_id="+installItemData[0].id+" and QuotationParagraph_id="+req.params.selectedQPId;
            new mssql.SqlConnection(sqlQuery2, function(installItemDataInQPP){

                var installItemInQPP=installItemDataInQPP[0];
                installItemInQPP.Quantity_Total=parseInt(installItemInQPP.Quantity_Total) - parseInt(selectedQPPItem.Quantity_Total);
                installItemInQPP.Quantity_Additional=parseInt(installItemInQPP.Quantity_Additional) - parseInt(selectedQPPItem.Quantity_Additional);
                installItemInQPP.Quantity_Replaced=parseInt(installItemInQPP.Quantity_Replaced)-parseInt(selectedQPPItem.Quantity_Replaced);

                if(installItemInQPP.Quantity_Total=='0'){

                    var sqlQuery3="delete from QuotationParagraphProduct where QuotationParagraphProduct_id="+installItemInQPP.QuotationParagraphProduct_id;
                    new mssql.SqlConnection(sqlQuery3, function(installItemDataDeleted) {

                        if (selectedQPPItem.Quantity_Replaced == '0') {

                            var sqlQuery8 = "delete from QuotationParagraphProductDetail where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                            new mssql.SqlConnection(sqlQuery8, function (data) {
                                var sqlQuery9 = "delete from QuotationParagraphProduct where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                                new mssql.SqlConnection(sqlQuery9, function (data) {
                                    res.send('Data deleted successfully');
                                })
                            });
                        }
                        else{

                        var sqlQuery4 = "select * FROM ITEM where ITM in (select component_ITM from Item_Composition where compound_ITM = (select ITM from Item where usual_code = '" + req.params.selectedQPPItemUsualCode + "') and option_type='3')";
                        new mssql.SqlConnection(sqlQuery4, function (recycleItemData) {

                            var sqlQuery5 = "select * from QuotationParagraphProduct where Item_id=" + recycleItemData[0].id + " and QuotationParagraph_id=" + req.params.selectedQPId;
                            new mssql.SqlConnection(sqlQuery5, function (recycleItemDataInQPP) {

                                var recycleItemInQPP = recycleItemDataInQPP[0];
                                recycleItemInQPP.Quantity_Total = parseInt(recycleItemInQPP.Quantity_Total) - parseInt(selectedQPPItem.Quantity_Total);
                                recycleItemInQPP.Quantity_Additional = parseInt(recycleItemInQPP.Quantity_Additional) - parseInt(selectedQPPItem.Quantity_Additional);
                                recycleItemInQPP.Quantity_Replaced = parseInt(recycleItemInQPP.Quantity_Replaced) - parseInt(selectedQPPItem.Quantity_Replaced);

                                if (recycleItemInQPP.Quantity_Total == 0) {
                                    var sqlQuery6 = "delete from QuotationParagraphProduct where QuotationParagraphProduct_id=" + recycleItemInQPP.QuotationParagraphProduct_id;
                                    new mssql.SqlConnection(sqlQuery6, function (recycleItemDataDeleted) {
                                        var sqlQuery8 = "delete from QuotationParagraphProductDetail where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                                        new mssql.SqlConnection(sqlQuery8, function (data) {
                                            var sqlQuery9 = "delete from QuotationParagraphProduct where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                                            new mssql.SqlConnection(sqlQuery9, function (data) {
                                                res.send('Data deleted successfully');
                                            })
                                        });

                                    });
                                } else {
                                    var sqlQuery7 = "update QuotationParagraphProduct SET Quantity_Total=" + recycleItemInQPP.Quantity_Total + ", Quantity_Additional=" + recycleItemInQPP.Quantity_Additional + ", Quantity_Replaced=" + recycleItemInQPP.Quantity_Replaced + " where QuotationParagraph_id=" + recycleItemInQPP.QuoteParagraph_id + " and Item_id=" + recycleItemInQPP.Item_id + "";
                                    new mssql.SqlConnection(sqlQuery7, function (recycleItemDataUpdated) {

                                        var sqlQuery8 = "delete from QuotationParagraphProductDetail where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                                        new mssql.SqlConnection(sqlQuery8, function (data) {
                                            var sqlQuery9 = "delete from QuotationParagraphProduct where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                                            new mssql.SqlConnection(sqlQuery9, function (data) {
                                                res.send('Data deleted successfully');
                                            })
                                        });

                                    });

                                }

                            });

                        });
                    }
                    });
                }else{

                    var sqlQuery3="update QuotationParagraphProduct SET Quantity_Total="+installItemInQPP.Quantity_Total+", Quantity_Additional="+installItemInQPP.Quantity_Additional+", Quantity_Replaced="+installItemInQPP.Quantity_Replaced+" where QuotationParagraph_id="+installItemInQPP.QuotationParagraph_id+" and Item_id="+installItemInQPP.Item_id+"";
                    new mssql.SqlConnection(sqlQuery3, function(installItemDataUpdated) {

                        if (selectedQPPItem.Quantity_Replaced == '0') {

                            var sqlQuery8 = "delete from QuotationParagraphProductDetail where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                            new mssql.SqlConnection(sqlQuery8, function (data) {
                                var sqlQuery9 = "delete from QuotationParagraphProduct where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                                new mssql.SqlConnection(sqlQuery9, function (data) {
                                    res.send('Data deleted successfully');
                                })
                            });
                        }
                        else{

                        var sqlQuery4 = "select * FROM ITEM where ITM in (select component_ITM from Item_Composition where compound_ITM = (select ITM from Item where usual_code = '" + req.params.selectedQPPItemUsualCode + "') and option_type='3')";
                        new mssql.SqlConnection(sqlQuery4, function (recycleItemData) {

                            var sqlQuery5 = "select * from QuotationParagraphProduct where Item_id=" + recycleItemData[0].id + " and QuotationParagraph_id=" + req.params.selectedQPId;
                            new mssql.SqlConnection(sqlQuery5, function (recycleItemDataInQPP) {

                                var recycleItemInQPP = recycleItemDataInQPP[0];
                                recycleItemInQPP.Quantity_Total = parseInt(recycleItemInQPP.Quantity_Total) - parseInt(selectedQPPItem.Quantity_Total);
                                recycleItemInQPP.Quantity_Additional = parseInt(recycleItemInQPP.Quantity_Additional) - parseInt(selectedQPPItem.Quantity_Additional);
                                recycleItemInQPP.Quantity_Replaced = parseInt(recycleItemInQPP.Quantity_Replaced) - parseInt(selectedQPPItem.Quantity_Replaced);

                                if (recycleItemInQPP.Quantity_Total == '0') {
                                    var sqlQuery6 = "delete from QuotationParagraphProduct where QuotationParagraphProduct_id=" + recycleItemInQPP.QuotationParagraphProduct_id;
                                    new mssql.SqlConnection(sqlQuery6, function (recycleItemDataDeleted) {
                                        var sqlQuery8 = "delete from QuotationParagraphProductDetail where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                                        new mssql.SqlConnection(sqlQuery8, function (data) {
                                            var sqlQuery9 = "delete from QuotationParagraphProduct where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                                            new mssql.SqlConnection(sqlQuery9, function (data) {
                                                res.send('Data deleted successfully');
                                            })
                                        });

                                    });
                                } else {
                                    var sqlQuery7 = "update QuotationParagraphProduct SET Quantity_Total=" + recycleItemInQPP.Quantity_Total + ", Quantity_Additional=" + recycleItemInQPP.Quantity_Additional + ", Quantity_Replaced=" + recycleItemInQPP.Quantity_Replaced + " where QuotationParagraph_id=" + recycleItemInQPP.QuotationParagraph_id + " and Item_id=" + recycleItemInQPP.Item_id + "";
                                    new mssql.SqlConnection(sqlQuery7, function (recycleItemDataUpdated) {

                                        var sqlQuery8 = "delete from QuotationParagraphProductDetail where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                                        new mssql.SqlConnection(sqlQuery8, function (data) {
                                            var sqlQuery9 = "delete from QuotationParagraphProduct where QuotationParagraphProduct_id=" + req.params.selectedQPPId;
                                            new mssql.SqlConnection(sqlQuery9, function (data) {
                                                res.send('Data deleted successfully');
                                            })
                                        });

                                    });

                                }

                            });

                        });
                    }
                    });

                }
            });
        });

    });


}


exports.getAllQuoteParaProducts=function(req, res){

    var sqlQuery="select * from QuotationParagraphProduct";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('all quoteParaProduct list : '+data);
        res.jsonp(data);
    });
}

exports.saveQuotationParagraphProductDetail=function(req, res){

    console.log('inside save QPPD')
    var quotePPDBody=req.body;
    var sqlQuery="insert into QuotationParagraphProductDetail (QuotationParagraphProduct_id, Building, Floor, Location, Install, Recycle, Is_Replacement, StatusFlag) VALUES ("+ quotePPDBody.selectedQuoteParaProdId+",'"+quotePPDBody.building+"','"+quotePPDBody.floor+"','"+quotePPDBody.location+"',"+quotePPDBody.install+","+quotePPDBody.recycle+","+quotePPDBody.isReplacement+","+quotePPDBody.statusFlag+")";
    new mssql.SqlConnection(sqlQuery, function(data){

    });
    console.log('ok qppd Item saved here');
    var sqlQuery1='select TOP 1 * from QuotationParagraphProductDetail ORDER BY QuotationParagraphProductDetail_id DESC';
    new mssql.SqlConnection(sqlQuery1, function(data1){
        console.log('fetched LAST QPPD data is : '+data1);
        res.jsonp(data1);
    });
}

exports.updateQuoteParaProdDetail=function(req, res){

    var quotePPDBody=req.body;
    var sqlQuery="update QuotationParagraphProductDetail SET Building='"+quotePPDBody.building+"', Floor='"+quotePPDBody.floor+"', Location='"+quotePPDBody.location+"', Install="+quotePPDBody.install+", Recycle="+quotePPDBody.recycle+", Is_Replacement="+quotePPDBody.isReplacement+", StatusFlag="+quotePPDBody.statusFlag+" where QuotationParagraphProductDetail_id="+quotePPDBody.quotePPDId+"";
    new mssql.SqlConnection(sqlQuery, function(data){
        res.send(data);
    });
}


exports.fetchValuesFromQPPDByQuotePPId=function(req, res){

    var sqlQuery="select * from QuotationParagraphProductDetail where QuotationParagraphProduct_id="+req.params.selectedQuotPPId+"";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('all quoteParaProductDetail list : '+data);
        res.jsonp(data);
    });
}