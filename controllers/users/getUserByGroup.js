var express = require('express');
var STATUS_MESSAGE = require('../../constants/constants');
var router = express.Router();

// USE: /api/users/<username>. Queries the data of the specified user
router.get('/:group_id', function(req, res){
    var connectDB  = require('../../connectDB.js');
    var sql = 'SELECT user_id, first_name, last_name, username, email, group_id, group_admin FROM user WHERE group_id=?';
    connectDB.con.query(sql, [req.params.group_id], function (err, result, fields){
        if (result === undefined || result == ""){
            return res.status(404).json({ 
                statusCode: 100,
                statusDesc: 'Failure',
                message: STATUS_MESSAGE.NOT_FOUND_GENERIC
            });
        } else {
            res.status(200).json({
                statusCode: 0,
                statusDesc: 'Success',
                message: result
            });
        }
  });
});

module.exports = router;