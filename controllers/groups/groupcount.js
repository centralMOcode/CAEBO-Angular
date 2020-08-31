/*
groupcount.js -> counts number of members in specifed group to the current groups table in the database.

Isaac Prost, March 2020
*/
var express = require('express');
var router = express.Router();

router.get(function(req, res){
    var connectDB = require("../../connectDB");

    var queryGroupName = `SELECT group_id 
                          FROM groups
                          WHERE group_name = ?;`;
    connectDB.con.query(queryGroupName, [req.body.group_name], function(err, result, fields) {
        if (err) throw err;

        const group_id = result[0].group_id;
    })

    var updateUserQuery = `UPDATE user
                           SET group_id = 0
                           WHERE group_id = ?;`;
    connectDB.con.query(updateUserQuery, [req.body.group_id], function(err, result, fields) {
        if (err) throw err;
    })
})