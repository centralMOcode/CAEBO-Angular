var express = require('express');
var router = express.Router();

// USE: /api/users/<username>. Queries the data of the specified user
router.get('/:group_id', function(req, res){
    var connectDB  = require('../../connectDB.js');
    var sql = 'SELECT user_id, first_name, last_name, username, email, group_id, group_admin FROM user WHERE group_id=?';
    connectDB.con.query(sql, [req.params.group_id], function (err, result, fields){
        if (result === undefined || result == ""){
            return res.status(404).json({ error: "Something went wrong... try again"});
        } else {
            res.status(200).json(result);
        }
  })
})

module.exports = router;