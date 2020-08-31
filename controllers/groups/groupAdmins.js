/*
Queries all admins of the group_id pass to the router
*/

var express = require('express');
var router = express.Router();

// USE: /api/groups/<group_name> API call fro querying a signle group name and ID.
router.get('/:group_id', function(req, res){
  var connectDB  = require('../../connectDB.js');
    var sql = 'SELECT user_id, username FROM user WHERE group_id = ? && group_admin=1;';
    connectDB.con.query(sql, [req.params.group_id], function (err, result, fields){
        if (result === undefined || result == ""){
            return res.status(404).json({ emailnotfound: "Email not found"});
        } else {
            res.send(JSON.stringify(result));
        }
  })
})

module.exports = router;