'use strict';

var mssql=require('mssql');
/*
 * * Default Connection String
 */
var connectionConfig = {
	user : 'itgs2@o9mmw1xy9t',
	password : '!5dm1n1!',
	server : 'o9mmw1xy9t.database.windows.net',
	port : '1433',
	database : 'itgs_cs_angularjsapp',
	options: {
	        encrypt: true // Use this if you're on Windows Azure
	}
};
/*
 * * SqlConnection
 */
var SqlConnection = function(sqlQuery, callback) {

	console.log('query is : '+sqlQuery);
	console.log('inside SqlConnection function');
	mssql.connect(connectionConfig, function(err_connect) {
	    // ... error checks

	    // Query
		console.log('inside connect' +err_connect);

	    var request = new mssql.Request();
	    request.query(sqlQuery, function(err_query, recordset) {
	        // ... error checks
	    	console.log('result data , err_query is : '+err_query);
	    	console.log('result data , recordset is : '+recordset);
	        return recordset;
	    });

	});
}

exports.SqlConnection = SqlConnection;