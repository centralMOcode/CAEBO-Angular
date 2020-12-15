/*
userRemoval.js is a way to remove the user and admin chooses from the group.
this will update the user that the admin wants to remove them froms database 
entry to not be in a group and remove all admin statuses
Kyle Graber, March 2020
*/

var express = require('express');
var router = express.Router();

router.post('/', function(req, res) {
    var connectDB  = require('../../connectDB.js');
    var sqlUpdateUsers = 'UPDATE user SET group_id=1, group_admin=0 WHERE user_id=?;';
    connectDB.con.query(sqlUpdateUsers, [req.body.user_id], function(err, result, fields){
        if (err) throw err;
        console.log("User Updated");
        res.status(200).json({ userupdate: "User removed from group" });
    })
})

module.exports = router;