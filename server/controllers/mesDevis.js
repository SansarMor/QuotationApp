'use strict';

/**
 * Module dependencies.
 */
var mssql=require('./mssql');

var reqData='';

exports.createDatabaseConnection=function(req, res){
    new mssql.getSqlConnection(function(data){
        reqData=data;
        res.jsonp(data);
    });
}
exports.getAllQuotationList=function(req, res){
    var sqlQuery='SELECT * from Quotation';
    console.log('req data is : ');
    console.dir(reqData);
    new mssql.SqlConnection(reqData, sqlQuery, function(data) {
        res.jsonp(data);
    });
}