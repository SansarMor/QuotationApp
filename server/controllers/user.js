'use strict';

var mssql=require('./mssql');
/**
 * Module dependencies.
 */

exports.create = function(req, res) {
	var abc=req.body;
    console.log('inside user controller : ' + abc.email);
    var sqlQuery='select * from user';
    var conn = new mssql.SqlConnection(sqlQuery, function(data) {
        console.log('inside success sql connection , value is : '+data);
    });
};