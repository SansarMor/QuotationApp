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