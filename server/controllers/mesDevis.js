'use strict';

/**
 * Module dependencies.
 */
var mssql=require('./mssql');

exports.getAllQuotationList=function(req, res){

    var sqlQuery='SELECT * from Quotation';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
}