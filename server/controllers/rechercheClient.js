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