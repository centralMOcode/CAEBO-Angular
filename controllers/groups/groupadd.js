/*
groupadd.js -> adds group to the current groups table in the database.
On front end, we can change the user input to each word in the company being capital, if need be.
Main use is for the adminDB portal, but can be tailored to be used in master branch for front end

Isaac Prost, February 2020
*/
var express = require('express');
var router = express.Router();

const ValidateGroupInput = require("../../validation/groupcreation");

// This API route can be used by users to create a new group. The outer connectDB query will check for a group of the existing name,
// then in the conditional, will either insert the new group into the database if the user input does not match an existing group
// or return a "group already exists". 
// This route will also modify the user table to make the user who created the group an Administrator
router.post('/', function(req, res) {
    const { errors, isValid } = ValidateGroupInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    var connectDB  = require('../../connectDB.js');
    var groupCheck = 'SELECT * FROM groups WHERE group_name=?';

    connectDB.con.query(groupCheck, [req.body.group_name], function (err, result, fields){ // check if name exists
        if(err) throw err;

        if (result === undefined || result == ""){ 
            var insert = 'INSERT INTO groups(group_name) VALUES(?);';
            connectDB.con.query(insert, [req.body.group_name], function(err, result, fields){
                if(err) throw err;
            })
            var queryID = 'SELECT * FROM groups WHERE group_name=?';
            connectDB.con.query(queryID, [req.body.group_name], function(err, result, fields){
                if(err) throw err;
                
                var updateUser = 'UPDATE user SET group_id=?, group_admin=? WHERE user_id=?;';
                connectDB.con.query(updateUser, [result[0].group_id, 1, req.body.user_id], function(err, result, fields){
                    if(err) throw err;
                    res.send("Success");
                })
            })
        } else {
            return res.status(404).json({ groupexists: "Group already exists"});
        }   
    })
})

module.exports = router;