/*
userRemoval.js is a way to remove the user and admin chooses from the group.
this will update the user that the admin wants to remove them froms database 
entry to not be in a group and remove all admin statuses
Kyle Graber, March 2020
*/

var express = require('express');
var router = express.Router();

// router.post('/', function(req, res) {
//     var connectDB  = require('../../connectDB.js');
//     var check = 'SELECT * FROM groups NATURAL JOIN user WHERE group_name=?';
//     connectDB.con.query(check, [req.body.group_name], function (err, result, fields){ 
//         if (result === undefined || result == ""){
//             return res.status(404).json({ groupnotfound: "Group not found"});
//         } 
//         else { 
//             console.log(result[0].user_id)
//             var sqlUpdateUsers = 'UPDATE user SET group_id = 1, group_admin = 0 WHERE user_id= ?;';
//             connectDB.con.query(sqlUpdateUsers, [result[0].user_id], function(err, result, fields){
//                 if (err) throw err;
//                 console.log("Users Updated");
//                 res.send(result);
//             })
//         }
//     })
// })

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