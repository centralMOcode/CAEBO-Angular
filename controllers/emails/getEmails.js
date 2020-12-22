/* 
By Isaac Prost, December 2020
*/

var express = require('express');
var router = express.Router();
var STATUS_MESSAGE = require('../../constants/constants');

router.get('/:user_id', function(req, res){
    var connectDB  = require('../../connectDB.js');
    var sql = 'SELECT email, is_primary, is_verified FROM email WHERE user_id=?';

    connectDB.con.query(sql, [req.params.user_id], function (err, result){
      if (err) throw err;

      if (result === undefined || result == "") {
        res.status(200).json({
            statusCode: -1,
            statusDesc: 'Failure',
            message: STATUS_MESSAGE.FAILURE_GENERIC 
        });
      } else {
        res.status(200).json({
          statusCode: 0,
          statusDesc: 'Success',
          message: result
        });
      }
  })
})


module.exports = router;