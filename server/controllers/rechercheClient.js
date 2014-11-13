'use strict';

/**
 * Module dependencies.
 */
var mssql=require('./mssql');

/*Load all client list*/
exports.all = function(req, res) {

    var sqlQuery='SELECT * from customer';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
};

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
    console.log('current date is : '+currentDate);

    var sqlQuery='insert into Quotation (Customer_id, Type, Status, Employee_id, Flow) VALUES ('+ req.params.custmerId+', 1, 1, 1, 1)';

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

        console.log('inside if in server side ');
        sqlQuery="insert into QuotationParagraph (Quotation_id, Site_id, Description) VALUES ("+ req.params.selectedQuote+","+req.params.selectedSite+",'"+req.params.paragraphDes+"')";

    }else{

        console.log('inside else in server side ');
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

exports.fetchRecycleItemsList=function(req, res){

    var sqlQuery="select * FROM Customer_Installed_Base where LANO='"+req.params.LANOValue+"' ";
    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('fetched recycle items are : '+data);
        res.jsonp(data);
    });
}