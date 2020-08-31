/*
groupdelete.js is a way to delete the current group as an owner of the group.
this also needs to update the users of the groups from in a group to null
Kyle Graber, March 2020
*/

var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    var connectDB  = require('../../connectDB.js');
    var check = 'SELECT * FROM groups WHERE group_name=?';
    connectDB.con.query(check, [req.body.group_name], function (err, result, fields){ 
        if (result === undefined || result == ""){
            return res.status(404).json({ groupnotfound: "Group Not Found"});
        } 
        else { 
            console.log(result[0].group_id)
            var sqlUpdateUsers = 'UPDATE user SET group_id = 0, group_admin = 0 WHERE group_id= ?;';
            connectDB.con.query(sqlUpdateUsers, [result[0].group_id], function(err, result, fields){
                if (err) throw err;
                console.log("Users Updated");
                
            })
            var delGroup = 'DELETE FROM groups where group_id = ?;'
            connectDB.con.query(delGroup, [result[0].group_id], function(err, result, fields){
                if (err) throw err;
                console.log("Group Deleted");
                res.send("Group Deleted");
            })
        }
    })
})

module.exports = router;