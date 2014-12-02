'use strict';

/**
 * Module dependencies.
 */
var mssql=require('./mssql');

exports.fetchAllEmployee=function(req, res){

    var sqlQuery='SELECT * from Employee';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
}

exports.registerEmployee=function(req, res){

    var sqlQuery='insert into users (User_Employee_AN8, StatusFlag) VALUES ('+req.body.AN8+',0)';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.send('ok, employee registered successfully');
    });
}

exports.fetchAllUsers=function(req, res){
    var sqlQuery='SELECT * from users';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
}

exports.registerRole=function(req, res){

    var sqlQuery="insert into Roles (Name, Description) VALUES ('"+req.body.name+"','"+req.body.description+"')";
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.send('ok, role registered successfully');
    });
}

exports.fetchAllRoles=function(req, res){

    var sqlQuery='SELECT * from Roles';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
}

exports.saveUserRoles=function(req, res){
    console.log(req.params.selectedUserId);
    var selectedUserRolesList=req.body;
    var sqlQuery1="delete from Userroles where User_id = "+req.params.selectedUserId;
    new mssql.SqlConnection(sqlQuery1, function(data) {
        var i = 0;
        selectedUserRolesList.forEach(function (selectedUserRole, index) {
            var sqlQuery = "insert into Userroles (User_id, Role_id) VALUES (" + req.params.selectedUserId + "," + selectedUserRole.Role_id + ")";
            new mssql.SqlConnection(sqlQuery, function (data) {

                if (i + 1 == selectedUserRolesList.length) {
                    res.send('ok, role registered successfully');
                } else {
                    i++;
                }
            });
        });
    });
}

exports.fetchUserRolesByUserId=function(req, res){
    var sqlQuery='SELECT * from Userroles where User_id='+req.params.selectedUserId;
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
}

exports.fetchAllFluxListForRoleFlux=function(req, res){
    var sqlQuery="select * from UDC where SY='40' and RT='P1'";
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
}

exports.registerRoleFlux=function(req, res){
    var sqlQuery = "insert into Role_Flow (Role_id, Agency_Type, Flow) values ("+req.params.selectedRoleId+", '"+req.params.selectedAgence+"', '"+req.params.selectedFlux+"')";
    new mssql.SqlConnection(sqlQuery, function (data) {
       res.send('role flow registered successfully');
    });
}

exports.fetchAllRoleFlows=function(req, res){
    var sqlQuery="select * from Role_Flow";
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
}