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
    var sqlQuery='select * from site where PA8='+req.params.clientId;

    new mssql.SqlConnection(sqlQuery, function(data){
       res.jsonp(data);
    });
};

/*Load client all contacts*/
exports.clientContacts= function(req, res){
    var sqlQuery='select * from contact';

    new mssql.SqlConnection(sqlQuery, function(data){
        var sqlQuery1='select * from media where ';
        res.jsonp(data);
    });
}